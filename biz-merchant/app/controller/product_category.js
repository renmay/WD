'use strict';
const rule = {
    name: {type: 'string', required: true, allowEmpty: false},
};

module.exports = app => {
    class ProductCategoryController extends app.Controller {

        /**
         * 显示列表
         * @param ctx
         */
        async list(ctx) {
            const params = this.ctx.request.query;
            params.storeId = this.ctx.session.member.storeId;
            this.app.logger.info(params);
            const data = await this.service.productCategory.list(params);


            this.logger.info(data);
            await this.ctx.render('productCategory/list.html', {data, params});
        }

        /**
         * 删除
         * 批量删除时使用','将id分隔开，却最好id的数量不要超过10条
         * @param ctx
         */
        async delete(ctx) {
            const params = this.ctx.request.body;
            const id = params.id;
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
            const data = await this.service.productCategory.delete(params);
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
                return this.ctx.redirect('/error');
            }

            if (id) {
                const data = await this.service.productCategory.get({id});
                await this.ctx.render('productCategory/edit.html', {data, params});
                return;
            }
            await this.ctx.render('productCategory/edit.html', {params});

        }

        /**
         * 编辑数据
         * @param ctx
         * @private
         */
        async edit_(ctx) {
            // this.ctx.validate(rule);
            const params = this.ctx.request.body;
            params.storeId = this.ctx.session.member.storeId;

            const data = await this.service.productCategory.edit(params);
            this.ctx.body = data;
        }
    }

    return ProductCategoryController;
};
