/**
 * 用户权限验证
 * @param options
 * @param app
 * @returns {sessionRedis}
 */
module.exports = () => {
    return async function Browser(ctx, next) {
        //判断是否是微信浏览器
        if (ctx.helper.isWeixinBrower(ctx.request)) {

            let member = ctx.session.member;
            if (!member || !member.id || !member.openId){//没有登录 已经登录  但没有绑定微信 强制去绑定
                ctx.session.member = undefined;
                var redirectUrl = ctx.app.config.domain + ctx.app.config.weixin.redirectUrl;
                var url = util.format(ctx.app.config.weixin.baseCodeUrl, ctx.app.config.weixin.appid, redirectUrl, 'weixin');
                ctx.logger.info(url);

                //ajax 请求
                if (ctx.acceptJSON){//
                    ctx.response.status = 302;
                    return ctx.body = {
                        code: 401,
                        message: '登录超时',
                    };
                }else{
                    ctx.session.redirectUrl = ctx.request.href;
                    return ctx.redirect(url);
                }
            }
            //支付宝浏览器
        }else if (ctx.helper.isAlipayBrower(ctx.request)){
            let member = ctx.session.member;
            if (!member || !member.id || !member.alipayOpenId){//没有登录 已经登录  但没有绑定微信 强制去绑定
                ctx.session.member = undefined;
                var redirectUrl = ctx.app.config.domain + ctx.app.config.alipay.redirectUrl;
                var url = util.format(ctx.app.config.alipay.baseCodeUrl, ctx.app.config.alipay.appid, encodeURIComponent(redirectUrl), 'alipay');
                ctx.logger.info(url);
                //ajax 请求
                if (ctx.acceptJSON){//
                    ctx.response.status = 302;
                    return ctx.body = {
                        code: 401,
                        message: '登录超时',
                    };
                }else{
                    ctx.session.redirectUrl = ctx.request.href;
                    return ctx.redirect(url);
                }
            }
        }

        await next();
    };
};
