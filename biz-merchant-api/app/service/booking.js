'use strict';

module.exports = app => {
    class GoodsComboService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 预约列表
         * @param params
         */
        async bookingList(params) {
            const result = await this.ctx.curl(this.app.urls('booking'), {
                method: 'get',
                dataType: 'json',
                data: params
            });
            let data = result.data;

            if (data.code != 200){//请求出错 不抛出异常
                //throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }

        /**
         * 预约
         * @param params
         */
        async booking(params) {
            const result = await this.ctx.curl(this.app.urls('booking'), {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        async bookingRemind(params) {
            const result = await this.ctx.curl(this.app.urls('bookingRemind'), {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        async bookingStatus(params) {
            const result = await this.ctx.curl(this.app.urls('bookingStatus'), {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }



    }

    return GoodsComboService;
};
