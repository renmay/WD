'use strict';
const rule = {
  moduleId: { type: 'string', required: true, allowEmpty: false },
  name: { type: 'string', required: true, allowEmpty: false },
  jingle: { type: 'string', required: true, allowEmpty: false },
  price: { type: 'bigdecimal', required: true, allowEmpty: false },
  promotionPrice: { type: 'bigdecimal', required: true, allowEmpty: false },
  marketPrice: { type: 'bigdecimal', required: true, allowEmpty: false },
  serial: { type: 'string', required: true, allowEmpty: false },
  spec: { type: 'string', required: true, allowEmpty: false },
  storage: { type: 'integer', required: true, allowEmpty: false },
  createTime: { type: 'date', required: true, allowEmpty: false },
  specValue: { type: 'string', required: true, allowEmpty: false },
  alarm: { type: 'integer', required: true, allowEmpty: false },
  sku: { type: 'string', required: true, allowEmpty: false },
  url: { type: 'string', required: true, allowEmpty: false },
  images: { type: 'string', required: true, allowEmpty: false },
};

module.exports = app => {
  class ModuleController extends app.Controller {

    /**
         * 显示列表
         * @param ctx
         */
    async list() {
      const params = this.ctx.request.query;
      params.moduleType = this.ctx.session.member.type;
      params.storeId = this.ctx.session.member.storeId;
      this.app.logger.info(params);
      const data = await this.service.module.list(params);

      await this.ctx.render('module/list.html', { data });
    }

    /**
         * 删除
         * 批量删除时使用','将id分隔开，却最好id的数量不要超过10条
         * @param ctx
         */
    async delete() {
      const params = this.ctx.request.body;

      const id = params.id;
      params.moduleType = this.ctx.session.member.type;

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
      const data = await this.service.module.delete(params);

      this.ctx.body = data;
    }

    /**
         * 编辑数据
         * @param ctx
         * @returns {Promise.<*>}
         */
    async edit() {
      const params = this.ctx.request.query;
      const id = params.id;
      if (id === '') {
        return this.redirect('/error');
      }
      params.storeId = this.ctx.session.member.storeId;
      params.id = null;
      if (id) {
        const data = await this.service.module.get({ id });

        const images = data.images.split(',');
        data.images = images;
        for (let i = 0; i < 4 - images.length; i++) { // 将数组长度补足为4
          images.push('');
        }
        await this.ctx.render('module/edit.html', { data, params });
        return;
      }

      const data = {
        moduleType: this.ctx.session.member.type,
      };
      await this.ctx.render('module/edit.html', { data, params });

    }

    /**
         * 编辑数据
         * @param ctx
         * @private
         */

    async edit_() {
      // this.validate(rule);
      const params = this.ctx.request.body;
      params.moduleType = this.ctx.session.member.type;
      params.storeId = this.ctx.session.member.storeId;
      this.app.logger.info(params);
      this.app.logger.info(this.ctx.session.member);
      const data = await this.service.module.edit(params);
      this.ctx.body = data;
    }

  }
  return ModuleController;
};
