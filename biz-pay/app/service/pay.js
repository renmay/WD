'use strict';

module.exports = app => {
    return class OrderService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }


        async create(params) {
            const result = await this.ctx.curl(this.app.urls('pay') + "/create", {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }


    }

};
