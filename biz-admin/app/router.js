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

    // //goods
    // app.get('/goods', 'goods.list');
    // app.get('/goods/edit', 'goods.edit');
    // app.post('/goods/edit', 'goods.edit_');
    // app.get('/goods/edit/en', 'goods.editEn');
    // app.post('/goods/edit/en', 'goods.editEn_');
    // app.post('/goods/delete', 'goods.delete');
    // app.post('/goods/data', 'goods.data');
    //
    // app.get('/goods/group', 'goods.group');
    // app.post('/goods/group', 'goods.group');
    //
    // app.get('/goods/recommend', 'goods.recommend');
    // app.post('/goods/recommend', 'goods.recommend');
    // app.post('/goods/recommend/cancel', 'goods.recommendCancel');
    //
    // app.get('/goods/pre', 'goods.pre');
    // app.post('/goods/pre', 'goods.pre');
    // app.post('/goods/pre/cancel', 'goods.preCancel');
    //
    // //goodsType
    // app.get('/goods/type', 'goodsType.list');
    // app.get('/goods/type/edit', 'goodsType.edit');
    // app.post('/goods/type/edit', 'goodsType.edit_');
    // app.post('/goods/type/delete', 'goodsType.delete');
    //
    // //member
    // app.get('/member', 'member.list');
    // app.get('/member/edit', 'member.edit');
    // app.post('/member/edit', 'member.edit_'); //如果是post方法修改数据 在后面加 '_' 区分
    // app.post('/member/delete', 'member.delete');
    //
    // //order
    // app.get('/order', 'order.list');
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
    // //goodsComment
    // app.get('/goods/comment', 'goodsComment.list');
    // app.get('/goods/comment/edit', 'goodsComment.edit');
    // app.post('/goods/comment/edit', 'goodsComment.edit_'); //如果是post方法修改数据 在后面加 '_' 区分
    // app.post('/goods/comment/delete', 'goodsComment.delete');
    //
    // // //seller
    // app.get('/seller', 'seller.list');
    // app.get('/seller/edit', 'seller.edit');
    // app.post('/seller/edit', 'seller.edit_');
    // app.post('/seller/delete', 'seller.delete');
    // app.post('/seller/username/exist', 'seller.usernameIsExist');
    // app.post('/seller/mobile/exist', 'seller.mobileIsExist');
    // app.get('/seller/modify/password', 'seller.modifyPassword');
    // app.post('/seller/modify/password', 'seller.modifyPassword_');
    //
    // //goodsCombo
    // app.get('/goods/combo', 'goodsCombo.list');
    // app.get('/goods/combo/edit', 'goodsCombo.edit');
    // app.post('/goods/combo/edit', 'goodsCombo.edit_'); //如果是post方法修改数据 在后面加 '_' 区分
    // app.post('/goods/combo/edit/base/info', 'goodsCombo.editBaseInfo'); //如果是post方法修改数据 在后面加 '_' 区分
    // app.post('/goods/combo/delete', 'goodsCombo.delete');
    //
    // //goodsBookingRemind
    // app.get('/goods/booking/remind', 'goodsBookingRemind.list');
    // app.get('/goods/booking/remind/edit', 'goodsBookingRemind.edit');
    // app.post('/goods/booking/remind/edit', 'goodsBookingRemind.edit_'); //如果是post方法修改数据 在后面加 '_' 区分
    // app.post('/goods/booking/remind/delete', 'goodsBookingRemind.delete');
    //
    //
    // app.get('/sms/send', 'sms.send');
    // app.post('/sms/send', 'sms.send');



};
