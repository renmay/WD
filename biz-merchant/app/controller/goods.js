'use strict';
const rule = {
		goodsId: {type: 'string', required: true, allowEmpty: false},
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
	};

/**
 * 显示列表
 * @param ctx
 */
exports.list = function* (ctx) {
    let params = this.request.query;
    params.createTime = -1;
    this.app.logger.info(params);
    let data = yield this.service.goods.list(params);
    let goodsType = yield this.service.goodsType.listSelectJsonString();
    yield this.render("goods/list.html", {data: data, params, goodsType});
};

/**
 * 显示列表
 * @param ctx
 */
exports.data = function* (ctx) {
    let params = this.request.body;
    this.app.logger.info(params);
    let data = yield this.service.goods.list(params);
    this.app.logger.info(data);
    let list = data.list;
    let items = [];

    for (var i = 0; i < list.length; i++){
        let item = {
            id: list[i].id,
            type: list[i].goodsType.name,
            name: list[i].name
        }
        items.push(item);
    }

    data.list = items;

    this.body = ctx.helper.res('', 200, {"lastPage": data.lastPage, "list": items});
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
    let data = yield this.service.goods.delete(params);

    this.body = data;
};

exports.edit = function* (ctx) {
    let params = this.request.query;
    let id = params.id;
    console.log(this.request.ip);
    if (id == ''){
        return this.redirect('/error');
    }

    let goodsType = yield this.service.goodsType.listSelectJsonString();

    if (id){
        let data = yield this.service.goods.get({id: id});

        let images = data.images;

        for (var i = 0; i < 4 - images.length; i++){//将数组长度补足为4
            images.push('');
        }

        yield this.render("goods/edit.html", {data, params, "goodsType": goodsType});
        return;
    }

    let data = {
        taste: []
    };

    yield this.render("goods/edit.html", {data, params, "goodsType": goodsType});
    
};

/**
 * 编辑数据
 * @param ctx
 * @private
 */
exports.edit_ = function* (ctx) {
    //this.validate(rule);
    let params = this.request.body;

    let images = params.images;
    let imgs = new Array();
    //去掉空图片
    for (let i = 0; i < images.length; i++){
        if ('' != images[i]){
            imgs.push(images[i]);
        }
    }

    this.logger.info(imgs);
    params.images = imgs;

    let data = yield this.service.goods.edit(params);
    yield this.body = data;
};

exports.editEn = function* (ctx) {
    let params = this.request.query;
    let id = params.id;
    console.log(this.request.ip);
    if (!id || id == ''){
        return this.redirect("/error", {message: "请先添加商品"});
    }

    let data = yield this.service.goods.get({id: id, language: "en"});

    yield this.render("goods/edit_en.html", {data, params});

};

/**
 * 编辑数据
 * @param ctx
 * @private
 */
exports.editEn_ = function* (ctx) {
    //this.validate(rule);
    let params = this.request.body;
    params.language = "en";


    this.logger.info(params);
    let data = yield this.service.goods.editLanguage(params);
    yield this.body = data;
};

exports.recommend = function* (ctx) {
    if ('GET' == this.request.method){//get请求
        let params = this.request.query;
        let id = params.id;
        console.log(this.request.ip);
        if (id == ''){
            return this.redirect('/error');
        }

        let data = yield this.service.goods.get({id: id});

        yield this.render("goods/recommend.html", {data, params});
    }else{//post
        const params = this.request.body;
        params.isRecommend = true;
        this.logger.info(params);
        //调用service中的login接口登录
        yield this.service.goods.recommend(params);

        //放回json数据
        this.body = {
            code: 200,
            message: 'success'
        }
    }


};


exports.pre = function* (ctx) {
    if ('GET' == this.request.method){//get请求
        let params = this.request.query;
        let id = params.id;
        console.log(this.request.ip);
        if (id == ''){
            return this.redirect('/error');
        }

        let data = yield this.service.goods.get({id: id});

        yield this.render("goods/pre.html", {data, params});
    }else{//post
        const params = this.request.body;
        params.isPreShow = true;
        this.logger.info(params);
        //调用service中的login接口登录
        yield this.service.goods.pre(params);

        //放回json数据
        this.body = {
            code: 200,
            message: 'success'
        }
    }

};

exports.recommendCancel = function* (ctx) {
    const params = this.request.query;
    this.logger.info(params);
    params.isRecommend = false;
    //调用service中的login接口登录
    yield this.service.goods.recommend(params);

    //放回json数据
    this.body = {
        code: 200,
        message: 'success'
    }

};


exports.preCancel = function* (ctx) {
    const params = this.request.query
    this.logger.info(params);
    //调用service中的login接口登录
    params.isPreShow = false;
    yield this.service.goods.pre(params);

    //放回json数据
    this.body = {
        code: 200,
        message: 'success'
    }

};

exports.group = function* (ctx) {
    if ('GET' == this.request.method){//get请求
        let params = this.request.query;
        let id = params.id;
        console.log(this.request.ip);
        if (id == ''){
            return this.redirect('/error');
        }



        let data = yield this.service.goods.get({id: id});

        //商品
        let goods = [];
        let list = yield this.service.goodsGroup.list({
            goodsGroupId: id
        });

        for (var i = 0; i < list.length; i++){
            var item = {
                id: list[i].goodsId,
                name: list[i].name,
                type: list[i].typeName
            };
            goods.push(item);
        }


        let goodsType = yield this.service.goodsType.listSelectJsonString();

        yield this.render("goods/group.html", {data,goodsType, goods, params});
    }else{//post
        const params = this.request.body;
        this.logger.info(params);
        //调用service中的login接口登录
        let data = yield this.service.goodsGroup.edit(params);

        //放回json数据
        this.body = data;
    }

};