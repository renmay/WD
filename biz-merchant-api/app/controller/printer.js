'use strict';
module.exports = app => {
    class PrinterController extends app.Controller {

        /**
         * 获取所有打印机
         * @returns {Promise<void>}
         */
        async list() {
            const data = await this.ctx.service.printer.list();
            return this.success(data);
        }

        /**
         * 获取一台打印机
         * @returns {Promise<void>}get
         */
        async get() {
            let params = this.ctx.request.query;
            this.app.logger.info(params);
            const data = await this.ctx.service.printer.get(params);
            return this.success(data);
        }

        /**
         * 添加打印机
         * @returns {Promise<void>}
         */
        async add() {
            let params = this.ctx.request.query;
            const data = await this.ctx.service.printer.add(params);
            return this.success(data);
        }

        /**
         * 删除打印机
         * @returns {Promise<void>}
         */
        async delete() {
            let params = this.ctx.request.query;
            const data = await this.ctx.service.printer.delete(params);
            return this.success(data);
        }

        /**
         * 获取打印机数量
         * @returns {Promise<*>}
         */
        async getQuantity(){
            let params = this.ctx.request.query;
            const data = await this.ctx.service.printer.getQuantity(params);
            return this.success(data);
        }

        /**
         * 修改打印机
         * @returns {Promise<void>}
         */
        async edit() {
            let params = this.ctx.request.query;
            const data = await this.ctx.service.printer.edit(params);
            return this.success(data);
        }
        /**
         * 打印订单
         * @returns {Promise<void>}
         */
        async print() {
            let params = this.ctx.request.query;
            const data = await this.ctx.service.printer.print(params);
            return this.success(data);
        }

        /**
         * 打印订单
         * @returns {Promise<void>}
         */
        async printAll() {
            let params = this.ctx.request.query;
            const data = await this.ctx.service.printer.printAll(params);
            return this.success(data);
        }

    }

    return PrinterController;
};


