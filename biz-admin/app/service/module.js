'use strict';

module.exports = app => {
  class ModuleService extends app.Service {

    /**
         * 获取数据
         * @param params
         */
    async get(params) {
      const result = await this.ctx.fetch(this.app.urls('module.id', params), {
        method: 'get',
        dataType: 'json',
      });
      this.app.logger.info(result.data);
      const data = result.data;

      if (data.code !== 200) {
        throw new Error(data.message ? data.message : 'error');
      }
      return data.data;
    }


    /**
       *
       * @param params
       * @returns {Promise<void>}
       */
    async list(params) {
      /**
             * 请求后台接口
             */
      const result = await this.ctx.fetch(this.app.urls('module'), {
        dataType: 'json',
        data: params,
      });

      this.app.logger.info(result.data);
      const data = result.data;

      if (result.data.code !== 200) {
        throw new Error(data.message ? data.message : 'error');
      }

      return result.data.data;
    }

    /**
         * 添加修改 如果id为空是添加id不为空是编辑
         * @param params
         * @returns {{}}
         */
    async edit_(params) {
      let mtd = 'post';
      if (params.id && params.id !== '') {
        mtd = 'put';
      }
      const result = await this.ctx.fetch(this.app.urls('module'), {
        dataType: 'json',
        data: params,
        method: mtd,
      });
      this.app.logger.info(result.data);
      const data = result.data;

      if (result.data.code !== 200) {
        throw new Error(data.message ? data.message : 'error');
      }

      return result.data;
    }

    /**
         * 删除
         * @param params
         */
    async delete(params) {
      const result = await this.ctx.fetch(this.app.urls('module.id', params), {
        method: 'delete',
        dataType: 'json',
      });
      return result.data;
    }

  }

  return ModuleService;
};
