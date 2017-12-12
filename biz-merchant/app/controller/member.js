'use strict';
const rule = {
		mobile: {type: 'string', required: true, allowEmpty: false},
		email: {type: 'string', required: true, allowEmpty: false},
		salt: {type: 'string', required: true, allowEmpty: false},
		password: {type: 'string', required: true, allowEmpty: false},
		tradePassword: {type: 'string', required: true, allowEmpty: false},
		name: {type: 'string', required: true, allowEmpty: false},
		nickName: {type: 'string', required: true, allowEmpty: false},
		avatar: {type: 'string', required: true, allowEmpty: false},
		regip: {type: 'string', required: true, allowEmpty: false},
		status: {type: 'integer', required: true, allowEmpty: false},
		sex: {type: 'integer', required: true, allowEmpty: false},
		memo: {type: 'string', required: true, allowEmpty: false},
		regtime: {type: 'date', required: true, allowEmpty: false},
		updateTime: {type: 'date', required: true, allowEmpty: false},
		points: {type: 'integer', required: true, allowEmpty: false},
		freezePoints: {type: 'integer', required: true, allowEmpty: false},
		money: {type: 'bigdecimal', required: true, allowEmpty: false},
		freezeMoney: {type: 'bigdecimal', required: true, allowEmpty: false},
		openid: {type: 'string', required: true, allowEmpty: false},
		unionid: {type: 'string', required: true, allowEmpty: false},
		nickname: {type: 'string', required: true, allowEmpty: false},
	};

/**
 * 显示列表
 * @param ctx
 */
exports.list = function* (ctx) {
    let params = this.request.query;
    this.app.logger.info(params);
    let data = yield this.service.member.list(params);
    yield this.render("member/list.html", {data: data, params});
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
    let data = yield this.service.member.delete(params);

    this.body = data;
};

exports.edit = function* (ctx) {
    let params = this.request.query;
    let id = params.id;

    if (id == ''){
        return this.redirect('/error');
    }

    if (id){
        let data = yield this.service.member.get({id: id});
        yield this.render("member/edit.html", {data, params});
        return;
    }
    yield this.render("member/edit.html", {params});
    
};

/**
 * 编辑数据
 * @param ctx
 * @private
 */
exports.edit_ = function* (ctx) {
    this.validate(rule);
    let params = this.request.body;
    let data = yield this.service.member.edit(params);
    yield this.body = data;
};

