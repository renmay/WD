module.exports = app => {

    return class QrController extends app.Controller {

        async login() {
            //获取code
            let params = this.ctx.request.query;
            let code = params.code;
            this.logger.info(params);
            if (!code){
                return this.body = 'error';
            }

            //通过code获取到token和用户的openid
            let result = await this.service.weixin.token(params);

            if (result.errcode){
                return this.render('error.html', {message: '系统错误'});
            }

            //注意大小写
            let openId = result.openid;

            if (!openId){
                return this.render('error.html', {message: '系统错误'});
            }

            //检查用户是否已经绑定过微信
            let member = await this.service.member.getMemberByOpenId(openId, "weixin");

            if (!member || !member.id){//用户不存在
                this.redirect("/login"); //去登录
            }else{//已经存在  自动登录
                this.session.member = member;
                let redirectUrl = this.session.redirectUrl;
                if (redirectUrl){
                    this.session.redirectUrl = undefined;
                    this.redirect(redirectUrl);
                }else{
                    this.redirect("/index");
                }
            }
        }



    };
};