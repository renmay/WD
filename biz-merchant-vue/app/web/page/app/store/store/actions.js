'use strict';

import * as Type from './mutation-type';
import Common from 'store/common/actions';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import api from '~api';



Vue.use(Vuex);

const host = 'http://127.0.0.1:7001';

const actions = {
    ...Common,
    SET_LIST: ({ commit, dispatch, state }, {cookies, data}) => {
        commit(Type.LOADING, {isLoading: true});
        if (data){
            data.pageNo = state.pageNo;
            data.pageSize = state.pageSize;
        }
        return api.post('store/api/list', data, cookies).then( response => {
            let result = response.data;
            if (result.code == 200){
                commit(Type.SET_LIST, {
                    list: result.data.list,
                    pageSize: result.data.pageSize,
                    pageNo: result.data.pageNo,
                    totalSize: result.data.totalCount
                });
            }
            commit(Type.LOADING, {isLoading: false});
            return result;
        }).catch( err => {
            commit(Type.LOADING, {isLoading: false});
        });
    },
    DELETE: ({ commit, dispatch, state }, data) => {
        commit(Type.LOADING, {isLoading: true});
        return axios.post(`${host}/order/api/delete`, data).then(response => {
            dispatch('SET_LIST');
        }).catch(err => {
        });
    },
    SET_PAGE: ({ commit, dispatch, state }, data) => {
        commit(Type.SET_PAGE, data);
    },
    LOADING: ({ commit, dispatch, state }, {isLoading}) => {
        commit(Type.LOADING, {isLoading});
    },
    FORM_SUBMIT: ({ commit, dispatch, state }, data) => {
        console.log(data);
        return api.post(`store/api/edit`, data).then(response => {
            let result = response.data;
            return result;
        });
    },
};

export default actions;


