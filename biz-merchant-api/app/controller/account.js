'use strict';
module.exports = app => {
    class AccountController extends app.Controller {

        /**
         * 获取账户信息列表
         * @returns {Promise.<void>}
         */
        async list() {
            const data = await this.ctx.service.account.list();
            this.success(data);
        }

        /**
         * 通过id查询当前银行卡信息
         * @returns {Promise<void>}
         */
        async get(){
            const params = this.ctx.query;
            this.app.logger.info(params);
            const id = params.id;
            const data = await this.ctx.service.account.get({id});
            this.success(data);
        }

        /**
         * 删除银行卡
         * @returns {Promise<void>}
         */
        async delete(){
            let params = this.ctx.request.body;
            const data = await this.ctx.service.account.delete(params);
            this.success(data);
        }

        /**
         * 添加银行卡
         * @returns {Promise<*|{code, message, data}>}
         */
        async add(){
            let params = this.ctx.request.body;
            const data = await this.ctx.service.account.add(params);
            this.success(data);
        }

    }
    return AccountController;
};


