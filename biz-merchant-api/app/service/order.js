'use strict';

module.exports = app => {
    class OrderService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 获取数据
         * @param params
         */
        async get(params) {
            const result = await this.ctx.curl(this.app.urls('order') + "/get", {
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

        async info(params) {
            const result = await this.ctx.curl(this.app.urls('order') + "/info", {
                method: 'get',
                dataType: 'json',
                data: params
            });
            let data = result.data;

            return data;
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
            const result = await this.ctx.curl(this.app.urls('order'), {
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
            /**
             * 请求后台接口
             */
            const result = await this.ctx.curl(this.app.urls('order') + "/list", {
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
         * 添加修改 如果id为空是添加id不为空是编辑
         * @param params
         * @returns {{}}
         */
        async create(params) {
            this.app.logger.info(params);
            const result = await this.ctx.curl(`${this.app.urls('order')}/create`, {
                method: 'post',
                dataType: 'json',
                timeout: 30000,
                dataAsQueryString: true,
                data: params
            });

            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data;
        }

        /**
         * 删除
         * @param params
         */
        async delete(params) {
            const result = await this.ctx.curl(this.app.urls('order.id', params), {
                method: 'delete',
                dataType: 'json'
            });
            return result.data;
        }

        async calculatePrice(params){
            const result = await this.ctx.curl(this.app.urls('calculatePrice'), {
                method: 'post',
                dataType: 'json',
                data: params
            });

            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data;

        }

        /**
         * 取消
         * @param params
         */
        async cancel(params) {
            const result = await this.ctx.curl(this.app.urls('order') + "/cancel", {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        async del(params) {
            const result = await this.ctx.curl(this.app.urls('order') + "/delete", {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        /**
         * 收货
         * @param params
         */
        async receive(params) {
            const result = await this.ctx.curl(this.app.urls('order') + "/receive", {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        /**
         * 提醒
         * @param params
         */
        async reminder(params) {
            const result = await this.ctx.curl(this.app.urls('order') + "/reminder", {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        /**
         * 退款
         * @param params
         */
        async refund(params) {
            const result = await this.ctx.curl(this.app.urls('order') + "/refund", {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        async pay(params) {
            const result = await this.ctx.curl(this.app.urls('order') + "/pay", {
                method: 'post',
                dataType: 'json',
                data: params
            });

            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data;
        }

        async result(params) {
            const result = await this.ctx.curl(this.app.urls('order') + "/pay/result", {
                method: 'post',
                dataType: 'json',
                data: params
            });

            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                throw new Error(data.message ? data.message : 'error');
            }

            return data;
        }

        /**
         * 喜欢 点赞 评论
         * @param params
         */
        async comment(params) {
            const result = await this.ctx.curl(this.app.urls('order') + "/comment", {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        async commentStatus(params) {
            const result = await this.ctx.curl(this.app.urls('order') + "/comment/status", {
                method: 'post',
                dataType: 'json',
                data: params
            });
            return result.data;
        }

        /**
         * 喜欢 点赞 评论
         * @param params
         */
        async commentList(params) {
            const result = await this.ctx.curl(this.app.urls('order') + "/comment/list", {
                method: 'get',
                dataType: 'json',
                data: params
            });
            this.app.logger.info(result.data);
            let data = result.data;

            if (data.code != 200){
                //throw new Error(data.message ? data.message : 'error');
            }

            return data.data;
        }

        /**
         * 获取订单的统计数据
         * 没有改java端
         * 发送四次请求去统计
         * @param params
         */
        async count(memberId) {
            const payment = await this.ctx.curl(this.app.urls('order') + "/count", {
                method: 'get',
                dataType: 'json',
                data: {
                    memberId: memberId,
                    status: 1
                }
            });

            const delivery = await this.ctx.curl(this.app.urls('order') + "/count", {
                method: 'get',
                dataType: 'json',
                data: {
                    memberId: memberId,
                    status: 2
                }
            });

            const confirmation = await this.ctx.curl(this.app.urls('order') + "/count", {
                method: 'get',
                dataType: 'json',
                data: {
                    memberId: memberId,
                    status: 3
                }
            });

            const feedback = await this.ctx.curl(this.app.urls('order') + "/count", {
                method: 'get',
                dataType: 'json',
                data: {
                    memberId: memberId,
                    status: 4
                }
            });

            this.logger.info(feedback);

            let data = {
                payment: payment.data.data,
                delivery: delivery.data.data,
                confirmation: confirmation.data.data,
                feedback: feedback.data.data
            }

            return data;
        }


    }

    return OrderService;
};
