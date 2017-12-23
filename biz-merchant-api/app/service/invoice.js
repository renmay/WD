'use strict';

module.exports = app => {
    class InvoiceService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取数据
         * @param params
         */
        async get(params) {
            const result = await this.ctx.curl(`${this.app.urls('invoice')}/get`, {
                method: 'get',
                dataType: 'json',
                data: params
            });
			this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }

        async getDefault(params) {
            const result = await this.ctx.curl(`${this.app.urls('invoice')}/default`, {
                method: 'get',
                dataType: 'json',
                data: params
            });
            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }

        async setDefault(params) {
            const result = await this.ctx.curl(`${this.app.urls('invoice')}/default`, {
                method: 'post',
                dataType: 'json',
                data: params
            });
            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }


        /**
         * 获取列表
         * @param params
         * @returns {{}}
         */
        async list(params) {
            /**
             * 请求后台接口
             */
            const result = await this.ctx.curl(this.app.urls('invoice'), {
                dataType: 'json',
                data: params
            });

            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }

        /**
         * 添加修改 如果id为空是添加id不为空是编辑
         * @param params
         * @returns {{}}
         */
        async edit(params) {
            let method = 'post';
            if (params.id && params.id != ''){
                method = 'put';
            }
            const result = await this.ctx.curl(this.app.urls('invoice'), {
                method: method,
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        /**
         * 删除
         * @param params
         */
        async delete(params) {
            const result = await this.ctx.curl(`${this.app.urls('invoice')}/delete`, {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

    }

    return InvoiceService;
};
