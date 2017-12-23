'use strict';
module.exports = app => {
    class CouponController extends app.Controller {

        /**
         * 优惠卷列表
         * @returns {Promise.<void>}
         */
        async list(){
            let member = this.ctx.token.member;
            let data = await this.service.coupon.list({
                memberId: member.id
            });
            data.condition = undefined;
            this.ctx.body = this.ctx.helper.res(data);
        }


        async normal(){
            let member = this.ctx.token.member;
            let data = await this.service.coupon.list({
                memberId: member.id,
                status: 1
            });
            data.condition = undefined;
            this.ctx.body = this.ctx.helper.res(data);
        }

    }
    return CouponController;
};