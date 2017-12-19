'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller } = app;
  // router.get('/', controller.home.index);

    //错误处理
    app.get(/^\/40*/, 'error._40x');
    app.get(/^\/50*/, 'error._50x');
    app.get('/error', 'error.error');
    app.get('/upload', 'upload.get');

    //首页
    app.get('/', 'home.index');
    app.get('/index', 'home.index');
    app.get('/remote', 'home.remote');

    //登陆
    app.get('/login', 'login.login');
    app.post('/login', 'login.login');
    app.get('/logout', 'login.logout');

    //product
    app.get('/product', 'product.list');
    app.get('/product/edit', 'product.edit');
    app.post('/product/edit', 'product.edit_');
    // app.get('/product/edit/en', 'product.editEn');
    // app.post('/product/edit/en', 'product.editEn_');
    // app.post('/product/delete', 'product.delete');
    // app.post('/product/data', 'product.data');
    //
    // app.get('/product/group', 'product.group');
    // app.post('/product/group', 'product.group');
    //
    //member
    app.get('/member', 'member.list');
    app.get('/member/edit', 'member.edit');
    app.post('/member/edit', 'member.edit_'); //如果是post方法修改数据 在后面加 '_' 区分
    app.post('/member/delete', 'member.delete');
    //
    // app.get('/product/pre', 'product.pre');
    // app.post('/product/pre', 'product.pre');
    // app.post('/product/pre/cancel', 'product.preCancel');
    //
    //productType
    app.get('/product/type', 'productType.list');
    app.get('/product/type/edit', 'productType.edit');
    app.post('/product/type/edit', 'productType.edit_');
    app.post('/product/type/delete', 'productType.delete');
    app.get('/product/recommend', 'product.recommend');
    app.post('/product/recommend', 'product.recommend');
    app.post('/product/recommend/cancel', 'product.recommendCancel');
    //

    //order
    app.get('/order', 'order.list');
    // app.get('/order/remind', 'order.remind');
    // app.get('/order/unpaid', 'order.unpaid');
    // app.get('/order/paid', 'order.paid');
    // app.get('/order/deliver', 'order.deliver');
    // app.get('/order/receive', 'order.receive');
    // app.get('/order/refund', 'order.refund');
    // app.get('/order/detail', 'order.detail');
    // app.get('/order/deliver/address', 'order.deliverAddress');
    // app.post('/order/deliver/address', 'order.deliverAddress_');
    //
    // app.post('/order/refunded', 'order.refunded');  //确认退款
    // app.post('/order/received', 'order.received'); //确认送达
    // app.post('/order/deliver', 'order.delivering'); //开始配送
    //
    // //orderConfig
    // app.get('/order/config', 'orderConfig.list');
    // app.get('/order/config/edit', 'orderConfig.edit');
    // app.post('/order/config/edit', 'orderConfig.edit_'); //如果是post方法修改数据 在后面加 '_' 区分
    // app.post('/order/config/delete', 'orderConfig.delete');
    //
    // //productComment
    // app.get('/product/comment', 'productComment.list');
    // app.get('/product/comment/edit', 'productComment.edit');
    // app.post('/product/comment/edit', 'productComment.edit_'); //如果是post方法修改数据 在后面加 '_' 区分
    // app.post('/product/comment/delete', 'productComment.delete');
    //
    // //merchant
    app.get('/merchant', 'merchant.list');
    app.get('/merchant/edit', 'merchant.edit');
    app.post('/merchant/edit', 'merchant.edit_');
    app.post('/merchant/delete', 'merchant.delete');
    app.post('/merchant/username/exist', 'merchant.usernameIsExist');
    app.post('/merchant/mobile/exist', 'merchant.mobileIsExist');
    app.get('/merchant/modify/password', 'merchant.modifyPassword');
    app.post('/merchant/modify/password', 'merchant.modifyPassword_');
    // //productCombo
    // app.get('/product/combo', 'productCombo.list');
    // app.get('/product/combo/edit', 'productCombo.edit');
    // app.post('/product/combo/edit', 'productCombo.edit_'); //如果是post方法修改数据 在后面加 '_' 区分
    // app.post('/product/combo/edit/base/info', 'productCombo.editBaseInfo'); //如果是post方法修改数据 在后面加 '_' 区分
    // app.post('/product/combo/delete', 'productCombo.delete');
    //
    // //productBookingRemind
    // app.get('/product/booking/remind', 'productBookingRemind.list');
    // app.get('/product/booking/remind/edit', 'productBookingRemind.edit');
    // app.post('/product/booking/remind/edit', 'productBookingRemind.edit_'); //如果是post方法修改数据 在后面加 '_' 区分
    // app.post('/product/booking/remind/delete', 'productBookingRemind.delete');
    //
    //

    //printer
    app.get('/printer', 'printer.list');
    app.get('/printer/edit', 'printer.edit');
    app.post('/printer/edit', 'printer.edit_'); //如果是post方法修改数据 在后面加 '_' 区分
    app.post('/printer/delete', 'printer.delete');

    //store
    app.get('/store', 'store.list');
    app.get('/store/edit', 'store.edit');
    app.post('/store/edit', 'store.edit_'); //如果是post方法修改数据 在后面加 '_' 区分
    app.post('/store/delete', 'store.delete');

    // app.get('/sms/send', 'sms.send');
    // app.post('/sms/send', 'sms.send');



};
