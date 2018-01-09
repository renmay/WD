/**
 * 用户权限验证
 * @param options
 * @param app
 * @returns {sessionRedis}
 */
module.exports = () => {
    return async function sessionRedis(ctx, next) {
        //判断是否是微信浏览器
        if (this.ctx.helper.isWeixinBrower(this.ctx.request)) {

            let member = this.ctx.session.member;
            if (!member || !member.id || !member.openId){//没有登录 已经登录  但没有绑定微信 强制去绑定
                this.ctx.session.member = undefined;
                var redirectUrl = this.ctx.app.config.domain + this.ctx.app.config.weixin.redirectUrl;
                var url = util.format(this.ctx.app.config.weixin.baseCodeUrl, this.ctx.app.config.weixin.appid, redirectUrl, 'weixin');
                this.ctx.logger.info(url);

                //ajax 请求
                if (this.ctx.acceptJSON){//
                    this.ctx.response.status = 302;
                    return this.ctx.body = {
                        code: 401,
                        message: '登录超时',
                    };
                }else{
                    this.ctx.session.redirectUrl = this.ctx.request.href;
                    return this.ctx.redirect(url);
                }
            }
            //支付宝浏览器
        }else if (this.ctx.helper.isAlipayBrower(this.ctx.request)){
            let member = this.ctx.session.member;
            if (!member || !member.id || !member.alipayOpenId){//没有登录 已经登录  但没有绑定微信 强制去绑定
                this.ctx.session.member = undefined;
                var redirectUrl = this.ctx.app.config.domain + this.ctx.app.config.alipay.redirectUrl;
                var url = util.format(this.ctx.app.config.alipay.baseCodeUrl, this.ctx.app.config.alipay.appid, encodeURIComponent(redirectUrl), 'alipay');
                this.ctx.logger.info(url);
                //ajax 请求
                if (this.ctx.acceptJSON){//
                    this.ctx.response.status = 302;
                    return this.ctx.body = {
                        code: 401,
                        message: '登录超时',
                    };
                }else{
                    this.ctx.session.redirectUrl = this.ctx.request.href;
                    return this.ctx.redirect(url);
                }
            }
        }

        await next();
    };
};
