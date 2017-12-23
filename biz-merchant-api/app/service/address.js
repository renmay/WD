'use strict';

module.exports = app => {
    class AddressService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取用户地址
         * memberId 用户id 必传
         * id: 地址id 如果为空 返回默认地址
         * @param params
         */
        async get(params) {
            const result = await this.ctx.curl(this.app.urls('address'), {
                dataType: 'json',
                data: params
            });

			this.app.logger.info(result.data);
            let data = result.data;

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
            const result = await this.ctx.curl(`${this.app.urls('address')}/list`, {
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

            const result = await this.ctx.curl(this.app.urls('address'), {
                method: method,
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        async setDefault(params) {
            const result = await this.ctx.curl(`${this.app.urls('address')}/default`, {
                method: 'put',
                dataType: 'json',
                data: params
            });
            this.logger.info(result.data);
            return result.data;
        }

        /**
         * 删除
         * @param params
         */
        async delete(params) {
            const result = await this.ctx.curl(`${this.app.urls('address')}/delete`, {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

    }

    return AddressService;
};
