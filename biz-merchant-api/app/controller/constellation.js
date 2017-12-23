'use strict';
module.exports = app => {
    class ConstellationController extends app.Controller {

        async list() {
            let params = this.ctx.request.query;
            params.sort = 1;
            let data = await this.service.constellation.list(params);

            for (let i = 0; i < data.length; i++){
                data[i].constellation = data[i].status;
                data[i].status = 0;
            }

            this.ctx.body = this.ctx.helper.res(data);
        };

    }
    return ConstellationController;
};
