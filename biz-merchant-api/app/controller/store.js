'use strict';
module.exports = app => {
    class StoreController extends app.Controller {

        /**
         * 获取用户当前管理店铺
         * @returns {Promise<void>}
         */
        async get() {
            const data = await this.ctx.service.store.get();
            return this.success(data);
        }

        /**
         * 修改店铺
         * @returns {Promise<void>}
         */
        async edit() {
            let params = this.ctx.request.query;
            const data = await this.ctx.service.store.edit(params);
            return this.success(data);
        }
    }

    return StoreController;
};


