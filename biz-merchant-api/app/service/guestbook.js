'use strict';

module.exports = app => {
    class GuestbookService extends app.Service {
        constructor(ctx) {
            super(ctx);
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
            const result = await this.ctx.curl(this.app.urls('guestbook'), {
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
            const result = await this.ctx.curl(this.app.urls('guestbook'), {
                method: 'post',
                dataType: 'json',
                data:params
            });
            if (result.data.code != 200){
                throw new Error(result.data.message ? result.data.message : 'error');
            }
            return result.data.data;
        }

    }

    return GuestbookService;
};
