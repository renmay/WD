'use strict';

module.exports = app => {
    class ErrorController extends app.Controller {
        async _40x() {
            await this.ctx.render("404.html");
        };

        async _50x() {
            await this.ctx.render("500.html");
        };

        async error() {
            await this.ctx.render("error.html");
        };
    }
    return ErrorController;
};

