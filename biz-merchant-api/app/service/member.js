'use strict';

module.exports = app => {
    class MemberService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取数据
         * @param params
         */
        async get(params) {
            const result = await this.ctx.curl(`${this.app.urls('member')}/get`, {
                method: 'get',
                dataType: 'json',
                data: params
            });
            this.app.logger.info(result.data);
            if (result.data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return result.data.data;
        }
        /**
         * 获取数据
         * @param params
         */
        async memberGet(params) {
            const result = await this.ctx.curl(this.app.urls('memberGet'), {
                method: 'get',
                dataType: 'json',
                data:params
            });
			this.app.logger.info(result.data);
            if (result.data.code != 200){
                throw new Error(result.data.message ? result.data.message : 'error');
            }

            return result.data.data;
        }

        async getMemberByOpenId(openId) {
            let params = {
                openId
            };
            const result = await this.ctx.curl(this.app.urls('memberGet'), {
                method: 'get',
                dataType: 'json',
                data:params
            });
            this.app.logger.info(result.data);
            if (result.data.code != 200){
                throw new Error(result.data.message ? result.data.message : 'error');
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
            const result = await this.ctx.curl(this.app.urls('member'), {
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
        async edit(params) {
            let method = 'post';
            if (params.id && params.id != ''){
                method = 'put';
            }
            const result = await this.ctx.curl(this.app.urls('member'), {
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
        async delete(params) {
            const result = await this.ctx.curl(this.app.urls('member.id', params), {
                method: 'delete',
                dataType: 'json'
            });
            return result.data;
        }

        /**
         * 添加用户信息
         * @param params
         */
        async addInfo(params) {
            let method = 'put';
            const result = await this.ctx.curl(this.app.urls('member'), {
                method: method,
                dataType: 'json',
                data: params
            });

            if (result.data.code != 200){
                throw new Error(result.data.message ? result.data.message : 'error');
            }
            return result.data.data;
        }
        /**
         * 修改密码
         * @param params
         */
        async changePassword(params) {
            const result = await this.ctx.curl(this.app.urls('changePassword'), {
                method: 'put',
                dataType: 'json',
                data:params
            });
            if (result.data.code != 200){
                throw new Error(result.data.message ? result.data.message : 'error');
            }

            return result.data;
        }

        /**
         * 重置密码
         * @param params
         */
        async resetPassword(params) {
            const result = await this.ctx.curl(this.app.urls('resetPassword'), {
                method: 'put',
                dataType: 'json',
                data:params
            });
            if (result.data.code != 200){
                throw new Error(result.data.message ? result.data.message : 'error');
            }

            return result.data;
        }

        /**
         * 留言板(私人定制以及遇到的问题)
         * @param params
         */
        async addGuestbook(params) {
            const result = await this.ctx.curl(this.app.urls('addGuestbook'), {
                method: 'post',
                dataType: 'json',
                data:params
            });
            if (result.data.code != 200){
                throw new Error(result.data.message ? result.data.message : 'error');
            }
            return result.data.data;
        }

        /**
         * 加入我们
         * @param params
         */
        async join(params) {
            const result = await this.ctx.curl(this.app.urls('join'), {
                method: 'post',
                dataType: 'json',
                data:params
            });
            if (result.data.code != 200){
                throw new Error(result.data.message ? result.data.message : 'error');
            }
            return result.data.data;
        }

        /**
         * 手机号是否存在
         * @param params
         */
        async mobileExists(params) {
            const result = await this.ctx.curl(this.app.urls('mobileExists'), {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }


        /**
         * 获取用户卷列表
         * @param params
         * @returns {{}}
         */
        async privilege(params) {
            /**
             * 请求后台接口
             */
            const result = await this.ctx.curl(this.app.urls('memberPrivilege'), {
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
         * 绑定用户微信
         * @param params
         * id: 用户id
         * openId: 必传
         *
         */
        async bindWeixin(params) {
            /**
             * 请求后台接口
             */
            const result = await this.ctx.curl(this.app.urls('bindWeixin'), {
                method: 'put',
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


    }

    return MemberService;
};
