'use strict';
module.exports = app => {
    class MerchantController extends app.Controller {

        async type() {
            let data = [{
                type: 1,
                name: "酒店"
            }, {
                type: 2,
                name: "餐饮"
            }, {
                type: 3,
                name: "ktv"
            }, {
                type: 4,
                name: "景点"
            }, {
                type: 5,
                name: "特产"
            }, {
                type: 6,
                name: "便民服务"
            }];

            this.success(data);
        }

        /**
         * 获取商家认证信息
         * @returns {Promise.<void>}
         */
        async info() {
            const data = await this.ctx.service.merchant.info();
            this.success(data);
        }



    }
    return MerchantController;
};


