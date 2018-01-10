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

        async list() {
            const params = this.ctx.request.query;
            this.app.logger.info(params);
            const data = await this.service.merchant.list(params);
            this.app.logger.info(data);
            await this.ctx.render('merchant/list.html', {data, params});
        }

        /**
         * 删除
         * 批量删除时使用','将id分隔开，却最好id的数量不要超过10条
         * @param ctx
         */
        async delete() {
            const params = this.ctx.request.body;
            const id = params.id;

            if (!id) {
                this.ctx.body = this.ctx.helper.res('请选择要删除的记录', 500);
                return;
            }


            // 判断是批量删除还是单个删除
            if (id instanceof Array) {
                for (const i in id) {
                    if (id[i] === '1') {
                        this.ctx.body = this.ctx.helper.res('超级管理员不能删除', 500);
                        return;
                    }
                }
                if (id.length > 10) {
                    this.ctx.body = this.ctx.helper.res('删除的条数不能为0且同时不能多于10条', 500);
                    return;
                }
                params.id = id.join(',');
            }

            this.app.logger.info(params);
            const data = await this.service.merchant.delete(params);

            this.ctx.body = data;
        }

        /**
         * 编辑数据
         * @param ctx
         * @returns {Promise.<*>}
         */
        async edit() {
            const params = this.ctx.request.query;
            const id = params.id;

            if (id === '') {
                return this.ctx.redirect('/error');
            }

            if (id) {
                const data = await this.service.merchant.get({id});
                await this.ctx.render('merchant/edit.html', {data, params});
                return;
            }
            await this.ctx.render('merchant/edit.html', params);




        }

        /**
         * 审核
         * @returns {Promise.<*>}
         */
        async audit() {
            const params = this.ctx.request.query;
            const id = params.id;

            if (id === '') {
                return this.ctx.redirect('/error');
            }
            if (id) {
                const data = await this.service.merchant.audit({id});
                this.app.logger.info(data);
                await this.ctx.render('merchant/audit.html', {data, params});
                return;
            }
            this.app.logger.info('============');
        }


        /**
         * 编辑数据
         * @param ctx
         * @private
         */
        async audit_() {
            // this.validate(rule);
            const params = this.ctx.request.body;
            const data = await this.service.merchant.audit_(params);
            this.app.logger.info(data);
            this.ctx.body = data;
        }

        /**
         * 判断用户名是否存在
         * @param ctx
         */
        async usernameIsExist() {
            const params = this.ctx.request.body;
            // 如果用户名为空
            if (!params.username) {
                throw new Error('用户名不能为空');
            } else {
                const data = await this.service.merchant.usernameIsExist(params);
                this.ctx.body = data;
            }
        }

        /**
         * 判断手机号是否存在
         * @param ctx
         */
        async mobileIsExist() {
            const params = this.ctx.request.body;
            // 如果用户名为空
            if (!params.mobile) {
                throw new Error('手机号码不能为空');
            }

            const data = await this.service.merchant.mobileIsExist(params);
            this.ctx.body = data;
        }

        /**
         * 修改密码
         * @param ctx
         */
        async modifyPassword() {
            await this.ctx.render('merchant/modify_password_dialog.html');
        }

        /**
         * 修改密码 提交数据
         * @param ctx
         * @private
         */
        async modifyPassword_() {
            const member = this.ctx.session.member;

            const params = this.ctx.request.body;
            params.id = member.id;
            this.logger.info(params);
            // 调用service中的login接口登录
            const data = await this.service.merchant.modifyPassword(params);

            this.ctx.body = data;
        }
    }

    return MerchantController;
};
