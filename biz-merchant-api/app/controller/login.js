'use strict';
module.exports = app => {
    class LoginController extends app.Controller {

        async login() {
            this.ctx.validate({
                loginName: {type: 'string', required: true, allowEmpty: false},
                password: {type: 'password', required: true, allowEmpty: false, min: 6},
            });
            const params = this.ctx.request.body;
            params.ip = this.ctx.request.ip;

            this.logger.info(params);
            //调用service中的login接口登录
            const member = await this.ctx.service.login.login(params);
            //将登陆成功的信息放入token中 后续验证用户登录中通过此信息判断用户是否登录
            this.ctx.token.member = member;

            this.success({
                status: member.status,
                progress: member.progress
            }, "登录成功");
        }

        /**
         * 退出登录
         * @returns {Promise.<void>}
         */
        async logout(){
            //将用户的session置为空
            this.ctx.token.member = undefined;
            this.success("退出成功");
        }

    }
    return LoginController;
};


