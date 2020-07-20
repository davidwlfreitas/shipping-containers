import store from '@/store';
import { TYPES } from '@/store/types';
import { SecureStorage } from 'nativescript-secure-storage';
import Vue from 'nativescript-vue';
import { I_BIC_Credentials, ILoginUser } from '@/interfaces';
import { boxTechApi } from '@/api/http/api';
import { stringify } from 'querystring';

let auth = new Vue({
  data: () => ({
    secureStorage: new SecureStorage(),
    AUTH_CREDENTIALS: 'AUTH_CREDENTIALS',
    currentCredentials: null,
    refreshInterval: null,
  }),
  async created() {
    const credentialsJson = this.secureStorage.getSync({
      key: this.AUTH_CREDENTIALS,
    });

    if (credentialsJson) {
      await this.setCurrentCredentials(JSON.parse(credentialsJson));
    }
  },
  methods: {
    isLoggedIn() {
      return !!(store.state as any).CORE.accountInfo;
    },
    async getCredentials(user: ILoginUser){
      return new Promise(async (resolve, reject) => {
        try {
          const data = stringify({
            grant_type: 'password',
            username: user.userName,
            password: user.password,
          });
          let credentials  = await boxTechApi.getUser(data, global.AUTH_BIC_clientID);
          credentials = {
            ...credentials.data,
            login: user
          }
          resolve(credentials);
        } catch(e){
          console.log(e)
          reject(e)
        }
      });
    },
    async login(user: ILoginUser) {
      return new Promise(async (resolve, reject) => {
        try {
          await this.setCredentials(await this.getCredentials(user));
          resolve();
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
    },
    async setCredentials(authResult: I_BIC_Credentials | null) {
      this.setCurrentCredentials(authResult);
      await this.secureStorage.set({
        key: this.AUTH_CREDENTIALS,
        value: JSON.stringify(this.currentCredentials),
      });
    },
    async setCurrentCredentials(newValue: I_BIC_Credentials) {
      if (global.isDevEnv) console.log('Setting new Credentials: ', newValue.accessToken)
      this.currentCredentials = newValue;
      if (this.checkCredentials(newValue)) {
        await store.dispatch(`${TYPES.modules.AUTH}/${TYPES.actions.UPDATE_JWT}`, {
          jwt: newValue.accessToken,
        });
        if (!this.refreshInterval) {
          this.refreshInterval = setInterval(async () => {
            await this.renewCredentials();
          }, 10000);
        }
        await this.updateAccount();
      } else {
        if (newValue) await this.renewCredentials(newValue);
      }
    },
    checkCredentials(credentials: I_BIC_Credentials) {
      return credentials !== null && new Date() < new Date(credentials.accessTokenExpiresAt);
    },
    async renewCredentials(credentials?: I_BIC_Credentials): Promise<void> {
      if (!credentials) credentials = this.currentCredentials;
      return new Promise(async (resolve, reject) => {
        let miliSecondsToExpire = new Date(credentials.accessTokenExpiresAt).getTime() - new Date().getTime();
        if (global.isDevEnv) {
          console.log('CurrentCredentials.expiresAt: ', credentials.accessTokenExpiresAt);
          console.log('MiliSecondsToExpire: ', miliSecondsToExpire);
        }
        if (miliSecondsToExpire < 60000) {
          if (credentials.refreshToken) {
            try {
              await this.setCredentials(await this.getCredentials(credentials.login));
            } catch (error) {
              reject(error);
            }
          } else {
            reject(new Error('Invalid Refresh Token'));
          }
        }
        resolve();
      });
    },
    async logout() {
      return new Promise(async (resolve, reject) => {
        try {
          if (this.refreshInterval) clearInterval(this.refreshInterval);
          this.refreshInterval = null;
          this.currentCredentials = null;
          this.secureStorage.removeAllSync();
          await this.resetStore();
          gc();
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    },
    async resetStore() {
      return new Promise((resolve, reject) => {
        let modules = Object.keys(TYPES.modules);
        Promise.all([
          modules.map(async (module: any) => {
            await store.dispatch(`${module}/${TYPES.actions.RESET_STATE}`);
          }),
        ]);
        resolve();
      });
    },
    async updateAccount() {
      let userAccount = (store.state as any).CORE.accountInfo;
      if (!userAccount) {
        userAccount = await store.dispatch(
          `${TYPES.modules.CORE}/${TYPES.actions.UPDATE_ACCOUNT}`,
          this.currentCredentials.user,
        );
      }
    },
  },
});

export default auth;
