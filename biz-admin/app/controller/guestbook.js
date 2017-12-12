'use strict';
const rule = {
		id: {type: 'string', required: true, allowEmpty: false},
		reply: {type: 'string', required: true, allowEmpty: false}
	};

/**
 * 显示列表
 * @param ctx
 */
exports.list = function* (ctx) {
    let params = this.request.query;
    this.app.logger.info(params);
    let data = yield this.service.guestbook.list(params);
    yield this.render("guestbook/list.html", {data: data, params});
};


/**
 * 删除
 * 批量删除时使用','将id分隔开，却最好id的数量不要超过10条
 * @param ctx
 */
exports.delete = function* (ctx) {
    let params = this.request.body;
    let id = params.id;

    if (!id){
        this.body = this.helper.res('请选择要删除的记录', 500);
        return;
    }

    //判断是批量删除还是单个删除
    if (id instanceof Array){
        if (id.length > 10){
            this.body = this.helper.res('删除的条数不能为0且同时不能多于10条', 500);
            return;
        }
        params.id = id.join(',');
    }

    this.app.logger.info(params);
    let data = yield this.service.guestbook.delete(params);

    this.body = data;
};

exports.edit = function* (ctx) {
    let params = this.request.query;
    let id = params.id;

    if (id == ''){
        return this.redirect('/error');
    }

    if (id){
        let data = yield this.service.guestbook.get({id: id});
        yield this.render("guestbook/edit.html", {data, params});
        return;
    }
    yield this.render("guestbook/edit.html", {params});
    
};

/**
 * 编辑数据
 * @param ctx
 * @private
 */
exports.edit_ = function* (ctx) {
    this.validate(rule);
    let params = this.request.body;
    let data = yield this.service.guestbook.reply(params);
    yield this.body = data;
};

/**
 * 已处理
 * @param ctx
 */
exports.processed = function* (ctx) {
    let params = this.request.body;
    let data = yield this.service.guestbook.processed(params);
    yield this.body = data;
};

