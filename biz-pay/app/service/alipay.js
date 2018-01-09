'use strict';
const util = require('util');

module.exports = app => {
    return class AlipayService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        async openid(params) {
            const result = await this.ctx.curl(`${this.app.urls('alipay')}/openid`, {
                method: 'get',
                dataType: 'json',
                data: params
            });
            app.logger.info(result.data);
            let data = result.data;
            if (data.code != 200){
                throw new Error(result.data.message ? result.data.message : 'error');
            }
            return data.data;
        }

    }
};
