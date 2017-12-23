'use strict';

module.exports = app => {
    class AuthController extends app.Controller {
        /**
         * 获取授权凭证
         * @returns {Promise.<void>}
         */
        async authorization() {
            //在获取jwt之前可以做一些必要验证

            const authorization = this.ctx.jwt;
            const update = false;
            const message = "1.1版本已经发布,请更新。";
            this.ctx.body = {
                code: 200,
                data: {
                    authorization,
                    update,
                    message
                }
            }
        }

    }
    return AuthController;
};
