'use strict';

/**
 * 显示列表
 * @param ctx
 */
exports.list = function* (ctx) {
    let params = this.request.query;
    params.pageSize = 20;  //设置默认为20
    this.app.logger.info(params);
    let data = yield this.service.chef.list(params);
    yield this.render("chef/list.html", {data: data, params});
};


