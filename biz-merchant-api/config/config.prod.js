'use strict';

module.exports = app => {
    const exports = {
        baseUrl: 'http://127.0.0.1:8080',
        outerPrefix: '/v1',
    };

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


