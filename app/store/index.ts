import Vue from 'vue'
import Vuex from 'vuex';
import ModuleCore from '@/store/modules/core';
import ModuleAuth from '@/store/modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AUTH: ModuleAuth as any,
    CORE: ModuleCore as any,
  }
});
