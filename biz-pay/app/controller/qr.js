module.exports = app => {

    return class WeixinController extends app.Controller {

        /**
         * 扫码之后的统一入口
         * @returns {Promise.<void>}
         */
        async scan() {
            var params = this.ctx.params;

            //获取二维码编号
            let no = params.no;
            //检查是否是合法的二维码地址

            //获取浏览器类型
            let type = this.ctx.helper.brower(this.ctx.request);

            let member = this.ctx.session.member;

            //如果用户没登录 用户首先授权登录
            if (!member || !member.id){
                //获取跳转url
                // let url = await this.service.store.redirectUrl({
                //     no,
                //     type: this.ctx.helper.brower(this.ctx.request)
                // });

                let type = this.ctx.helper.brower(this.ctx.request);

                let url = this.getRedirectUrl(type);
                this.ctx.session.redirectUrl = this.ctx.request.href;

                if (!url){
                    return await this.ctx.render("illegal/illegal.js");
                }


                return await this.ctx.redirect(url);
            }


            //获取二维码对应的商家数据
            // let qr = await this.service.qr.info(no);

            let qr = {};

            if ("weixin" == type) {//微信
                //调用后台接口获取微信支付需要的数据
                // let data = this.service.sign({
                //     url: this.ctx.request.href
                // });
                let data = {};

                return await this.ctx.render("weixin/weixin.js", {
                    data,
                    qr
                });
            }else if ("alipay" == type){//支付宝
                let data = {};
                return await this.ctx.render("alipay/alipay.js", {
                    data,
                    qr
                });
            }else{//其他
                return await this.ctx.render("illegal/illegal.js");
            }

        };


        getRedirectUrl(type){
            //判断是否是微信浏览器
            if ("weixin" == type) {
                const util = require('util');

                var redirectUrl = this.app.config.domain + this.app.config.weixin.redirectUrl;
                var url = util.format(this.app.config.weixin.baseCodeUrl, this.app.config.weixin.appid, redirectUrl, 'weixin');
                this.logger.info(url);
                return url;
                //支付宝浏览器
            }else if ("alipay" == type){
                const util = require('util');

                var redirectUrl = this.app.config.domain + this.app.config.alipay.redirectUrl;
                var url = util.format(this.app.config.alipay.baseCodeUrl, this.app.config.alipay.appid, encodeURIComponent(redirectUrl), 'alipay');
                this.logger.info(url);
                return url;
            }else{
                return null;
            }

        }



    };
};