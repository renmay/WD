'use strict';

module.exports = app => {
    class productTypeService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取数据
         * @param params
         */
        * get(params) {
            const result = yield this.ctx.curl(this.app.urls('productType.id', params), {
                method: 'get',
                dataType: 'json'
            });
			this.app.logger.info(result.data);
            if (result.data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return result.data.data;
        }


        /**
         * 获取列表
         * @param params
         * @returns {{}}
         */
        * list(params) {
            /**
             * 请求后台接口
             */
            const result = yield this.ctx.curl(this.app.urls('productType'), {
                dataType: 'json',
                data: params
            });

            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }

        /**
         * 添加修改 如果id为空是添加id不为空是编辑
         * @param params
         * @returns {{}}
         */
        * edit(params) {
            let method = 'post';
            if (params.id && params.id != ''){
                method = 'put';
            }
            const result = yield this.ctx.curl(this.app.urls('productType'), {
                method: method,
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        /**
         * 删除
         * @param params
         */
        * delete(params) {
            const result = yield this.ctx.curl(this.app.urls('productType.id', params), {
                method: 'delete',
                dataType: 'json'
            });
            return result.data;
        }

        * listSelectJsonString(params) {
            /**
             * 请求后台接口
             */
            const result = yield this.ctx.curl(this.app.urls('productType') + "/all", {
                dataType: 'json',
                data: params
            });

            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            let productType = [];

            for (let i = 0; i < data.data.length; i++){
                let item = {};
                item.text = data.data[i].name;
                item.value = data.data[i].id;
                productType.push(item);
            }
            return productType;
        }

    }

    return productTypeService;
};
