'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import Common from '../common/state';

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
    ...Common,
    articleList: [],
    article: {}
};

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
});