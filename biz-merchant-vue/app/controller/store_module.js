'use strict';

module.exports = app => {
    class StoreModuleController extends app.Controller {
       
        /**
		 * 显示列表
		 * @param ctx
		 */
		async list(ctx) {
		    let params = this.ctx.request.query;
		    this.app.logger.info(params);
		    let data = await this.service.storeModule.list(params);
		    await this.ctx.render("storeModule/list.html", {data: data, params});
		};
		
		
		/**
		 * 删除
		 * 批量删除时使用','将id分隔开，最好id的数量不要超过10条
		 * @param ctx
		 */
		async delete(ctx) {
		    let params = this.ctx.request.body;
		    let id = params.id;
		
		    if (!id){
		        this.ctx.body = this.helper.res('请选择要删除的记录', 500);
		        return;
		    }
		
		    //判断是批量删除还是单个删除
		    if (id instanceof Array){
		        if (id.length > 10){
		            this.ctx.body = this.helper.res('删除的条数不能为0且同时不能多于10条', 500);
		            return;
		        }
		        params.id = id.join(',');
		    }
		
		    this.app.logger.info(params);
		    let data = await this.service.storeModule.delete(params);
		
		    this.ctx.body = data;
		};
		
		async edit(ctx) {
		    let params = this.ctx.request.query;
		    let id = params.id;
		
		    if (id == ''){
		        return this.ctx.redirect('/error');
		    }
		
		    if (id){
		        let data = await this.service.storeModule.get({id: id});
		        await this.ctx.render("storeModule/edit.html", {data, params});
		        return;
		    }
		    await this.ctx.render("storeModule/edit.html", {params});
		    
		};
		
		/**
		 * 编辑数据
		 * @param ctx
		 * @private
		 */
		async edit_(ctx) {
		    this.ctx.validate({
				key: {type: 'string', required: true, allowEmpty: false},
				name: {type: 'string', required: true, allowEmpty: false},
				icon: {type: 'string', required: true, allowEmpty: false},
				icon2: {type: 'string', required: true, allowEmpty: false},
				status: {type: 'integer', required: true, allowEmpty: false},
				createTime: {type: 'date', required: true, allowEmpty: false},
			});
		    let params = this.ctx.request.body;
		    let data = await this.service.storeModule.edit(params);
		    this.ctx.body = data;
		};

    }

    return StoreModuleController;
};
