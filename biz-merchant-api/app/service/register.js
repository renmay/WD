'use strict';

module.exports = app => {
    class RegisterService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        async register(params) {
            /**
             * 注册接口
             */
            const result = await this.ctx.fetch(this.app.urls('register'), {
                method: 'post',
                data: {
                    mobile: params.mobile,
                    password: params.password,
                    ip: params.ip,
                },
                dataType: 'json',
            });

            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }


        async info(params) {
            /**
             * 补充信息
             */
            const result = await this.ctx.fetch(`${this.app.urls('register')}/info`, {
                method: 'post',
                data: params,
                dataType: 'json',
            });

            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }



    }

    return RegisterService;
};
