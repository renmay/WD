'use strict';
const rule = {
    id: {type: 'string', required: true}
};

/**
 * 显示列表
 * @param ctx
 */
exports.list = function* (ctx) {
    let params = this.request.query;
    params.orderByBookingTime = -1;
    this.app.logger.info(params);
    let data = yield this.service.order.list(params);
    yield this.render("order/list.html", {data: data, params});
};

exports.remind = function* (ctx) {
    let params = this.request.query;
    params.status = 3;
    params.remind = true;
    params.orderByCreateTime = -1;
    this.app.logger.info(params);
    let data = yield this.service.order.list(params);
    yield this.render("order/remind.html", {data: data, params});
};

exports.unpaid = function* (ctx) {
    let params = this.request.query;
    params.status = 1;
    params.orderByCreateTime = -1;
    this.app.logger.info(params);
    let data = yield this.service.order.list(params);
    yield this.render("order/unpaid.html", {data: data, params});
};

exports.paid = function* (ctx) {
    let params = this.request.query;
    params.status = 2;
    params.orderByCreateTime = -1;
    this.app.logger.info(params);
    let data = yield this.service.order.list(params);
    yield this.render("order/paid.html", {data: data, params});
};

exports.deliver = function* (ctx) {
    let params = this.request.query;
    params.status = 2;
    params.orderByBookingTime = 1;
    this.app.logger.info(params);
    let data = yield this.service.order.list(params);
    yield this.render("order/deliver.html", {data: data, params});
};

exports.receive = function* (ctx) {
    let params = this.request.query;
    params.status = 3;
    params.orderByCreateTime = -1;
    this.app.logger.info(params);
    let data = yield this.service.order.list(params);
    yield this.render("order/receive.html", {data: data, params});
};

exports.refund = function* (ctx) {
    let params = this.request.query;
    params.status = 5; //待退款
    params.orderByCreateTime = -1;
    this.app.logger.info(params);
    let data = yield this.service.order.refundList(params);
    yield this.render("order/refund.html", {data: data, params});
};


exports.detail = function* (ctx) {
    let params = this.request.query;
    let id = params.id;

    if (!id || id == ''){
        return this.redirect('/error');
    }

    let data = yield this.service.order.get({id: id});

    let memberId = data.memberId;

    let member = yield this.service.member.get({
        id: memberId
    });


    yield this.render("order/detail.html", {data, params, member});
};

/**
 * 确认退款
 * @param ctx
 */
exports.refunded = function* (ctx) {
    this.validate(rule);
    let params = this.request.body;
    let data = yield this.service.order.refunded(params);
    yield this.body = data;
};

/**
 * 确认收货
 * @param ctx
 */
exports.received = function* (ctx) {
    this.validate(rule);
    let params = this.request.body;
    let data = yield this.service.order.received(params);
    yield this.body = data;
};

/**
 * 开始配送
 * @param ctx
 */
exports.delivering = function* (ctx) {
    this.validate(rule);
    let params = this.request.body;
    let data = yield this.service.order.deliver(params);
    yield this.body = data;
};

exports.deliverAddress = function* (ctx) {
    let params = this.request.query;
    let id = params.id;

    if (!id || id == ''){
        return this.redirect('/error');
    }

    let data = yield this.service.order.get({id: id});

    let district = yield this.service.district.get({
        parentId: 3 //默认为上海 3
    });

    yield this.render("order/address.html", {data: data, params, district});
};

exports.deliverAddress_ = function* (ctx) {
    this.validate({
        id: {type: 'string', required: true}
    });
    let params = this.request.body;
    let data = yield this.service.order.deliverAddress(params);
    yield this.body = data;
};


