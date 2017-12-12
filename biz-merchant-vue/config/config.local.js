const path = require('path');
const ip = require('ip');
const EasyWebpack = require('easywebpack-vue');
module.exports = app => {
    const exports = {

    };

    exports.api = {
        baseUrl: 'http://127.0.0.1:8080',
        conmonUrl: 'http://common.zzyuu.com'
    };

    exports.redis = {
        client: {
            host: '118.178.125.175',
            db: 5,
            port: 6379,
            password: 'wd123456'
        }
    };

    exports.static = {
        maxAge: 0 // maxAge 缓存，默认 1 年
    };

    exports.development = {
        watchDirs: ['build'], // 指定监视的目录（包括子目录），当目录下的文件变化的时候自动重载应用，路径从项目根目录开始写
        ignoreDirs: ['app/web', 'public', 'config'] // 指定过滤的目录（包括子目录）
    };

    exports.logview = {
        dir: path.join(app.baseDir, 'logs')
    };

    exports.vuessr = {
        injectCss: false
    };

    exports.webpack = {
        webpackConfigList: EasyWebpack.getWebpackConfig()
    };

    const localIP = ip.address();
    const domainWhiteList = [];
    [7001, 9002, 9003].forEach(port => {
        domainWhiteList.push(`http://localhost:${port}`);
        domainWhiteList.push(`http://127.0.0.1:${port}`);
        domainWhiteList.push(`http://${localIP}:${port}`);
    });

    exports.security = { domainWhiteList };

    return exports;
};
