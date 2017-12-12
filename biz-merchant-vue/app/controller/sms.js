'use strict';

/**
 * 短信发送
 * @param app
 * @returns {SmsController}
 */
module.exports = app => {
    class SmsController extends app.Controller {
        async send() {
            await this.ctx.render("sms/send.html");
        };

        async send_() {
            //this.ctx.validate(rule);
            let params = this.ctx.request.body;
            let data = await this.service.sms.send(params);
            this.ctx.body = data;
        };
    }
    return SmsController;
};

