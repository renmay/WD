'use strict';

/**
 * 获取上传参数
 * @param ctx
 */
exports.login = function* (ctx) {
    //获取code
    let params = this.request.query;
    let code = params.code;
    this.logger.info(params);
    if (!code){
        return this.body = 'error';
    }

    //通过code获取到token和用户的openid
    let result = yield this.service.weixin.token(params);

    if (result.errcode){
        return this.render('error.html', {message: '系统错误'});
    }

    //注意大小写
    let openId = result.openid;

    if (!openId){
        return this.render('error.html', {message: '系统错误'});
    }

    //将从服务器获取得到用户微信信息保存到session中
    this.session.weixinToken = result;

    //检查用户是否已经绑定过微信
    let member = yield this.service.member.getMemberByOpenId(openId);

    if (!member || !member.id){//用户不存在
        this.redirect("/login"); //去登录
    }else{//已经存在  自动登录
        this.session.member = member;
        let redirectUrl = this.session.redirectUrl;
        if (redirectUrl){
            this.redirect(redirectUrl);
        }else{
            this.redirect("/index");
        }
    }
};

