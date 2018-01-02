'use strict';

module.exports = app => {
  class ProductCategoryService extends app.Service {
    constructor(ctx) {
      super(ctx);
    }

    /**
         * 获取数据
         * @param params
         */
    async get(params) {
      const result = await this.ctx.fetch(this.app.urls('productCategory.id', params), {
        method: 'get',
        dataType: 'json',
      });
      this.app.logger.info(result.data);
      if (result.data.code != 200) {
        throw new Error(data.message ? data.message : 'error');
      }

      return result.data.data;
    }


    /**
         * 获取列表
         * @param params
         * @returns {{}}
         */
    async list(params) {
      /**
             * 请求后台接口
             */
      const result = await this.ctx.fetch(this.app.urls('productCategory'), {
        dataType: 'json',
        data: params,
      });

      const data = result.data;

      if (data.code != 200) {
        throw new Error(data.message ? data.message : 'error');
      }

      return data.data;
    }

    /**
         * 添加修改 如果id为空是添加id不为空是编辑
         * @param params
         * @returns {{}}
         */
    async edit(params) {
      let method = 'post';
      if (params.id && params.id != '') {
        method = 'put';
      }
      const result = await this.ctx.fetch(this.app.urls('productCategory'), {
        method,
        dataType: 'json',
        data: params,
      });
      return result.data;
    }

    /**
         * 删除
         * @param params
         */
    async delete(params) {
      const result = await this.ctx.fetch(this.app.urls('productCategory.id', params), {
        method: 'delete',
        dataType: 'json',
      });
      return result.data;
    }

    /**
         * 获取产品目录
         * @param params
         * @returns {Promise.<Array>}
         */
    async listSelectJsonString(params) {
      /**
             * 请求后台接口
             */
      const result = await this.ctx.fetch(this.app.urls('productCategory'), {
        dataType: 'json',
        data: params,
      });

      const data = result.data;

      if (data.code != 200) {
        throw new Error(data.message ? data.message : 'error');
      }
      const productCategory = [];

      this.app.logger.info(data.data.list);
      for (let i = 0; i < data.data.list.length; i++) {
        const item = {};
        item.text = data.data.list[i].name;
        item.value = data.data.list[i].id;
        productCategory.push(item);
      }
      return productCategory;
    }

  }

  return ProductCategoryService;
};
