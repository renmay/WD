'use strict';

'use strict';
module.exports = app => {
    class PayController extends app.Controller {

        /**
         * 支付
         * @returns {Promise.<*|{code, message, data}>}
         */
        async order(){

            //参数校验
            this.ctx.validate({
                payType: {type: 'intString'},
                orderNo: {type: 'string'},
                orderSource: {type: 'intString'}
            });
            let member = this.ctx.token.member;

            let params = this.ctx.request.body;
            params.ip = this.ctx.request.ip;
            params.memberId = member.id;
            let data = await this.service.order.pay(params);

            if (params.payType == 1){//微信
                return this.ctx.body = this.ctx.helper.res(JSON.parse(data.data));
            }else if (params.payType == 2){//支付宝
                return this.ctx.body = this.ctx.helper.res({
                    orderStr: data.data
                });
            }else{
                return this.ctx.body = this.ctx.helper.res("暂未支持");
            }

        }

        async result(){
            let params = this.ctx.request.query;
            let member = this.ctx.token.member;
            let data = await this.service.order.result({
                orderNo: params.orderNo,
                memberId: member.id
            });
            this.ctx.body = data;
        }

    }
    return PayController;
};


// /**
//  * 获取上传参数
//  * @param ctx
//  */
// exports.status = function* (ctx) {
//     let params = ctx.request.body;
//     this.logger.info(params);
//
//     if (!params.orderNo || '' == params.orderNo){
//         return this.body = this.helper.res("订单号不能为空", 500);
//     }
//
//     params.ip = ctx.request.ip;
//     params.memberId = ctx.session.member.id;
//
//     let order = yield this.service.order.get(params);
//
//     if (order.payStatus == 2){
//         return this.body = this.helper.res();
//     }
//     this.body = this.helper.res('', 500);
// };
//
// exports.success = function* (ctx) {
//     let params = this.request.query;
//     this.logger.info(params);
//     if (!params.orderNo || '' == params.orderNo){
//         return yield this.render("order/success.html");
//     }
//     // params.ip = ctx.request.ip;
//     // params.memberId = ctx.session.member.id;
//     // let order = yield this.service.order.get(params);
//     //
//     yield this.render("order/success.html");
// };
//
//
// /**
//  * 订单支付
//  * @param ctx
//  */
// exports.pay = function* (ctx) {
//     let params = ctx.params;
//
//     if (!params.orderNo || '' == params.orderNo){
//         return this.body = this.helper.res("订单号不能为空", 500);
//     }
//     params.ip = ctx.request.ip;
//     params.memberId = ctx.session.member.id;
//     params.source = 2; //wx
//
//     let data = yield this.service.order.pay(params);
//     this.logger.info(data);
//
//     if (data.code != 200){
//         return yield this.render("error.html", {"message": "支付出错"});
//     }
//
//     let result = data.data;
//     let sign = {};
//     let order = yield this.service.order.get(params);
//     if (order.payType == 1){//
//         result = JSON.parse(result);
//         let ticket = yield this.service.weixin.ticket();
//         sign = ctx.helper.weixinSign(ticket, this.request.href);
//         sign.appid = this.app.config.weixin.appid;
//     }
//     yield this.render("order/pay.html", {order, result, sign});
//
//
// };