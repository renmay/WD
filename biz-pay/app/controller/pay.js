module.exports = app => {

    return class PayController extends app.Controller {

        async alipay() {
            let params = ctx.request.body;

            let amount = params.amount;

            if (!amount || '' == amount){
                return this.body = ctx.helper.res('金额不能为空', 500);
            }

            let member = this.session.member;
            params.memberId = member.id;
            params.ip = this.request.ip;
            params.type = "alipay";

            let order = await this.service.pay.create(params);
            this.logger.info(order);
            if (order.code == 200){
                let data = order.data;

                order.data = JSON.parse(data);

                this.body = order;
            }else{
                this.body = ctx.helper.res('下单失败', 500);
            }
        }

        async weixin() {
            let params = ctx.request.body;

            let amount = params.amount;

            if (!amount || '' == amount){
                return this.body = ctx.helper.res('金额不能为空', 500);
            }

            let member = this.session.member;
            params.memberId = member.id;
            params.ip = this.request.ip;
            params.type = "weixin";

            let order = await this.service.pay.create(params);

            if (order.code == 200){
                let data = order.data;

                order.data = JSON.parse(data);

                this.body = order;
            }else{
                this.body = ctx.helper.res('下单失败', 500);
            }
        }



    };
};