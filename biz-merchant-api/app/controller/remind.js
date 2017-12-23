'use strict';

module.exports = app => {
    class RemindController extends app.Controller {

        async add() {
            this.ctx.validate({
                goodsId: {type: 'string'}
            });
            let params = this.ctx.request.body;
            let member = this.ctx.token.member;
            let data = await this.service.goodsRemind.edit({
                goodsId: params.goodsId,
                memberId: member.id
            });
            this.ctx.body = this.ctx.helper.res();
        }

        async status() {
            this.ctx.validate({
                goodsId: {type: 'string'}
            });
            let params = this.ctx.request.body;
            let member = this.ctx.token.member;
            let data = await this.service.goodsRemind.status({
                goodsId: params.goodsId,
                memberId: member.id
            });
            this.ctx.body = data;
        }


        async open() {
            this.ctx.validate({
                goodsId: {type: 'string'}
            });
            let params = this.ctx.request.body;
            let member = this.ctx.token.member;
            let data = await this.service.goodsRemind.open({
                goodsId: params.goodsId,
                memberId: member.id
            });
            this.ctx.body = this.ctx.helper.res();
        }

        async close() {
            this.ctx.validate({
                goodsId: {type: 'string'}
            });
            let params = this.ctx.request.body;
            let member = this.ctx.token.member;
            let data = await this.service.goodsRemind.close({
                goodsId: params.goodsId,
                memberId: member.id
            });
            this.ctx.body = this.ctx.helper.res();
        }

        async delete() {
            this.ctx.validate({
                goodsId: {type: 'string'}
            });
            let params = this.ctx.request.body;
            let member = this.ctx.token.member;
            console.log(params);
            let data = await this.service.goodsRemind.delete({
                goodsId: params.goodsId,
                memberId: member.id
            });

            this.ctx.body = data;
        }

        async list() {
            let params = this.ctx.request.query;
            this.app.logger.info(params);
            let member = this.ctx.token.member;
            params.memberId = member.id;

            let data = await this.service.goodsRemind.list(params);
            data.condition = undefined;
            this.ctx.body = this.ctx.helper.res(data);
        }

        async get() {
            let member = this.ctx.token.member;
            let data = await this.service.goodsRemind.get({
                memberId: member.id
            });
            this.ctx.body = this.ctx.helper.res(data);
        }

    }
    return RemindController;
};
