'use strict';

/**
 * 文件上传
 * @param app
 * @returns {UploadController}
 */
module.exports = app => {
    class UploadController extends app.Controller {
        async get() {
            let data = await this.service.upload.get();
            this.ctx.body = data;
        };

    }
    return UploadController;
};



