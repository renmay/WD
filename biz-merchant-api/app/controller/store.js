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
        async edit_() {
            let params = this.ctx.request.body;
            this.app.logger.info(params);
            const data = await this.ctx.service.store.edit_(params);
            return this.success(data);
        }
    }

    return StoreController;
};


