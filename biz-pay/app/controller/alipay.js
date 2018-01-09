module.exports = app => {

    return class AlipayController extends app.Controller {

        async login() {
            //获取code
            let params = this.ctx.request.query;
            let code = params.auth_code;
            this.app.logger.info(params);
            if (!code){
                return this.ctx.body = 'error';
            }
            params.code = params.auth_code;
            //通过code获取到token和用户的openid
            let result = await this.ctx.service.alipay.openid(params);

            //注意大小写
            let openId = result.openId;

            if (!openId){
                return this.ctx.render('error.html', {message: '系统错误'});
            }

            //检查用户是否已经绑定过支付宝
            let member = await this.ctx.service.member.getMemberByOpenId(openId, "alipay");

            if (!member || !member.id){//用户不存在
                this.ctx.redirect("/login"); //去登录
            }else{//已经存在  自动登录
                this.ctx.session.member = member;
                let redirectUrl = this.ctx.session.redirectUrl;
                if (redirectUrl){
                    this.ctx.session.redirectUrl = undefined;
                    this.ctx.redirect(redirectUrl);
                }else{
                    this.ctx.redirect("/index");
                }
            }
        }

    };
};