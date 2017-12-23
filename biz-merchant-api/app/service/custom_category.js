'use strict';

module.exports = app => {
    class CustomCategoryService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取数据
         * @param params
         */
        async get(params) {
            const result = await this.ctx.curl(this.app.urls('customCategory.id', params), {
                method: 'get',
                dataType: 'json'
            });
			this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }

        async query(params) {
            const result = await this.ctx.curl(`${this.app.urls('customCategory')}/get`, {
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


        /**
         * 获取列表
         * @param params
         * @returns {{}}
         */
        async list(params) {
            /**
             * 请求后台接口
             */
            const result = await this.ctx.curl(this.app.urls('customCategory'), {
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
            const result = await this.ctx.curl(this.app.urls('customCategory'), {
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
            const result = await this.ctx.curl(this.app.urls('customCategory.id', params), {
                method: 'delete',
                dataType: 'json'
            });
            return result.data;
        }

    }

    return CustomCategoryService;
};
