'use strict';
module.exports = app => {
    class UploaderController extends app.Controller {
        /**
         * 获取上传参数
         * @param ctx
         */
        async params() {
            let data = await this.service.upload.get();
            this.body = data;
        };

        async sts() {
            let data = await this.service.upload.sts();
            if (data){
                data.callback = 'http://common.zzyuu.com/common/file/callback';
            }
            this.success(data);
        };

    }
    return UploaderController;
};



