'use strict';

import {
    SET_MENU,
    SET_OSS_CONFIG
} from './mutation-type'

const mutations = {
    [SET_MENU](state, path){
        let menu = state.menu.menus;

        if (!path || '/' == path || '' == path){
            return;
        }
        //遍历菜单 不使用递归遍历 直接写for循环
        for (let i = 0; i < menu.length; i++){
            if (path.indexOf(menu[i].url) == 0){//url 出现在path的前面
                state.menu.firstIndex = i;
                let children = menu[i].children;
                if (children && children.length > 0){
                    for (let j = 0; j < children.length; j++){
                        if (path.indexOf(children[j].url) == 0) {//url 出现在path的前面
                            state.menu.secondIndex = j;
                        }
                    }
                }
            }

        }
    },
    [SET_OSS_CONFIG] (state, {OSSAccessKeyId, policy, signature, expire, host, dir, callback, maxSize}){
        state.oss.OSSAccessKeyId = OSSAccessKeyId;
        state.oss.policy = policy;
        state.oss.signature = signature;
        state.oss.host = host;
        state.oss.expire = expire;
        state.oss.maxSize = maxSize;
        state.oss.dir = dir;
        state.oss.key = dir + '${filename}';
        state.oss.callback = callback;
        state.oss.server = host;
    },
};
export default mutations
