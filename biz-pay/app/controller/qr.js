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

            //获取二维码对应的商家数据
            let qr = await this.service.qr.info(no);


            if (this.ctx.helper.isWeixinBrower(this.ctx.request)){//微信
                //调用后台接口获取微信支付需要的数据
                let data = this.service.sign({
                    url: this.ctx.request.href
                });

                return await this.render("weixin/weixin.html", {
                    data,
                    qr
                });
            }else if (this.ctx.helper.isAlipayBrower(this.ctx.request)){//支付宝
                return await this.render("alipay/alipay.html", {
                    data,
                    qr
                });
            }else{//其他
                return await this.render("illegal/illegal.html");
            }

        }



    };
};