'use strict';
const rule = {
    linkName: {type: 'string', required: true, allowEmpty: false},
    username: {type: 'string', required: true, allowEmpty: false},
    mobile: {type: 'string', required: true, allowEmpty: false},
    password: {type: 'string', required: false, allowEmpty: true},
    userType: {type: 'string', required: true, allowEmpty: false},
    sex: {type: 'string', required: true, allowEmpty: false},
};


module.exports = app => {
    class MerchantController extends app.Controller {

        /**
         * 显示列表
         * @param ctx
         */

        async list(ctx) {
            let params = this.request.query;
            this.app.logger.info(params);
            let data = await this.service.merchant.list(params);
            this.app.logger.info(data);
            await this.render("merchant/list.html", {data: data, params});
        };

        /**
         * 删除
         * 批量删除时使用','将id分隔开，却最好id的数量不要超过10条
         * @param ctx
         */
        async delete(ctx) {
            let params = this.request.body;
            let id = params.id;

            if (!id) {
                this.body = this.helper.res('请选择要删除的记录', 500);
                return;
            }


            //判断是批量删除还是单个删除
            if (id instanceof Array) {
                for (let i in id) {
                    if (id[i] == '1') {
                        this.body = this.helper.res('超级管理员不能删除', 500);
                        return;
                    }
                }
                if (id.length > 10) {
                    this.body = this.helper.res('删除的条数不能为0且同时不能多于10条', 500);
                    return;
                }
                params.id = id.join(',');
            }

            this.app.logger.info(params);
            let data = await this.service.merchant.delete(params);

            this.body = data;
        };

// async edit(ctx){
//     let params = this.request.query;
//     let id = params.id;

//     if (id == ''){
//         return this.redirect('/error');
//     }

//     let menus = await this.service.merchant.menu();

//     if (id){
//         let data = await this.service.merchant.get({id: id});
//         await this.render("merchant/edit.html", {data, params, menus});
//         return;
//     }
//     await this.render("merchant/edit.html", {params, menus});

// };
        async edit(ctx) {
            let params = this.request.query;
            let id = params.id;

            if (id == '') {
                return this.redirect('/error');
            }

            if (id) {
                let data = await this.service.merchant.get({id: id});
                await this.render("merchant/edit.html", {data, params});
                return;
            }
            await this.render("merchant/edit.html", params);

        };

        /**
         * 编辑数据
         * @param ctx
         * @private
         */
        async(ctx) {
            this.validate(rule);
            let params = this.request.body;
            let data = await
            this.service.merchant.edit(params);
            await
            this.body = data;
        };


        /**
         * 判断用户名是否存在
         * @param ctx
         */
        async usernameIsExist(ctx) {
            let params = this.request.body;
            //如果用户名为空
            if (!params.username) {
                throw new Error('用户名不能为空');
            } else {
                let data = await this.service.merchant.usernameIsExist(params);
                await this.body = data;
            }
        };

        /**
         * 判断手机号是否存在
         * @param ctx
         */
        async mobileIsExist(ctx) {
            let params = this.request.body;
            //如果用户名为空
            if (!params.mobile) {
                throw new Error('手机号码不能为空');
            }

            let data = await this.service.merchant.mobileIsExist(params);
            await this.body = data;
        };

        /**
         * 修改密码
         * @param ctx
         */
        async modifyPassword(ctx) {
            await this.render("merchant/modify_password_dialog.html");
        }

        /**
         * 修改密码 提交数据
         * @param ctx
         * @private
         */
        async modifyPassword_(ctx) {
            let member = this.session.member;

            const params = this.request.body;
            params.id = member.id;
            this.logger.info(params);
            //调用service中的login接口登录
            const data = await this.service.merchant.modifyPassword(params);

            this.body = data;
        }
    }

    return MerchantController;
};