'use strict';
const rule = {
    merchantId: {type: 'string', required: true, allowEmpty: false},
    name: {type: 'string', required: true, allowEmpty: false},
    jingle: {type: 'string', required: true, allowEmpty: false},
    price: {type: 'bigdecimal', required: true, allowEmpty: false},
    promotionPrice: {type: 'bigdecimal', required: true, allowEmpty: false},
    marketPrice: {type: 'bigdecimal', required: true, allowEmpty: false},
    serial: {type: 'string', required: true, allowEmpty: false},
    spec: {type: 'string', required: true, allowEmpty: false},
    storage: {type: 'integer', required: true, allowEmpty: false},
    createTime: {type: 'date', required: true, allowEmpty: false},
    specValue: {type: 'string', required: true, allowEmpty: false},
    alarm: {type: 'integer', required: true, allowEmpty: false},
    sku: {type: 'string', required: true, allowEmpty: false},
    url: {type: 'string', required: true, allowEmpty: false},
    images: {type: 'string', required: true, allowEmpty: false},
};

module.exports = app => {
    class MerchantAuthController extends app.Controller {

        /**
         * 显示全部列表
         * @param ctx
         */
        async list() {
            let params = this.ctx.request.query;
            this.app.logger.info(params);
            let data = await this.service.merchantAuth.list(params);
            this.app.logger.info(data);
            await this.ctx.render("merchant/list.html", {data: data});
        };


        /**
         * 显示待审核列表
         * @param ctx
         */
        async list() {
            let params = this.ctx.request.query;
            params.storeId = this.ctx.session.member.storeId;
            this.app.logger.info(params);
            let data = await this.service.merchantAuth.list(params);
            this.app.logger.info(data);
            await this.ctx.render("merchant/list.html", {data: data});
        };


        /**
         * 获取数据
         * @param ctx
         * @returns {Promise.<*>}
         */
        async audit() {
            let params = this.ctx.request.query;
            let id = params.id;
            if (id == '') {
                return this.redirect('/error');
            }
            if (id) {
                let data = await this.service.merchantAuth.get({id: id});

                await this.ctx.render("merchant/audit.html", {data, params});
                return;
            }
        };

        /**
         * 审核通过
         * @param ctx
         * @private
         */

        async success() {
            let params = this.ctx.request.body;
            params.merchantType = this.ctx.session.member.type;
            params.storeId = this.ctx.session.member.storeId;
            params.images = imgs;
            this.app.logger.info(imgs);
            this.app.logger.info(params);
            this.app.logger.info(this.ctx.session.member);
            let data = await this.service.merchant.edit(params);
            this.ctx.body = data;
        };
        /**
         * 审核不通过
         * @param ctx
         * @private
         */
        async failure() {
            let params = this.ctx.request.body;
            params.merchantType = this.ctx.session.member.type;
            params.storeId = this.ctx.session.member.storeId;
            this.app.logger.info(imgs);
            this.app.logger.info(params);
            this.app.logger.info(this.ctx.session.member);
            let data = await this.service.merchant.edit(params);
            this.ctx.body = data;
        };
    }
    return MerchantAuthController;
}