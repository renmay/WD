'use strict';
module.exports = app => {
    class GoodsController extends app.Controller {
        async pre() {
            let result = await this.service.goods.pre();
            result.condition = undefined;
            this.ctx.body = this.ctx.helper.res(result);
        }

        async recommend() {
            let result = await this.service.goods.recommend();
            result.condition = undefined;
            this.ctx.body = this.ctx.helper.res(result.list);
        }

        async list() {
            let result = await this.service.goods.list();
            result.condition = undefined;
            this.ctx.body = this.ctx.helper.res(result);
        }

        async detail() {
            let params = this.ctx.request.query;

            if (!params.id){
                this.ctx.body = this.ctx.helper.res("商品id不能为空");
            }

            let result = await this.service.goods.get(params);
            this.ctx.body = this.ctx.helper.res(result);
        }

        async group() {
            let params = this.ctx.request.query;

            if (!params.id){
                this.ctx.body = this.ctx.helper.res("商品id不能为空");
            }

            let result = await this.service.goods.group({
                goodsGroupId: params.id
            });
            this.ctx.body = this.ctx.helper.res(result);
        }

        async like() {
            //参数校验
            this.ctx.validate({
                goodsId: {type: 'string'}
            });

            let member = this.ctx.token.member;
            let params = this.ctx.request.body;

            params.memberId = member.id;

            let data = await this.service.goods.like({
                goodsId: params.goodsId,
                memberId: member.id

            });
            this.ctx.body = data;
        }

    }
    return GoodsController;
};
