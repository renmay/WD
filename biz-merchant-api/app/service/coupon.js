'use strict';

module.exports = app => {
    class CouponService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }


        /**
         * 会员优惠卷
         * @param params
         * @returns {{}}
         */
        async list(params) {
            /**
             * 请求后台接口
             */
            const result = await this.ctx.curl(`${this.app.urls('coupon')}/list`, {
                dataType: 'json',
                data: params
            });

            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }

        async count(params) {
            /**
             * 请求后台接口
             */
            const result = await this.ctx.curl(`${this.app.urls('coupon')}/count`, {
                dataType: 'json',
                data: params
            });

            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }



    }

    return CouponService;
};
