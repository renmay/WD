'use strict';

module.exports = app => {
    class StoreService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取数据
         * @returns {Promise<void>}
         */
        async get() {
            const result = await this.ctx.fetch(this.app.urls('store'), {
                method: 'get',
                timeout: 30000,
                dataType: 'json'
            });
            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200) {
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }


        /**
         * 修改
         * @param params
         * @returns {{}}
         */
        async edit_(params) {
            this.app.logger.info(params);

            /**
             * 请求后台接口
             */
            const result = await this.ctx.fetch(this.app.urls('store'), {
                method: 'put',
                dataType: 'json',
                data: params
            });

            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200) {
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }



    }

    return StoreService;
};
