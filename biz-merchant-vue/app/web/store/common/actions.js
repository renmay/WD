'use strict';

import * as Type from './mutation-type';
import api from '~api';

const actions = {
    SET_MENU: ({ commit, dispatch, state }, {path}) => {
        commit(Type.SET_MENU, path);
    },
    GET_OSS_CONFIG: ({ commit, dispatch, state }, data) => {
        return api.get('common/api/file/sign', data).then( response => {
            let result = response.data;
            console.log(result);
            console.log(result.accessid);
            commit(Type.SET_OSS_CONFIG, {
                key: result.dir,
                OSSAccessKeyId: result.accessid,
                policy: result.policy,
                signature: result.signature,
                host: result.host,
                expire: result.expire,
                maxSize: result.maxSize,
                dir: result.dir,
                callback: result.callback
            });
            return result;
        }).catch( err => {
        });
    },
};

export default actions;


