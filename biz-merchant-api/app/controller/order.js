'use strict';
module.exports = app => {
    class OrderController extends app.Controller {
        /**
         * 创建订单
         * @returns {Promise.<void>}
         */
        async create(){
            //参数校验
            this.ctx.validate({
                orderSource: {type: 'intString'},
                addressId: {type: 'string'},
                arriveTime: {type: 'string'}
            });
            let params = this.ctx.request.body;

            let goods = params.goods;

            this.app.logger.info(params);

            let check = this.checkOrder(goods);

            if (check && check.code == 500){
                return this.ctx.body = check;
            }

            let member = this.ctx.token.member;
            params.memberId = member.id;
            let data = await this.service.order.create(params);

            this.ctx.body = data;
        }

        async info(){
            let member = this.ctx.token.member;
            let result = await this.service.order.info({
                memberId: member.id
            });
            if (result.code == 200){
                var data = result.data;

                data.endTime = parseInt(data.endTime) - 1;
                data.startTime = parseInt(data.startTime);

                let bookingDate = data.bookingDate;
                let time = [];

                for (var i in bookingDate){
                    console.log(this.ctx.helper.date(bookingDate[i], 'YYYY-MM-DD'));
                    time.push(this.ctx.helper.date(bookingDate[i], 'YYYY-MM-DD'));
                }

                data.bookingDate = time;

                return this.ctx.body = this.ctx.helper.res(data);
            }

            this.ctx.body = result;
        }

        /**
         * 获取订单价格
         * @returns {Promise.<void>}
         */
        async price(){
            let member = this.ctx.token.member;
            let params = this.ctx.request.body;

            params.memberId = member.id;

            let goods = params.goods;

            this.app.logger.info(params);

            let check = this.checkOrder(goods);

            if (check && check.code == 500){
                return this.ctx.body = check;
            }

            let data = await this.service.order.calculatePrice(params);

            this.ctx.body = data;
        }


        async list(){
            let member = this.ctx.token.member;
            let params = this.ctx.request.query;
            let type = params.type;
            let status = null;
            if (!type || 0 == type){//全部订单
                //status = 0;
            }else if (1 == type){//待付款
                status = 1;
            }else if (2 == type){//待发货
                status = 2;
            }else if (3 == type){//待收货
                status = 3;
            }else if (4 == type){//待评价 已完成/已评价
                status = [4, 10];
            }else if (5 == type){//退款、售后
                status = [5, -3];
            }

            this.app.logger.info(params);
            let data = await this.service.order.list({
                pageNo: params.pageNo,
                pageSize: params.pageSize,
                status: status,
                orderByCreateTime: -1,
                memberId: member.id
            });
            data.condition = undefined;
            this.ctx.body = this.ctx.helper.res(data);
        }



        async detail(){
            let member = this.ctx.token.member;
            let params = this.ctx.request.query;

            let orderNo = params.orderNo;

            if (!orderNo || '' == orderNo){
                return this.ctx.body = this.ctx.helper.res(500, '订单号不能为空');
            }

            let data = await this.service.order.get({
                orderNo,
                memberId: member.id
            });

            this.ctx.body = this.ctx.helper.res(data);
        }


        /**
         * 收货
         * @returns {Promise.<void>}
         */
        async receive() {
            //参数校验
            this.ctx.validate({
                orderNo: {type: 'string'}
            });
            let params = this.ctx.request.body;
            let member = this.ctx.token.member;
            params.memberId = member.id;
            let data = await this.service.order.receive(params);

            this.ctx.body = data;
        }

        /**
         * 取消
         * @returns {Promise.<void>}
         */
        async cancel() {
            //参数校验
            this.ctx.validate({
                orderNo: {type: 'string'}
            });
            let params = this.ctx.request.body;
            let member = this.ctx.token.member;
            params.memberId = member.id;
            let data = await this.service.order.cancel(params);

            this.ctx.body = data;
        }

        async del() {
            //参数校验
            this.ctx.validate({
                orderNo: {type: 'string'}
            });
            let params = this.ctx.request.body;
            let member = this.ctx.token.member;
            params.memberId = member.id;
            let data = await this.service.order.del(params);

            this.ctx.body = data;
        }

        /**
         * 退款
         * @returns {Promise.<void>}
         */
        async refund() {
            //参数校验
            this.ctx.validate({
                orderNo: {type: 'string'}
            });
            let params = this.ctx.request.body;
            let member = this.ctx.token.member;
            params.memberId = member.id;
            let data = await this.service.order.refund(params);

            this.ctx.body = data;
        }

        /**
         * 催单 提醒
         * @returns {Promise.<void>}
         */
        async reminder() {
            //参数校验
            this.ctx.validate({
                orderNo: {type: 'string'}
            });
            let params = this.ctx.request.body;
            let member = this.ctx.token.member;
            params.memberId = member.id;
            let data = await this.service.order.reminder(params);

            this.ctx.body = data;
        }


        /**
         * 检查提交的商品数据是否正确
         * @param goodsId
         * @param number
         * @returns {*|{code, message, data}}
         */
        checkOrder(goods){

            try {
                goods = JSON.parse(goods);
            }catch(err) {
                return this.ctx.helper.res('商品数据错误', 500);
            }

            if (!goods || goods.length == 0){
                return this.ctx.helper.res('购买商品不能为空', 500);
            }

            for (var i = 0; i < goods.length; i++){
                let id = goods[i].id;
                let num = goods[i].number;

                if (!id || '' == id){
                    return this.ctx.helper.res('商品id不能为空', 500);
                }

                if (!num || '' == num){
                    return this.ctx.helper.res('商品数量不正确', 500);
                }

                if (/^\+?[1-9][0-9]*$/.test()){
                    return this.ctx.helper.res('商品数量不正确', 500);
                }
            }

        }
    }
    return OrderController;
};

