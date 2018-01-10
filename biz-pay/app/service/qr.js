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
            const result = await this.ctx.curl(this.app.urls('goods.id', params), {
                method: 'get',
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
            const result = await this.ctx.curl(this.app.urls('goods'), {
                dataType: 'json',
                data: params
            });

            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }

        /**
         * 喜欢 点赞 评论
         * @param params
         */
        async comment(params) {
            const result = await this.ctx.curl(this.app.urls('goods') + "/comment", {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        async commentStatus(params) {
            const result = await this.ctx.curl(this.app.urls('goods') + "/comment/status", {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        /**
         * 获取评论用户
         * @param params
         */
        async commentMember(params) {
            const result = await this.ctx.curl(this.app.urls('goods') + "/comment/member", {
                method: 'get',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

    }

    return GoodsComboService;
};
