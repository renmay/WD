'use strict';

module.exports = app => {
    const exports = {
        baseUrl: 'http://127.0.0.1:8080',
    };

    exports.middleware = ['urlPrefix', 'jwt', 'auth', 'errorHandler'];

    exports.jwt = {
        key: '_token',
        suffix: 'jwt:token',
        maxAge: 60 * 60 * 24,
        secret: '00e0ad137f6b4152893267ffa688e094'
    };

    exports.auth = {
        jwt: 'jwt:token',
        ignore: [
            '/login',
            '/send/code',
            '/register',
            '/weixin/login',
            '/authorization',
        ],//这里配置需要登录验证的页面
    },

    exports.security = {
        csrf: {
            enable: false
        },
        domainWhiteList: '*',
        methodnoallow: {
            enable: false
        },
    };

    exports.keys = '123456';

    exports.redis = {
        client: {
            host: '120.79.0.38',
            db: 1,
            port: 6379,
            password: 'Wd123456'
        }
    };


    return exports;
};


