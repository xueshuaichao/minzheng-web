/**
 * @file
 * @author tanghao
 * @date 2019-06-19
 */

import Vue from 'vue';
import Vuex from 'vuex';
import app from './module/app';
import user from './module/user';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isCollapsed: false,
    },
    mutations: {
        setCollapsed(state, val) {
            state.isCollapsed = val;
        },
    },
    actions: {
        //
    },
    modules: {
        app,
        user,
    },
});
