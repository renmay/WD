'use strict';
module.exports = app => {
    class FoodController extends app.Controller {

        /**
         * 获取所有打印机
         * @returns {Promise<void>}
         */
        async list() {
            const data = await this.ctx.service.food.list();
            return this.success(data);
        }

    }

    return FoodController;
};


