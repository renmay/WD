const path = require('path');
const fs = require('fs');
const url = require('./url');

module.exports = app => {
    const exports = {
        url: url,
        keys: 'keys',
        title: '后台管理系统',
    };

    exports.view = {
        defaultViewEngine: 'nunjucks'
    };

    exports.static = {
        prefix: ''
    };

    exports.i18n = {
        defaultLocale: 'zh-CN',
    };

    exports.security = {
        csrf: {
            enable: false
        }
    };

    exports.redis = {
        client: {
            host: '120.79.0.38',
            db: 1,
            port: 6379,
            password: 'Wd123456'
        }
    };

    exports.session = {
        key: 'wd:sess',
        prefix: 'koa:sess:',
        maxAge: 60 * 60 * 1000, // ms
        httpOnly: true,
        encrypt: true,
        rolling: true
    };

    exports.logger = {
        consoleLevel: 'DEBUG',
        dir: path.join(app.baseDir, 'logs')
    };

    //中间件
    exports.middleware = [
        'auth',
        'errorHandler'
    ];

    //登录中间件 忽略/login
    exports.auth = {
        ignore: [
            '/login'
        ]
    }





    return exports;
};
