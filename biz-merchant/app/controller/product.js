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
            const params = this.ctx.request.query;
            params.productType = this.ctx.session.member.type;
            params.storeId = this.ctx.session.member.storeId;
            this.app.logger.info(params);
            const data = await this.service.product.list(params);
            const productCategory = await this.service.productCategory.listSelectJsonString(params);
            this.app.logger.info(data);
            this.app.logger.info(productCategory);


            //renmay
            for (let i = 0; i < data.list.length; i++) {
                for (let j = 0; j < productCategory.length; j++) {
                    // this.app.logger.info(productCategory[j]);
                    if (data.list[i].productCategoryId == productCategory[j].value) ;
                    data.list[i].productCategoryName = productCategory[j].text;
                }
            }


            for (let i = 0; i < data.list[i].length; i++) {
                const images = data.list[i].images.split(',');
                data.list[i].images=images;
                }


            await this.ctx.render('product/list.html', {data, productCategory});
        }

        /**
         * 显示列表
         * @param ctx
         */
        async data(ctx) {
            const params = this.ctx.request.body;
            this.app.logger.info(params);
            params.productType = this.ctx.session.member.type;

            const data = await this.service.product.list(params);
            this.app.logger.info(data);
            const list = data.list;
            const items = [];

            for (let i = 0; i < list.length; i++) {
                const item = {
                    id: list[i].id,
                    type: list[i].productType.name,
                    name: list[i].name,
                };
                items.push(item);
            }

            data.list = items;
            this.ctx.body = this.ctx.helper.res('', 200, {lastPage: data.lastPage, list: items});
        }


        /**
         * 删除
         * 批量删除时使用','将id分隔开，却最好id的数量不要超过10条
         * @param ctx
         */
        async delete(ctx) {
            const params = this.ctx.request.body;

            const id = params.id;
            params.productType = this.ctx.session.member.type;

            if (!id) {
                this.ctx.body = this.ctx.helper.res('请选择要删除的记录', 500);
                return;
            }

            // 判断是批量删除还是单个删除
            if (id instanceof Array) {
                if (id.length > 10) {
                    this.ctx.body = this.ctx.helper.res('删除的条数不能为0且同时不能多于10条', 500);
                    return;
                }
                params.id = id.join(',');
            }

            this.app.logger.info(params);
            this.app.logger.info('==============');

            const data = await this.service.product.delete(params);



            this.ctx.body = data;
        }

        /**
         * 编辑数据
         * @param ctx
         * @returns {Promise.<*>}
         */
        async edit(ctx) {
            const params = this.ctx.request.query;
            const id = params.id;
            if (id == '') {
                return this.redirect('/error');
            }
            params.storeId = this.ctx.session.member.storeId;
            params.id = null;
            const productCategory = await this.service.productCategory.listSelectJsonString(params);
            if (id) {
                const data = await this.service.product.get({id});

                const images = data.images.split(',');
                data.images = images;
                for (let i = 0; i < 4 - images.length; i++) { // 将数组长度补足为4
                    images.push('');
                }
                await this.ctx.render('product/edit.html', {data, params, productCategory});
                return;
            }

            const data = {
                productType: this.ctx.session.member.type,
            };

            await this.ctx.render('product/edit.html', {data, params, productCategory});
            this.app.logger.info(data);
        }

        /**
         * 编辑数据
         * @param ctx
         * @private
         */

        async edit_(ctx) {
            // this.validate(rule);
            const params = this.ctx.request.body;
            params.productType = this.ctx.session.member.type;
            params.storeId = this.ctx.session.member.storeId;

            const images = params.images;
            const imgs = new Array();
            // 去掉空图片
            for (let i = 0; i < images.length; i++) {
                if (images[i] != '') {
                    imgs.push(images[i]);
                }
            }
            params.images = imgs;
            this.app.logger.info(imgs);
            this.app.logger.info(params);
            this.app.logger.info(this.ctx.session.member);
            const data = await this.service.product.edit(params);
            this.ctx.body = data;
        }

        //是否推荐
        async recommend(ctx) {

            if (this.ctx.request.method == 'GET') { // get请求
                const params = this.ctx.request.query;
                const id = params.id;
                console.log(this.ctx.request.ip);
                if (id == '') {
                    return this.ctx.redirect('/error');
                }

                const data = await this.service.product.get({id});

                await this.render('product/recommend.html', {data, params});
            } else { // post
                const params = this.ctx.request.body;
                params.isRecommend = true;
                this.logger.info(params);
                // 调用service中的login接口登录
                await this.service.product.recommend(params);

                // 放回json数据
                this.ctx.body = {
                    code: 200,
                    message: 'success',
                };
            }

        }

        async pre(ctx) {

            if (this.ctx.request.method == 'GET') { // get请求
                const params = this.ctx.request.query;
                const id = params.id;
                console.log(this.ctx.request.ip);
                if (id == '') {
                    return this.ctx.redirect('/error');
                }

                const data = await this.service.product.get({id});

                await this.ctx.render('product/pre.html', {data, params});
            } else { // post
                const params = this.ctx.request.body;
                params.isPreShow = true;
                this.app.logger.info(params);
                // 调用service中的login接口登录
                await this.service.product.pre(params);

                // 放回json数据
                this.ctx.body = {
                    code: 200,
                    message: 'success',
                };
            }

        }

        async recommendCancel(ctx) {
            const params = this.ctx.request.query;
            this.logger.info(params);
            params.isRecommend = false;
            // 调用service中的login接口登录
            await this.service.product.recommend(params);

            // 放回json数据
            this.ctx.body = {
                code: 200,
                message: 'success',
            };

        }


        async preCancel(ctx) {
            const params = this.ctx.request.query;
            this.logger.info(params);
            // 调用service中的login接口登录
            params.isPreShow = false;
            await this.service.product.pre(params);

            // 放回json数据
            this.ctx.body = {
                code: 200,
                message: 'success',
            };

        }

        async group(ctx) {
            if (this.ctx.request.method == 'GET') { // get请求
                const params = this.ctx.request.query;
                const id = params.id;
                console.log(this.ctx.request.ip);
                if (id == '') {
                    return this.ctx.redirect('/error');
                }


                const data = await this.service.product.get({id});

                // 商品
                const product = [];
                const list = await this.service.productGroup.list({
                    productGroupId: id,
                });

                for (let i = 0; i < list.length; i++) {
                    const item = {
                        id: list[i].productId,
                        name: list[i].name,
                        type: list[i].typeName,
                    };
                    product.push(item);
                }


                const productCategory = await this.service.productCategory.listSelectJsonString();

                await this.render('product/group.html', {data, productCategory, product, params});
            } else { // post
                const params = this.ctx.request.body;
                this.logger.info(params);
                // 调用service中的login接口登录
                const data = await this.service.productGroup.edit(params);

                // 放回json数据
                this.ctx.body = data;
            }

        }
    }

    return ProductController;
};
