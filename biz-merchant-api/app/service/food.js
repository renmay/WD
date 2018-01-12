'use strict';

module.exports = app => {
    class FoodService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取数据
         * @param params
         */
        async list() {
            const result = await this.ctx.fetch(this.app.urls('food')+ "/all", {
                method: 'get',
                timeout: 30000,
                dataType: 'json'
            });
            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200) {
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }

    }

    return FoodService;
};
