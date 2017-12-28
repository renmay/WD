'use strict';

module.exports = app => {
    class PrinterService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取数据
         * @param params
         */
        async list() {
            const result = await this.ctx.fetch(this.app.urls('printer')+ "/list", {
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
         * 获取数据
         * @param params
         */
        async get(params) {
            this.app.logger.info("service:"+params);
            const result = await this.ctx.fetch(this.app.urls('printer')+'/get', {
                method: 'get',
                timeout: 30000,
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


        /**
         * 添加
         * @param params
         * @returns {{}}
         */
        async add(params) {
            /**
             * 请求后台接口
             */
            const result = await this.ctx.fetch(this.app.urls('printer')+'/add', {
                method: 'post',
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


        /**
         * 修改
         * @param params
         * @returns {{}}
         */
        async edit(params) {
            /**
             * 请求后台接口
             */
            const result = await this.ctx.fetch(this.app.urls('printer')+'/edit', {
                method: 'post',
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


        /**
         * 删除
         * @param params
         * @returns {{}}
         */
        async delete(params) {
            /**
             * 请求后台接口
             */
            this.app.logger.info('delete params:'+JSON.stringify(params));
            const result = await this.ctx.fetch(this.app.urls('printer')+'/delete', {
                method: 'post',
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

        /**
         * 打印
         * @param params
         * @returns {{}}
         */
        async print(params) {
            /**
             * 请求后台接口
             */
            const result = await this.ctx.fetch(this.app.urls('printer')+'/print', {
                method: 'post',
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


        /**
         * 打印
         * @param params
         * @returns {{}}
         */
        async printAll(params) {
            /**
             * 请求后台接口
             */
            const result = await this.ctx.fetch(this.app.urls('printer')+'/print/all', {
                method: 'post',
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

    return PrinterService;
};
