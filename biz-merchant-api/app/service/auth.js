'use strict';

module.exports = app => {
    class TopicService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        * menu(params) {
            /**
             * 请求后台接口
             */
            // const result = yield this.ctx.curl(this.app.urls('login', params), {
            //     data: {
            //         username: params.username,
            //         password: params.password,
            //     },
            //     dataType: 'json',
            // });
            const result = {
                code : 200,
                message: 'success',
                data: {
                    userId: '111111111',
                    name: '张三',
                    age: '24'
                }
            }

            return result.data;
        }
    }

    return TopicService;
};
