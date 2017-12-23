'use strict';

module.exports = app => {
    class TopicService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        * save(params) {
            //调用后台图片服务保存图片
            console.log(this.app.urls('image', params));
            const result = yield this.ctx.curl(`${this.app.urls('image')}/save`, {
                method: "post",
                dataType: 'json',
                data: params
            });
            this.app.logger.info(result.data);
            if (result.data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return result.data.data;
        }
    }

    return TopicService;
};
