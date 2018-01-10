const path = require('path');
const fs = require('fs');
module.exports = app => {
    const exports = {
        baseUrl: 'http://127.0.0.1:8080',
    };
    //
    // exports.siteFile = {
    //     //'/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
    // };

    exports.view = {
        cache: false
    };

    exports.vuessr = {
        layout: path.join(app.baseDir, 'app/web/view/layout.html')
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

    exports.weixin = {
        redirectUrl: '/common/weixin/auth2/authorize',
            /*必须使用format 格式化  第一个参数为 weixin_appid 第二个参数为跳转url*/
            baseCodeUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_base&state=%s#wechat_redirect',
            userinfoCodeUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_userinfo&state=%s#wechat_redirect',
            tokenUrl: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code',
            refreshTokenUrl: 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=%s&grant_type=refresh_token&refresh_token=%s',
            userinfoUrl: 'https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=zh_CN',
            jsapiTicket: {
            url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi',
                key: 'jsapi_ticket',
                expire: 7000
        },
        appid: 'wx82ebe8723ed164bd',
        appsecret: '653a169e86a06b35b2b9bc6004cffaf8',
        token: 'z5lENCz55ZocxlTqonolln6ER5O6ECr4'
    };

    exports.alipay = {
        redirectUrl: '/common/alipay/auth2/authorize',
        appid: '2016072001643424',
        baseCodeUrl: 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=%s&scope=auth_base&redirect_uri=%s&state=%s',
        userinfoCodeUrl: 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=%s&scope=auth_user&redirect_uri=%s&state=%s'
    },


    // exports.keys = '123456';
    //
    // exports.middleware = [
    //     'access'
    // ];

    exports.middleware = ['access'];

    // exports.jwt = {
    //     key: '_token',
    //     suffix: 'jwt:token',
    //     maxAge: 60 * 60 * 24,
    //     secret: '00e0ad137f6b4152893267ffa688e094'
    // };
    //
    // exports.auth = {
    //     jwt: 'jwt:token',
    //     ignore: [
    //         '/login',
    //         '/weixin/login',
    //         '/authorization',
    //     ],//这里配置需要登录验证的页面
    // },

        exports.security = {
            csrf: {
                enable: false
            },
            methodnoallow: {
                enable: false
            },
        };

    exports.cors = {
        origin: '*',
        // {string|Array} allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };

    exports.jsonp = {
        whiteList: '*',
        // whiteList: '.test.com',
        // whiteList: 'sub.test.com',
        // whiteList: [ 'sub.test.com', 'sub2.test.com' ],
    };


    exports.keys = '123456';

    exports.redis = {
        client: {
            host: '118.178.125.175',
            db: 1,
            port: 6379,
            password: 'wd123456'
        }
    };


    return exports;
};
