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
        success(data, message) {
            if (typeof data == 'string'){
                return this.ctx.body = {
                    code: 200,
                    message: data
                };
            }else{
                return this.ctx.body = {
                    code: 200,
                    data,
                    message
                };
            }
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


    app.beforeStart(function* () {
        // 应用会等待这个函数执行完成才启动
        // app.cities = yield app.curl('http://example.com/city.json', {
        //     method: 'GET',
        //     dataType: 'json',
        // });

        //console.log(app.config.keys);

    });

    /**
     * 判断是否是数字
     */
    app.validator.addRule('intString', (rule, value) => {
        if (!/^-?\d+$/.test(value)) {
            return `必须输入一个整数`;
        }

        if (rule.hasOwnProperty('max') && value > rule.max) {
            return `不能大于${rule.max}`;
        }

        if (rule.hasOwnProperty('min') && value < rule.min) {
            return `不能小于${rule.min}`;
        }
    });

    /**
     * 判断是否是手机号
     */
    app.validator.addRule('mobile', (rule, value) => {
        if (!/^1[3456789]\d{9}$/.test(value)) {
            return `输入正确手机号`;
        }

        if (rule.hasOwnProperty('max') && value > rule.max) {
            return `不能大于${rule.max}`;
        }

        if (rule.hasOwnProperty('min') && value < rule.min) {
            return `不能小于${rule.min}`;
        }
    });

};