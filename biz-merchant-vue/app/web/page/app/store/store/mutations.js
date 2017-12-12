'use strict';

import Common from  'store/common/mutations';

import {
    SET_LIST,
    SET_PAGE,
    LOADING
} from './mutation-type'

const mutations = {
    ...Common,
    [LOADING] (state, {isLoading}){
        state.isLoading = isLoading;
    },
    [SET_LIST] (state, {list, pageSize, pageNo, totalSize}){
        state.list = list;
        state.pageNo = pageNo;
        state.pageSize = pageSize;
        state.totalSize = totalSize;
    },
    [SET_PAGE] (state, {pageNo, pageSize, totalSize}){
        console.log("pageNo:"+pageNo + " pageSize:"+pageSize+" totalSize:"+totalSize);
        if (pageNo){
            state.pageNo = pageNo;
        }
        if (pageSize){
            state.pageSize = pageSize;
        }
        if (totalSize){
            state.totalSize = totalSize;
        }
    }


};
export default mutations
