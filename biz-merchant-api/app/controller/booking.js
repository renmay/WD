'use strict';

//预约
exports.booking = function* (ctx) {
    let params = this.request.body;
    if (!params.id || '' == params.id){
        return this.body = this.helper.res("不能为空", 500);
    }
    params.memberId = ctx.session.member.id;
    let result = yield this.service.booking.booking(params);

    this.body = result;
};

//预约提醒
exports.bookingRemind = function* (ctx) {
    let params = this.request.body;
    if (!params.id || '' == params.id){
        return this.body = this.helper.res("不能为空", 500);
    }
    params.memberId = ctx.session.member.id;
    let result = yield this.service.booking.bookingRemind(params);

    this.body = result;
};
