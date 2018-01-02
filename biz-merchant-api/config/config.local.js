'use strict';

module.exports = app => {
    const exports = {
        baseUrl: 'http://127.0.0.1:8080',
        outerPrefix: '/v1',
    };

    exports.redis = {
        client: {
            host: '120.79.0.38',
            db: 5,
            port: 6379,
            password: 'Wd123456'
        }
    };


    return exports;
};


