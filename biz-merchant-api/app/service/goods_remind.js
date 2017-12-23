'use strict';

module.exports = app => {
    class GoodsRemindService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取数据
         * @param params
         */
        async get(params) {
            const result = await this.ctx.curl(`${this.app.urls('goodsRemind')}/get`, {
                method: 'get',
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
         * 获取列表
         * @param params
         * @returns {{}}
         */
        async list(params) {
            /**
             * 请求后台接口
             */
            const result = await this.ctx.curl(this.app.urls('goodsRemind'), {
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
         * 添加修改 如果id为空是添加id不为空是编辑
         * @param params
         * @returns {{}}
         */
        async edit(params) {
            let method = 'post';
            if (params.id && params.id != ''){
                method = 'put';
            }
            const result = await this.ctx.curl(this.app.urls('goodsRemind'), {
                method: method,
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        async status(params) {
            const result = await this.ctx.curl(`${this.app.urls('goodsRemind')}/status`, {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        async open(params) {
            const result = await this.ctx.curl(`${this.app.urls('goodsRemind')}/open`, {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        async close(params) {
            const result = await this.ctx.curl(`${this.app.urls('goodsRemind')}/close`, {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        /**
         * 删除
         * @param params
         */
        async delete(params) {
            const result = await this.ctx.curl(`${this.app.urls('goodsRemind')}/delete`, {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

    }

    return GoodsRemindService;
};
