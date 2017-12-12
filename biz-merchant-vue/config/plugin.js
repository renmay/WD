'use strict';

module.exports =  {
    static: {
        enable: true
    },
    vue: {
        enable: true,
        package: 'egg-view-vue'
    },
    vuessr: {
        enable: true,
        package: 'egg-view-vue-ssr'
    },
    validate: {
        enable: true,
        package: 'egg-validate',
    },
    redis: {
        enable: true,
        package: 'egg-redis'
    },
    sessionRedis:{
        enable: true,
        package: 'egg-session-redis'
    }
};