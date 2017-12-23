'use strict';

// 新品预告
exports.newProduct = function* (ctx) {
	ctx.req.title = '新品预告-食艺道';

    let New = yield this.service.goodsCombo.goodsComboNew('');
    console.log(New);


    yield this.render("tab/newProduct.html");
};

// 会员中心
exports.members = function* (ctx) {
	ctx.req.title = '会员中心-食艺道';
    yield this.render("tab/members.html");
};

// 私人定制
exports.customize = function* (ctx) {
    ctx.req.title = '私人定制-食艺道';
    yield this.render("tab/customize.html");
};

// 企业定制
exports.enterpriseCustom = function* (ctx) {
    ctx.req.title = '企业定制-食艺道';
    yield this.render("tab/enterpriseCustom.html");
};

// 关于我们
exports.about = function* (ctx) {
	ctx.req.title = '关于我们-食艺道';
    yield this.render("tab/about.html");
};

// 常见问题
exports.faq = function* (ctx) {
	ctx.req.title = '常见问题-食艺道';
    yield this.render("tab/faq.html");
};

// 联系我们
exports.contact = function* (ctx) {
	if ('GET' == this.request.method){//get请求
        ctx.req.title = '联系我们-食艺道';
    	yield this.render("tab/contact.html");
    }else{//post
        let params = this.request.body;
        params.type = 1;
        params.memberId = ctx.session.member.id;

        const guestbook = yield this.service.guestbook.edit(params);
        console.log(guestbook);
        //放回json数据
        this.body = this.helper.res();
    }
};

// 加入我们
exports.join = function* (ctx) {
    if ('GET' == this.request.method){//get请求
        ctx.req.title = '加入我们-食艺道';
        yield this.render("join.html");
    }else{//post
        let params = this.request.body;
    
        const join = yield this.service.member.join(params);
        console.log(join);
        //放回json数据
        this.body = this.helper.res();
    }
};

exports.addGuestbook = function* (ctx) {
    let params = this.request.body;
    
    const guestbook = yield this.service.member.addGuestbook(params);
    console.log(guestbook);
    //放回json数据
    this.body = this.helper.res();
};

