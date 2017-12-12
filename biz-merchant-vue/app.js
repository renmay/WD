// app.js
module.exports = app => {
    /**
     * 定义base controller
     */
    class BaseController extends app.Controller {
        /**
         * 获取用户信息
         * @returns {*}
         */
        get member() {
            return this.ctx.session.member;
        }

        /**
         * 成功
         * @param data
         */
        success(data) {
            this.ctx.body = {
                code: 200,
                data,
            };
        }

        /**
         * 失败
         * @param code
         * @param message
         */
        fail(code = 500, message = 'fail'){
            this.ctx.body = {
                code,
                message
            }
        }

        /**
         * 服务器端渲染时 需要传入url和 cookie 所有封装此方法用于服务器端渲染
         * @param path
         * @param context
         * @returns {Promise.<void>}
         */
        async ssr(path, context){
            let obj = {
                url: this.ctx.url,
                cookies: this.ctx.get('cookie')
            }
            Object.assign(obj, context);
            await this.ctx.render(path, obj);
        }
    }
    app.Controller = BaseController;
}