'use strict';
module.exports = app => {
    class InvoiceController extends app.Controller {


        async get(){
            this.ctx.validate({
                id: {type: 'string'}
            });
            let params = this.ctx.request.query;
            let member = this.ctx.token.member;
            let data = await this.service.invoice.get({
                id: params.id,
                memberId: member.id
            });
            this.ctx.body = this.ctx.helper.res(data);
        }

        async getDefault(){
            let member = this.ctx.token.member;
            let data = await this.service.invoice.getDefault({
                memberId: member.id
            });
            this.ctx.body = this.ctx.helper.res(data);
        }

        async setDefault(){
            this.ctx.validate({
                id: {type: 'string'}
            });
            let params = this.ctx.request.body;
            let member = this.ctx.token.member;
            let data = await this.service.invoice.setDefault({
                id: params.id,
                memberId: member.id
            });
            this.ctx.body = this.ctx.helper.res(data);
        }

        /**
         * 列表
         * @returns {Promise.<void>}
         */
        async list(){
            let params = this.ctx.request.query;
            this.app.logger.info(params);
            let member = this.ctx.token.member;
            params.memberId = member.id;
            let data = await this.service.invoice.list(params);
            data.condition = undefined;
            this.ctx.body = this.ctx.helper.res(data);
        }


        /**
         * 删除
         * 批量删除时使用','将id分隔开，却最好id的数量不要超过10条
         * @param ctx
         */
        async del() {
            let params = this.ctx.request.body;
            let id = params.id;

            if (!id){
                this.ctx.body = this.ctx.helper.res('请选择要删除的记录', 500);
                return;
            }

            this.app.logger.info(params);
            let member = this.ctx.token.member;
            params.memberId = member.id;
            let data = await this.service.invoice.delete(params);

            this.ctx.body = data;
        };

        async add() {
            this.ctx.validate({
                type: {type: 'intString'},
                name: {type: 'string'}
            });
            let params = this.ctx.request.body;
            let member = this.ctx.token.member;
            params.memberId = member.id;
            let data = await this.service.invoice.edit(params);
            if (data.code == 200){
                this.ctx.body = this.ctx.helper.res({
                    id: data.data.id
                });
            }else{
                this.ctx.body = this.ctx.helper.res('添加失败', 500);
            }
        };

        async edit() {
            this.ctx.validate({
                id: {type: 'string'},
                type: {type: 'intString'},
                name: {type: 'string'}
            });
            let params = this.ctx.request.body;
            let member = this.ctx.token.member;
            params.memberId = member.id;
            let data = await this.service.invoice.edit(params);

            if (data.code == 200){
                this.ctx.body = this.ctx.helper.res({
                    id: data.data.id
                });
            }else{
                this.ctx.body = this.ctx.helper.res('编辑失败', 500);
            }
        };

    }
    return InvoiceController;
};


