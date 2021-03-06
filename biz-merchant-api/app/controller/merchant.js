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

        /**
         * 获取商家审核失败原因
         * @returns {Promise<void>}
         */
        async authResult(){
            const data = await this.ctx.service.merchant.authResult();
            this.success(data);
        }

        /**
         * 修改密码
         * @returns {Promise<void>}
         */
        async changePassword(){
            let params = this.ctx.request.body;
            const data = await this.ctx.service.merchant.changePassword(params);
            this.success(data);
        }

        /**
         * 重置密码
         * @returns {Promise<*|{code, message, data}>}
         */
        async resetPassword(){
            let params = this.ctx.request.body;
            const data = await this.ctx.service.merchant.resetPassword(params);
            this.success(data);
        }

        /**
         * 修改头像
         * @returns {Promise<*|{code, message, data}>}
         */
        async changeAvatar(){
            let params = this.ctx.request.body;
            const data = await this.ctx.service.merchant.changeAvatar(params);
            this.success(data);
        }

        /**
         * 修改用户名
         * @returns {Promise<void>}
         */
        async changeUsername(){
            let params = this.ctx.request.body;
            const data =await  this.ctx.service.merchant.changeUsername(params);
            this.success(data);
        }

        /**
         * 获取个人信息
         * @returns {Promise<void>}
         */
        async userinfo(){
            const data =await this.ctx.service.merchant.userinfo();
            this.success(data);
        }
    }
    return MerchantController;
};


