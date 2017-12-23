'use strict';
module.exports = app => {
    class SmsController extends app.Controller {
        /**
         * 发送验证码
         * @param ctx
         */
        async sendCode(ctx) {
            //参数校验
            this.ctx.validate({
                mobile: {type: 'mobile'},
                type: {type: 'intString'}
            });
            let params = this.ctx.request.body;
            params.ip = this.ctx.request.ip;

            let code = null;


            if (1 == params.type){//注册

                const flag = await this.service.member.mobileExists({
                    mobile: params.mobile
                });

                if (flag.code == 200 && flag.data){
                    return this.ctx.body = {
                        code: 500,
                        message: '用户已经存在'
                    }
                }

                //调用service中的sendcode接口获取验证码
                // const data = await this.service.sms.sendCode(params);
                const data = {
                    code: 8888
                };
                this.ctx.token.register = {
                    code: data.code,
                    mobile: params.mobile
                }
                code = data.code;
            }else if (3 == params.type){//重置密码
                //通过手机号获取用户信息
                const flag = await this.service.member.mobileExists({
                    mobile: params.mobile
                });

                if (flag.code == 200 && !flag.data){
                    return this.ctx.body = {
                        code: 500,
                        message: '用户已经存在'
                    }
                }

                //调用service中的sendcode接口获取验证码
                const data = await this.service.sms.sendCode(params);
                // const data = {
                //     code: 8888
                // };
                this.ctx.token.reset = {
                    code: data.code,
                    mobile: params.mobile
                }
                code = data.code;
            }

            if (code){
                this.success('发送成功');
            }else{
                this.fail('发送失败');
            }

        }



    }
    return SmsController;
};


