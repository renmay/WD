/**
 * 生产环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */
module.exports = app => {
    const exports = {};

    exports.redis = {
        client: {
            host: '118.178.125.175',
            db: 1,
            port: 6379,
            password: ''
        }
    };


    return exports;
};
