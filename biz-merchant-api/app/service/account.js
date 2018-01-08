'use strict';

module.exports = app => {
    class AccountService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取数据
         * @param params
         */
        async list() {
            const result = await this.ctx.fetch(this.app.urls('account'), {
                method: 'get',
                dataType: 'json',
            });
            this.app.logger.info(result.data);
            const data = result.data;
            if (result.data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }
            return result.data.data;
        }

        /**
         * 获取一条数据
         * @param params
         */
        async get(params) {
            const result = await this.ctx.fetch(this.app.urls('account.id', params), {
                method: 'get',
                dataType: 'json'
            });
            this.app.logger.info(result.data);
            const data = result.data;
            if (result.data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }
            return result.data.data;
        }
        /**
         * 添加银行卡
         * @param params
         */
        async add(params) {
            const result = await this.ctx.fetch(this.app.urls('account'), {
                method: 'post',
                dataType: 'json',
                data: params
            });
            this.app.logger.info(result.data);
            const data = result.data;
            if (result.data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }
            return result.data.data;
        }
        /**
         * 删除银行卡
         * @param params
         */
        async delete(params) {
            const result = await this.ctx.fetch(this.app.urls('account.id', params), {
                method: 'delete',
                dataType: 'json'
            });
            this.app.logger.info(result.data);
            const data = result.data;
            if (result.data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }
            return result.data.data;
        }

        /**
         * 获取银行卡数量
         * @param params
         */
        async quantity() {
            const result = await this.ctx.fetch(this.app.urls('account')+'/quantity', {
                method: 'post',
                dataType: 'json',
            });
            this.app.logger.info(result.data);
            const data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return result.data.data;
        }

    }

    return AccountService;
};
