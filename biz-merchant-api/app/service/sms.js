'use strict';

module.exports = app => {
    class RegisterService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        async sendCode(params) {
            /**
             * 请求验证码
             */
            const result = await this.ctx.curl(this.app.urls('sendCode'), {
                method: 'post',
                data: {
                    mobile: params.mobile,
                    ip: params.ip,
                },
                dataType: 'json',
            });

            let data = result.data;
            
            if (data.code != 200){
                throw new Error('发送失败');
            }
            this.logger.info(data);
            return data.data;
        }



    }

    return RegisterService;
};
