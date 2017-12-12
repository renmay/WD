const path = require('path');
const fs = require('fs');
const url = require('./url');

module.exports = app => {
    const exports = {
        url: url
    };

    //中间件
    exports.middleware = [
        'access',
        'auth',
        'errorHandler'
    ];

    //登录中间件 忽略/login
    exports.auth = {
        ignore: '/login'
    }

    exports.redis = {
        client: {
            host: '118.178.125.175',
            db: 1,
            port: 6379,
            password: ''
        }
    };

    exports.session = {
        key: 'wd:sess',
        prefix: 'koa:sess:',
        maxAge: 60 * 60 * 1000, // ms
        httpOnly: true,
        encrypt: true,
        rolling: true
    }

    exports.siteFile = {
        '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
    };

    exports.view = {
        cache: false
    };

    exports.vuessr = {
        layout: path.join(app.baseDir, 'app/web/view/layout.html'),
        injectRes: [
            // {
            //  inline: true,
            //  url: path.join(app.baseDir, 'app/web/framework/inject/inline.js')
            // },
            // {
            //  inline: true,
            //  manifest: true,
            //  url: 'pack/inline.js'
            // }
        ]
    };

    exports.logger = {
        consoleLevel: 'DEBUG',
        dir: path.join(app.baseDir, 'logs')
    };

    exports.static = {
        prefix: '/public/',
        dir: path.join(app.baseDir, 'public')
    };

    exports.security = {
        csrf: {
            enable: false
        }
    };

    exports.keys = '123456';



    return exports;
};
