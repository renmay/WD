'use strict';

exports.add = function* (ctx) {
    let params = this.request.body;
    if (!params.goodsComboId || '' == params.goodsComboId){
        return this.body = this.helper.res("商品id不能为空", 500);
    }
    let member = ctx.session.member;
    params.number = 1;
    params.memberId = member.id;
    let cart = yield this.service.cart.edit(params);

    let result = yield this.service.cart.count({
        memberId: member.id,
        status: 1
    });
    this.body = result;
};

exports.edit = function* (ctx) {
    let params = this.request.body;
    if (!params.id || '' == params.id){
        return this.body = this.helper.res("购物车id不能为空", 500);
    }
    // params.number = 1;
    params.memberId = ctx.session.member.id;
    let result = yield this.service.cart.edit(params);

    this.body = result;
};

exports.del = function* (ctx) {
    let params = this.request.body;
    if (!params.id || '' == params.id){
        return this.body = this.helper.res("购物车id不能为空", 500);
    }
    params.memberId = ctx.session.member.id;
    let result = yield this.service.cart.delete(params);

    this.body = result;
};

exports.count = function* (ctx) {
    let params = this.request.body;
    params.memberId = ctx.session.member.id;
    params.status = 1;
    let result = yield this.service.cart.count(params);
    this.body = result;
};
