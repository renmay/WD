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

    }
    app.Controller = BaseController;
}