import { SecureStorage } from 'nativescript-secure-storage';
import { TYPES } from '../types';

const getDefaultState = () => {
  return {
    jwt: null,
    secureStorage: new SecureStorage(),
  };
};

const state = getDefaultState();

const mutations = {
  [TYPES.mutations.RESET_STATE](state) {
    Object.assign(state, getDefaultState());
  },
  [TYPES.mutations.SET_JWT](state, payload) {
    state.jwt = payload.jwt;
  },
};

const actions = {
  [TYPES.actions.RESET_STATE](context) {
    return new Promise(function (resolve, reject) {
      context.commit(TYPES.mutations.RESET_STATE);
      resolve();
    });
  },
  [TYPES.actions.UPDATE_JWT](context, payload) {
    return new Promise(async function (resolve, reject) {
      context.commit(TYPES.mutations.SET_JWT, { jwt: payload.jwt });
      resolve(payload.jwt);
    });
  },

  [TYPES.actions.LOGOUT](context, payload) {
    context.commit(TYPES.mutations.SET_JWT, { jwt: null });
    return true;
  },
};

const getters = {
  [TYPES.getters.GET_JWT](state: any, getters: any) {
    return state.jwt;
  },
};

const module = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default module;
