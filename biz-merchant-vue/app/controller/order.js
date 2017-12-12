'use strict';

/**
 * 短信发送
 * @param app
 * @returns {SmsController}
 */
module.exports = app => {
    class SmsController extends app.Controller {
        async index() {
            // await this.ctx.render('order/order.js', {
            //     url: "/order",
            //     cookies: this.ctx.get('cookie')
            // });
            //如果界面需要服务器端渲染 使用this.ssr 不要使用this.ctx.render
            //使用this.ssr 不用手动传入 url 和 cookie
            await this.ssr('order/order.js');
        };

        async list() {
            let params = this.ctx.request.body;
            console.log(params);

            let result = await this.ctx.curl('http://api.517syd.com/v1/goods/pre',{
                method: 'get',
                data: {
                    pageSize: 2,
                    pageNo: params.pageNo
                },
                headers: {
                    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdG9rZW4iOiJqd3Q6dG9rZW46alRBalVLYWFEQkJLQzRpNkhRd05QWUhZNlVDZ28zcGciLCJpYXQiOjE1MDE0MTAzNjR9.fDA7XNnY0yxHOHW94kyLm4qWesm8HuqVwfzW82zyfps',
                },
                dataType: 'json',
                contentType: 'json',
            });

            let data = result.data;
            console.log(data);

            this.ctx.body = data;
        };

        async delete() {
            this.ctx.body = {
                code: 200,
                message: 'edit success'
            }
        };

        async edit() {
            this.ctx.body = {
                code: 200,
                message: 'edit success'
            }
        };

    }
    return SmsController;
};



