'use strict';

module.exports = app => {
    class GoodsComboService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取数据
         * @param params
         */
        async get(params) {
            const result = await this.ctx.curl(this.app.urls('goodsCombo.id', params), {
                method: 'get',
                timeout: 30000,
                dataType: 'json'
            });
			this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }


        /**
         * 获取列表
         * @param params
         * @returns {{}}
         */
        async list(params) {
            /**
             * 请求后台接口
             */
            const result = await this.ctx.curl(this.app.urls('goodsCombo'), {
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

        /**
         * 当前套餐
         * @param params
         */
        async goodsComboCurrent(params) {
            const result = await this.ctx.curl(this.app.urls('goodsComboCurrent',params), {
                method: 'get',
                dataType: 'json'
            });
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }

        /**
         * 新品套餐
         * @param params
         */
        async goodsComboNew(params) {
            const result = await this.ctx.curl(this.app.urls('goodsComboNew',params), {
                method: 'get',
                dataType: 'json'
            });
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }




    }

    return GoodsComboService;
};
