'use strict';

module.exports = app => {
    class MerchantService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }


        /**
         * 获取数据
         * @param params
         */
        async get(params) {
            const result = await this.ctx.fetch(this.app.urls('merchant.id', params), {
                method: 'get',
                dataType: 'json'
            });
            this.app.logger.info(result.data);
            if (result.data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return result.data.data;
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
            const result = await this.ctx.fetch(this.app.urls('merchant'), {
                dataType: 'json',
                data: params
            });

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
            const result = await this.ctx.fetch(this.app.urls('merchant'), {
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
            const result = await this.ctx.fetch(this.app.urls('merchant.id', params), {
                method: 'delete',
                dataType: 'json'
            });
            return result.data;
        }

        async mobileIsExist(params) {

            /**
             * 请求后台接口
             */
            const result = await this.ctx.fetch(this.app.urls('merchantMobileIsExist'), {
                method: 'post',
                data: {
                    params
                },
                dataType: 'json',
            });

            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data;
        }

        async usernameIsExist(params) {
            /**
             * 请求后台接口
             */
            const result = await this.ctx.fetch(this.app.urls('merchantUsernameIsExist'), {
                method: 'post',
                data: {
                    params
                },
                dataType: 'json',
            });

            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data;
        }

        async modifyPassword(params) {
            this.app.logger.info(params);
            /**
             * 请求后台接口
             */
            const result = await this.ctx.fetch(this.app.urls('selleModifyPassword'), {
                method: 'post',
                data: params,
                dataType: 'json',
            });

            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data;
        }

        async menu(params) {
            this.app.logger.info(params);
            /**
             * 请求后台接口
             */
            const result = await this.ctx.fetch(`${this.app.urls('merchantMenu')}/list`, {
                method: 'get',
                dataType: 'json',
            });

            let data = result.data;
            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }

        async audit(params) {
            this.app.logger.info(params);

            const result = await this.ctx.fetch(`/admin/merchant/auth/info`, {
                method: 'get',
                dataType: 'json',
            });

            let data = result.data;
            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }


    }
    return MerchantService;
};
