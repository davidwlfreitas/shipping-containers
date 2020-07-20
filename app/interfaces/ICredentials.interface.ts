interface I_BIC_Credentials {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  scope: boolean;
  client: I_BIC_Client;
  redirectUris: Array<any>;
  user: I_BIC_User;
  access_token: string;
  login?: object;
}

interface I_BIC_Client {
  id: string;
  client_id: string;
  client_secret: string;
  grants: Array<string>;
}

interface I_BIC_User {
  id: number;
  username__c: string;
  client_secret: string;
  password__c: string;
  email_valid__c: boolean;
  image?: string;
}

interface ILoginUser {
  userName: string;
  password: string;
}

export { I_BIC_Credentials, I_BIC_Client, I_BIC_User, ILoginUser };
