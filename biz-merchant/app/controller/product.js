'use strict';
const rule = {
    productId: {type: 'string', required: true, allowEmpty: false},
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
    class ProductController extends app.Controller {

        /**
         * 显示列表
         * @param ctx
         */
        async list(ctx) {
            let params = this.ctx.request.query;
            params.productType = this.ctx.session.member.type;
            params.storeId = this.ctx.session.member.storeId;
            this.app.logger.info(params);
            let data = await this.service.product.list(params);
            let productCategory = await this.service.productCategory.listSelectJsonString(params);

            this.app.logger.info(data);
            await this.ctx.render("product/list.html", {data: data,"productCategory":productCategory});
        };

        /**
         * 显示列表
         * @param ctx
         */
        async data(ctx) {
            let params = this.ctx.request.body;
            this.app.logger.info(params);
            params.productType = this.ctx.session.member.type;

            let data = await this.service.product.list(params);
            this.app.logger.info(data);
            let list = data.list;
            let items = [];

            for (var i = 0; i < list.length; i++) {
                let item = {
                    id: list[i].id,
                    type: list[i].productType.name,
                    name: list[i].name
                }
                items.push(item);
            }

            data.list = items;
            this.ctx.body = this.ctx.helper.res('', 200, {"lastPage": data.lastPage, "list": items});
        };


        /**
         * 删除
         * 批量删除时使用','将id分隔开，却最好id的数量不要超过10条
         * @param ctx
         */
        async delete(ctx) {
            let params = this.ctx.request.body;

            let id = params.id;
            params.productType = this.ctx.session.member.type;

            if (!id) {
                this.ctx.body = this.ctx.helper.res('请选择要删除的记录', 500);
                return;
            }

            //判断是批量删除还是单个删除
            if (id instanceof Array) {
                if (id.length > 10) {
                    this.ctx.body = this.ctx.helper.res('删除的条数不能为0且同时不能多于10条', 500);
                    return;
                }
                params.id = id.join(',');
            }

            this.app.logger.info(params);
            let data = await this.service.product.delete(params);

            this.ctx.body = data;
        };

        /**
         * 编辑数据
         * @param ctx
         * @returns {Promise.<*>}
         */
        async edit(ctx) {
            let params = this.ctx.request.query;
            let id = params.id;
            if (id == '') {
                return this.redirect('/error');
            }
            params.storeId = this.ctx.session.member.storeId;
            params.id = null;
            let productCategory = await this.service.productCategory.listSelectJsonString(params);
            if (id) {
                let data = await this.service.product.get({id: id});

                let images = data.images.split(",");
                this.app.logger.info(images);
                data.images = images;
                for (var i = 0; i < 4 - images.length; i++) {//将数组长度补足为4
                    images.push('');
                }

                await this.ctx.render("product/edit.html", {data, params,"productCategory":productCategory});
                return;
            }

            let data = {
                taste: []
            };

            await this.ctx.render("product/edit.html", {data, params,"productCategory":productCategory});

        };

        /**
         * 编辑数据
         * @param ctx
         * @private
         */

        async edit_(ctx) {
            //this.validate(rule);
            let params = this.ctx.request.body;
            params.productType = this.ctx.session.member.type;
            params.storeId = this.ctx.session.member.storeId;

            let images = params.images;
            let imgs = new Array();
            //去掉空图片
            for (let i = 0; i < images.length; i++) {
                if ('' != images[i]) {
                    imgs.push(images[i]);
                }
            }

            this.app.logger.info(imgs);
            params.images = imgs;
            this.app.logger.info(params);
            let data = await this.service.product.edit(params);
            this.ctx.body = data;
        };

        async recommend(ctx) {

            if ('GET' == this.ctx.request.method) {//get请求
                let params = this.ctx.request.query;
                let id = params.id;
                console.log(this.ctx.request.ip);
                if (id == '') {
                    return this.ctx.redirect('/error');
                }

                let data = await this.service.product.get({id: id});

                await this.render("product/recommend.html", {data, params});
            } else {//post
                const params = this.ctx.request.body;
                params.isRecommend = true;
                this.logger.info(params);
                //调用service中的login接口登录
                await this.service.product.recommend(params);

                //放回json数据
                this.ctx.body = {
                    code: 200,
                    message: 'success'
                }
            }


        };

        async pre(ctx) {

            if ('GET' == this.ctx.request.method) {//get请求
                let params = this.ctx.request.query;
                let id = params.id;
                console.log(this.ctx.request.ip);
                if (id == '') {
                    return this.ctx.redirect('/error');
                }

                let data = await this.service.product.get({id: id});

                await this.ctx.render("product/pre.html", {data, params});
            } else {//post
                const params = this.ctx.request.body;
                params.isPreShow = true;
                this.app.logger.info(params);
                //调用service中的login接口登录
                await this.service.product.pre(params);

                //放回json数据
                this.ctx.body = {
                    code: 200,
                    message: 'success'
                }
            }

        };

        async recommendCancel(ctx) {
            const params = this.ctx.request.query;
            this.logger.info(params);
            params.isRecommend = false;
            //调用service中的login接口登录
            await this.service.product.recommend(params);

            //放回json数据
            this.ctx.body = {
                code: 200,
                message: 'success'
            }

        };


        async preCancel(ctx) {
            const params = this.ctx.request.query
            this.logger.info(params);
            //调用service中的login接口登录
            params.isPreShow = false;
            await this.service.product.pre(params);

            //放回json数据
            this.ctx.body = {
                code: 200,
                message: 'success'
            }

        };

        async group(ctx) {
            if ('GET' == this.ctx.request.method) {//get请求
                let params = this.ctx.request.query;
                let id = params.id;
                console.log(this.ctx.request.ip);
                if (id == '') {
                    return this.ctx.redirect('/error');
                }


                let data = await this.service.product.get({id: id});

                //商品
                let product = [];
                let list = await this.service.productGroup.list({
                    productGroupId: id
                });

                for (var i = 0; i < list.length; i++) {
                    var item = {
                        id: list[i].productId,
                        name: list[i].name,
                        type: list[i].typeName
                    };
                    product.push(item);
                }


                let productCategory = await this.service.productCategory.listSelectJsonString();

                await this.render("product/group.html", {data, productCategory, product, params});
            } else {//post
                const params = this.ctx.request.body;
                this.logger.info(params);
                //调用service中的login接口登录
                let data = await this.service.productGroup.edit(params);

                //放回json数据
                this.ctx.body = data;
            }

        };
    }

    return ProductController;
}