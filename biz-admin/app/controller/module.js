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
      this.app.logger.info(data);
      await this.ctx.render('module/list.html', { data });
    }

    /**
         * 显示列表
         * @param ctx
         */
    async data() {
      const params = this.ctx.request.body;
      this.app.logger.info(params);
      params.moduleType = this.ctx.session.member.type;

      const data = await this.service.module.list(params);
      this.app.logger.info(data);
      const list = data.list;
      const items = [];

      for (let i = 0; i < list.length; i++) {
        const item = {
          id: list[i].id,
          type: list[i].moduleType.name,
          name: list[i].name,
        };
        items.push(item);
      }

      data.list = items;
      this.ctx.body = this.ctx.helper.res('', 200, { lastPage: data.lastPage, list: items });
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
      if (id == '') {
        return this.redirect('/error');
      }
      params.storeId = this.ctx.session.member.storeId;
      params.id = null;
      if (id) {
        const data = await this.service.module.get({ id });
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

    async recommend() {

      if (this.ctx.request.method ==='GET') { // get请求
        const params = this.ctx.request.query;
        const id = params.id;
        console.log(this.ctx.request.ip);
        if (id === '') {
          return this.ctx.redirect('/error');
        }

        const data = await this.service.module.get({ id });

        await this.render('module/recommend.html', { data, params });
      } else { // post
        const params = this.ctx.request.body;
        params.isRecommend = true;
        this.logger.info(params);
        // 调用service中的login接口登录
        await this.service.module.recommend(params);

        // 放回json数据
        this.ctx.body = {
          code: 200,
          message: 'success',
        };
      }

    }

    async pre() {

      if (this.ctx.request.method == 'GET') { // get请求
        const params = this.ctx.request.query;
        const id = params.id;
        console.log(this.ctx.request.ip);
        if (id == '') {
          return this.ctx.redirect('/error');
        }

        const data = await this.service.module.get({ id });

        await this.ctx.render('module/pre.html', { data, params });
      } else { // post
        const params = this.ctx.request.body;
        params.isPreShow = true;
        this.app.logger.info(params);
        // 调用service中的login接口登录
        await this.service.module.pre(params);

        // 放回json数据
        this.ctx.body = {
          code: 200,
          message: 'success',
        };
      }

    }

    async recommendCancel() {
      const params = this.ctx.request.query;
      this.logger.info(params);
      params.isRecommend = false;
      // 调用service中的login接口登录
      await this.service.module.recommend(params);

      // 放回json数据
      this.ctx.body = {
        code: 200,
        message: 'success',
      };

    }


    async preCancel() {
      const params = this.ctx.request.query;
      this.logger.info(params);
      // 调用service中的login接口登录
      params.isPreShow = false;
      await this.service.module.pre(params);

      // 放回json数据
      this.ctx.body = {
        code: 200,
        message: 'success',
      };

    }

    async group() {
      if (this.ctx.request.method == 'GET') { // get请求
        const params = this.ctx.request.query;
        const id = params.id;
        console.log(this.ctx.request.ip);
        if (id == '') {
          return this.ctx.redirect('/error');
        }


        const data = await this.service.module.get({ id });

        // 商品
        const module = [];
        const list = await this.service.moduleGroup.list({
          moduleGroupId: id,
        });

        for (let i = 0; i < list.length; i++) {
          const item = {
            id: list[i].moduleId,
            name: list[i].name,
            type: list[i].typeName,
          };
          module.push(item);
        }


        const moduleCategory = await this.service.moduleCategory.listSelectJsonString();

        await this.render('module/group.html', { data, moduleCategory, module, params });
      } else { // post
        const params = this.ctx.request.body;
        this.logger.info(params);
        // 调用service中的login接口登录
        const data = await this.service.moduleGroup.edit(params);

        // 放回json数据
        this.ctx.body = data;
      }

    }
  }

  return ModuleController;
};
