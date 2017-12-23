'use strict';

module.exports = app => {
    class TopicService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取文件上传数据
         * @param params
         */
        async get(params) {
            const result = await this.ctx.curl(this.app.urls('upload', params, this.config.conmonUrl), {
                method: 'get',
                dataType: 'json'
            });
            app.logger.info(result.data);
            return result.data;
        }

        async sts() {
            const result = await this.ctx.fetch(`${this.app.urls('oss')}/sts`, {
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

    return TopicService;
};
