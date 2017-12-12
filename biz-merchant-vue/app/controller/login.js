'use strict';

module.exports = app => {
    class LoginController extends app.Controller {
        async login() {
            if ('GET' == this.ctx.request.method){//get请求
                await this.ctx.render("login/login.js");
            }else{//post
                this.ctx.validate({
                    loginName: {type: 'string', required: true, allowEmpty: false},
                    password: {type: 'password', required: true, allowEmpty: false, min: 6},
                });
                const params = this.ctx.request.body;
                this.app.logger.info(params);
                //调用service中的login接口登录
                const member = await this.service.login.login(params);
                //将登陆成功的信息放入session中 后续验证用户登录中通过此信息判断用户是否登录
                this.ctx.session.member = member;

                //返回json数据
                this.ctx.body = {
                    code: 200,
                    message: 'success'
                }
            }
        };

        async logout() {
            //将登陆成功的信息放入session中 后续验证用户登录中通过此信息判断用户是否登录
            this.ctx.session.member = undefined;
            this.ctx.redirect("/login");
        };

        async submit() {
            this.ctx.session.member = {
                id: 1
            };
            //返回json数据
            this.ctx.body = {
                code: 200,
                message: 'success'
            }
        };
    }
    return LoginController;
};




