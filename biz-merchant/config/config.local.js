module.exports = app => {
    const exports = {

    };

    exports.api = {
        base: 'http://127.0.0.1:8080',
        common: 'http://common.zzyuu.com',
        static: '',
        image: 'http://img-test.zzyuu.com'
    };

    exports.static = {
        prefix: ''
    };

    exports.redis = {
        client: {
            host: '120.79.0.38',
            db: 5,
            port: 6379,
            password: 'Wd123456'
        }
    };

    exports.development = {
        watchDirs: ['/app/data'],
        ignoreDirs: [],
        fastReady: true,
    };

    return exports;
};
