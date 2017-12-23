'use strict';
module.exports = app => {
    class OrderController extends app.Controller {

        /**
         * 获取评论列表
         * @returns {Promise.<void>}
         */
        async list(){
            //参数校验
            let params = this.ctx.request.query;
            let goodsId = params.goodsId;

            if (!goodsId || '' == goodsId){
                return this.ctx.body = this.ctx.helper.res('商品id不能为空', 500);
            }

            let data = await this.service.comment.list({
                goodsId: goodsId
            });
            data.condition = undefined;

            this.ctx.body = this.ctx.helper.res(data);
        }

        async goods(){
            //参数校验
            let params = this.ctx.request.query;
            let orderNo = params.orderNo;

            if (!orderNo || '' == orderNo){
                return this.ctx.body = this.ctx.helper.res('订单号不能为空', 500);
            }

            let member = this.ctx.token.member;
            params.memberId = member.id;
            let data = await this.service.comment.goods({
                orderNo: orderNo,
                memberId: member.id
            });

            this.ctx.body = this.ctx.helper.res(data);
        }

        /**
         * 获取订单价格
         * @returns {Promise.<void>}
         */
        async add(){
            //参数校验
            this.ctx.validate({
                orderNo: {type: 'string'},
                comment: {type: 'string'}
            });

            let member = this.ctx.token.member;
            let params = this.ctx.request.body;

            params.memberId = member.id;

            let data = await this.service.comment.add(params);

            this.ctx.body = data;
        }


    }
    return OrderController;
};
