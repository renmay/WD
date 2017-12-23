'use strict';
module.exports = app => {
    class AddressController extends app.Controller {

        async suggestion(){
            let params = this.ctx.request.query;

            let query = params.query;

            if (!query || query.length < 2){//规定查询关键字必须大于1
                return this.ctx.body = this.ctx.helper.res();
            }

            let result = await this.service.baidu.suggestion(params);

            this.ctx.body = this.ctx.helper.res(result);
        }

        async get(){
            let params = this.ctx.request.query;
            let member = this.ctx.token.member;
            //获取用户的默认地址 id 为空时获取默认地址
            let address = await this.service.address.get({
                id: params.id,
                memberId: member.id
            });

            this.ctx.body = this.ctx.body = this.ctx.helper.res(address);;
        }

        async default(){
            let member = this.ctx.token.member;
            //获取用户的默认地址 id 为空时获取默认地址
            let address = await this.service.address.get({
                memberId: member.id
            });

            this.ctx.body = this.ctx.body = this.ctx.helper.res(address);;
        }

        async edit(){
            this.ctx.validate({
                id: {type: 'string'},
                areaInfo: {type: 'string'},
                lat: {type: 'string'},
                lng: {type: 'string'},
                detail: {type: 'string'},
                mobile: {type: 'string'},
                name: {type: 'string'}
            });
            let params = this.ctx.request.body;
            params.memberId = this.ctx.token.member.id;
            let result = await this.service.address.edit(params);

            this.ctx.body = result;
        }

        async create(){
            this.ctx.validate({
                areaInfo: {type: 'string'},
                lat: {type: 'string'},
                lng: {type: 'string'},
                detail: {type: 'string'},
                mobile: {type: 'string'},
                name: {type: 'string'}
            });
            let params = this.ctx.request.body;
            params.memberId = this.ctx.token.member.id;
            let result = await this.service.address.edit(params);

            this.ctx.body = result;
        }

        async list(){
            let params = this.ctx.request.body;
            const member = this.ctx.token.member;
            //获取用户的默认地址
            let addressList = await this.service.address.list({
                pageSize: params.pageSize,
                pageNo: params.pageNo,
                memberId: member.id
            });
            addressList.condition = undefined;

            this.ctx.body = this.ctx.helper.res(addressList);
        }

        async setDefault(){
            this.ctx.validate({
                id: {type: 'string'}
            });
            let params = this.ctx.body;
            const member = this.ctx.token.member;

            let result = await this.service.address.setDefault({
                id: params.id,
                memberId: member.id
            });

            this.ctx.body = result;
        }

        /**
         * 删除用户地址
         * @returns {Promise.<void>}
         */
        async del(){
            this.ctx.validate({
                id: {type: 'string'}
            });
            let params = this.ctx.request.body;
            const member = this.ctx.token.member;

            let result = await this.service.address.delete({
                id: params.id,
                memberId: member.id
            });

            this.ctx.body = result;
        }


    }
    return AddressController;
};




