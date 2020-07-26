import { I_BIC_User } from '@/interfaces';
import { TYPES } from '../types';
import FeedbackNotification from '@/utils/FeedbackNotification';

interface IState {
  accountInfo: I_BIC_User | null;
  hasConnection: Boolean;
  identifiedContainer: any;
}

const getDefaultState = () => {
  return {
    accountInfo: null,
    hasConnection: true,
    identifiedContainer: null,
  };
};

const state = getDefaultState();

const mutations = {
  [TYPES.mutations.RESET_STATE](state: any) {
    Object.assign(state, getDefaultState());
  },
  [TYPES.mutations.SET_ACCOUNT](state: IState, payload: I_BIC_User) {
    state.accountInfo = payload;
  },
  [TYPES.mutations.SET_HAS_CONNECTION](state: IState, payload: any) {
    state.hasConnection = payload;
  },
  [TYPES.mutations.SET_IDENTIFIED_CONTAINER](state: IState, payload: any) {
    state.identifiedContainer = payload;
  },
};

const actions = {
  [TYPES.actions.RESET_STATE](context) {
    return new Promise(function (resolve, reject) {
      context.commit(TYPES.mutations.RESET_STATE);
      resolve();
    });
  },
  async [TYPES.actions.UPDATE_ACCOUNT](context: any, user: I_BIC_User) {
    return new Promise(async (resolve, reject) => {
      const account = (context.state as IState).accountInfo;
      if (account) resolve(account);
      user.image = 'https://s3.amazonaws.com/uifaces/faces/twitter/algunsanabria/128.jpg';
      context.commit(TYPES.mutations.SET_ACCOUNT, user);
      resolve(user);
    });
  },
  [TYPES.actions.UPDATE_HAS_CONNECTION](context: any, payload: any) {
    if (!payload) FeedbackNotification.showNoConnection();
    context.commit(TYPES.mutations.SET_HAS_CONNECTION, payload);
  },
  [TYPES.actions.UPDATE_IDENTIFIED_CONTAINER](context: any, payload: any) {
    context.commit(TYPES.mutations.SET_IDENTIFIED_CONTAINER, payload);
  },
};

const getters = {
  [TYPES.getters.GET_ACCOUNT](state: IState, getters: any) {
    return state.accountInfo;
  },
  [TYPES.getters.GET_HAS_CONNECTION](state: IState, getters: any) {
    return state.hasConnection;
  },
  [TYPES.getters.GET_IDENTIFIED_CONTAINER](state: IState, getters: any) {
    return state.identifiedContainer;
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
