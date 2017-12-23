'use strict';

module.exports = app => {
    class GoodsComboService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取数据
         * @param params
         */
        async get(params) {
            let key = `goods:detail:${params.id}`;

            if (await this.app.redis.exists(key)){
                let data = await this.app.redis.get(key);
                if (data){
                    return JSON.parse(data);
                }
            }
            const result = await this.ctx.curl(`${this.app.urls('goods')}/get`, {
                method: 'get',
                dataType: 'json',
                data: params
            });
			this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            await this.app.redis.set(key, JSON.stringify(data.data))
            await this.app.redis.expire(key, 30);

            return data.data;
        }

        async group(params) {

            const result = await this.ctx.curl(`${this.app.urls('goods')}/group`, {
                method: 'get',
                dataType: 'json',
                data: params
            });
            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }

        /**
         * 获取列表
         * @param params
         * @returns {{}}
         */
        async list(params) {

            let key = "goods:list";

            if (await this.app.redis.exists(key)){
                let data = await this.app.redis.get(key);
                if (data){
                    return JSON.parse(data);
                }
            }

            /**
             * 请求后台接口
             */
            const result = await this.ctx.curl(`${this.app.urls('goods')}/list`, {
                timeout: 30000,
                dataType: 'json',
                data: params
            });

            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            await this.app.redis.set(key, JSON.stringify(data.data))
            await this.app.redis.expire(key, 60);

            return data.data;
        }

        /**
         * 预订
         * @param params
         * @returns {Promise.<void>}
         */
        async pre(params) {

            let key = `goods:pre`;

            if (await this.app.redis.exists(key)){
                let data = await this.app.redis.get(key);
                if (data){
                    return JSON.parse(data);
                }
            }

            /**
             * 请求后台接口
             */
            const result = await this.ctx.curl(`${this.app.urls('goods')}/pre`, {
                dataType: 'json',
                data: params
            });

            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            await this.app.redis.set(key, JSON.stringify(data.data))
            await this.app.redis.expire(key, 60);

            return data.data;
        }

        /**
         * 推荐
         * @param params
         * @returns {Promise.<void>}
         */
        async recommend(params) {

            let key = `goods:recommend`;

            if (await this.app.redis.exists(key)){
                let data = await this.app.redis.get(key);
                if (data){
                    return JSON.parse(data);
                }
            }

            /**
             * 请求后台接口
             */
            const result = await this.ctx.curl(`${this.app.urls('goods')}/recommend`, {
                dataType: 'json',
                data: params
            });

            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            await this.app.redis.set(key, JSON.stringify(data.data))
            await this.app.redis.expire(key, 60);

            return data.data;
        }

        /**
         * 喜欢 点赞 评论
         * @param params
         */
        async comment(params) {
            const result = await this.ctx.curl(this.app.urls('goods') + "/comment", {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        async commentStatus(params) {
            const result = await this.ctx.curl(this.app.urls('goods') + "/comment/status", {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        /**
         * 用户点赞
         * @param params
         * @returns {Promise.<void>}
         */
        async like(params) {
            const result = await this.ctx.curl(this.app.urls('goods') + "/like", {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

    }

    return GoodsComboService;
};
