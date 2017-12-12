'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import Common from 'store/common/state';

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

// const state = {
//     ...Common,
//     list: [],
//     isLoading: false,
//     pageNo: 1,
//     pageSize: 2,
//     totalSize: 0
// };

//这里一定要注意, state 一定要用函数返回值来初始化 state, 不然会导致所有用户共用 state
const state = () => ({
    ...Common,
    list: [],
    isLoading: false,
    pageNo: 1,
    pageSize: 2,
    totalSize: 0
})

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
});