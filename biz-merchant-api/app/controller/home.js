'use strict';

/**
* 首页
* @param ctx
*/
exports.index = function* (ctx) {
    let currentDate = ctx.helper.currentDate();

    let params = {
        orderBySort: 1,
        leStartBookingTime: currentDate,
        geEndBookingTime: currentDate,
        status: 1
    }

    let list = yield this.service.goodsCombo.list(params);

    yield this.render("index.html", {list});
};


// 着陆页
exports.active = function* (ctx) {
	ctx.req.title = '着陆-食艺道';
    yield this.render("static/active.html");
};

