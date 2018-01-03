'use strict';
module.exports = app => {
    class ModuleController extends app.Controller {

        /**
         * 获取店铺模块
         * @returns {Promise<void>}
         */
        async get() {
            const data = await this.ctx.service.module.get();
            return this.success(data);
        }
    }

    return ModuleController;
};


