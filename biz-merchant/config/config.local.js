module.exports = app => {
    const exports = {

    };

    exports.api = {
        base: 'http://127.0.0.1:8080',
        common: 'http://common.zzyuu.com',
        static: '',
        image: 'http://img.zzyuu.com'
    };

    exports.static = {
        prefix: ''
    };

    exports.redis = {
        client: {
            host: '118.178.125.175',
            db: 5,
            port: 6379,
            password: 'wd123456'
        }
    };

    exports.development = {
        watchDirs: ['/app/data'],
        ignoreDirs: [],
        fastReady: true,
    };

    return exports;
};
