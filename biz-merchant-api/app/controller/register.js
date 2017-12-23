'use strict';
module.exports = app => {
    class RegisterController extends app.Controller {

        async register() {
            //参数校验
            this.ctx.validate({
                mobile: {type: 'string'},
                password: {type: 'password', min: 6},
                code: {type: 'string'}
            });
            let params = this.ctx.request.body;
            app.logger.info(params);
            let register = this.ctx.token.register;

            if (!register){
                return this.ctx.body = this.ctx.helper.res('请先发送验证码', 500);
            }

            if (params.code != register.code){
                return this.ctx.body = this.ctx.helper.res('验证码不正确', 500);
            }

            if (params.mobile != register.mobile){
                return this.ctx.body = this.ctx.helper.res('请使用发送验证码手机注册', 500);
            }

            params.ip = this.ctx.request.ip;
            //注册
            const member = await this.service.register.register(params);
            this.ctx.token.member = member;

            //成功后清空session中验证码
            this.ctx.token.register = undefined;

            this.success();
        }

        async registerInfo() {
            let params = this.ctx.request.body;
            params.ip = this.ctx.request.ip;
            //注册
            const data = await this.service.register.info(params);

            this.success(data);
        }

        /**
         * 手机号码是否存在
         * @returns {Promise.<void>}
         */
        async exists(){
            let params = this.ctx.request.body;
            this.ctx.validate({
                mobile: {type: 'string'}
            });

            const data = await this.service.member.mobileExists(params);
            this.success(data);
        }

    }
    return RegisterController;
};

