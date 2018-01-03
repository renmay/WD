'use strict';

module.exports = app => {
    class ModuleService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取数据
         * @returns {Promise<void>}
         */
        async get() {
            const result = await this.ctx.fetch(this.app.urls('module'), {
                method: 'get',
                timeout: 30000,
                dataType: 'json'
            });
            this.app.logger.info(result.data);
            this.app.logger.info(result);
            let data = result.data;

            if (data.code != 200) {
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }
    }

    return ModuleService;
};
