'use strict';

module.exports = app => {
    class CustomController extends app.Controller {
        /**
         * 获取定制类型
         * @returns {Promise.<*|{code, message, data}>}
         */
        async type(){
            let params = this.ctx.request.query;

            if (!params.type || !(params.type == 1 || params.type == 2)){
                return this.ctx.body = this.ctx.helper.res("定制类型不正确");
            }

            if (!params.parentId){
                params.parentId = '0';
            }

            let parent = await this.service.customCategory.list({
                type: params.type,
                parentId: params.parentId
            });
            this.ctx.body = this.ctx.helper.res(parent);
        }

        /**
         * 类型详细
         * @returns {Promise.<*|{code, message, data}>}
         */
        async getType(){
            let params = this.ctx.request.query;
            //如果有id 返回具体的数据
            if (!params.id){
                return this.ctx.body = this.ctx.helper.res("id不能为空");
            }
            let category = await this.service.customCategory.query({
                id: params.id
            });

            return this.ctx.body = this.ctx.helper.res(category);
        }

        /**
         * 定制案例
         * @returns {Promise.<void>}
         */
        async case(){
            let params = this.ctx.request.query;

            if (!params.type || !(params.type == 1 || params.type == 2)){
                return this.ctx.body = this.ctx.helper.res("定制类型不正确");
            }

            let customCase = await this.service.customCase.list({
                type: params.type
            });

            this.ctx.body = this.ctx.helper.res(customCase);
        }

        async list(){
            let member = this.ctx.token.member;
            let params = this.ctx.request.query;
            let custom = await this.service.custom.list({
                memberId: member.id,
                pageNo: params.pageNo,
                pageSize: params.pageSize
            });

            custom.condition = undefined;
            this.ctx.body = this.ctx.helper.res(custom);
        }

        /**
         * 定制详细
         * @returns {Promise.<void>}
         */
        async detail(){
            let params = this.ctx.request.query;
            let customId = params.id;

            let member = this.ctx.token.member;

            let custom = await this.service.custom.get({
                memberId: member.id,
                id: customId
            });

            this.ctx.body = this.ctx.helper.res(custom);
        }

        /**
         * 添加
         * @returns {Promise.<void>}
         */
        async create(){

            this.ctx.validate({
                // price: {type: 'string'},
                // home: {type: 'string'},
                // place: {type: 'string'},
                require: {type: 'string'},
                startTime: {type: 'string'},
                customerType: {type: 'string'},
                people: {type: 'intString'},
                addressId: {type: 'string'},
            });

            let member = this.ctx.token.member;
            let params = this.ctx.request.body;

            params.memberId = member.id;
            let result = await this.service.custom.edit(params);

            this.ctx.body = result;
        }

        /**
         * 取消
         * @returns {Promise.<void>}
         */
        async cancel(){
            this.ctx.validate({
                id: {type: 'string'}
            });

            let member = this.ctx.token.member;
            let params = this.ctx.request.body;

            params.memberId = member.id;
            let result = await this.service.custom.delete(params);

            this.ctx.body = result;
        }
    }
    return CustomController;
};











