'use strict';

import Common from  '../common/mutations';

import {
    SET_ARTICLE_LIST,
    SET_ARTICLE_DETAIL
} from './mutation-type'

const mutations = {
    ...Common,
    [SET_ARTICLE_LIST] (state, items){
        state.articleList = items;
    },
    [SET_ARTICLE_DETAIL](state, data) {
        state.article = data;
    }
};
export default mutations
