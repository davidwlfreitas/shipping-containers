import Vue from 'vue';
import Vuex from 'vuex';
import { actions } from './actions';
import { getters } from './getters';

Vue.use(Vuex);

export const store = new Vuex.Store({
    getters,
    actions
});