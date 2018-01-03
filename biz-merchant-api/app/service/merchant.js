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
        async info(params) {
            const result = await this.ctx.fetch(`${this.app.urls('merchant')}/auth/info`, {
                method: 'get',
                dataType: 'json',
                data: params
            });
            this.app.logger.info(result.data);
            if (result.data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return result.data.data;
        }

        /**
         * 修改密码
         * @param params
         */
        async changePassword(params) {
            const result = await this.ctx.fetch(`${this.app.urls('merchant')}/password`, {
                method: 'post',
                dataType: 'json',
                data: params
            });
            this.app.logger.info(result.data);
            if (result.data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return result.data.data;
        }

        /**
         * 重置密码
         * @param params
         */
        async resetPassword(params) {
            const result = await this.ctx.fetch(`${this.app.urls('merchant')}/reset/password`, {
                method: 'post',
                dataType: 'json',
                data: params
            });
            this.app.logger.info(result.data);
            if (result.data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return result.data.data;
        }


    }

    return MerchantService;
};
