'use strict';

module.exports = app => {
    app.get('/authorization', 'auth.authorization');

    app.get('/upload', 'upload.params');
    app.get('/upload/oss/sts', 'upload.sts');

    //登陆
    app.post('/login', 'login.login');
    // 注册
    app.post('/register', 'register.register');
    app.post('/register/info', 'register.registerInfo');
    app.post('/mobile/exists', 'register.exists');
    //退出登录
    app.get('/logout', 'login.logout');
    // //发送验证码
    app.post('/send/code', 'sms.sendCode');
    app.post('/merchant/type', 'merchant.type');

    // 用户认证信息
    app.get('/merchant/auth/info', 'merchant.info');
    app.get('/merchant/auth/info/result', 'merchant.authResult');
    app.get('/merchant/userinfo', 'merchant.userinfo');
    app.post('/merchant/avatar', 'merchant.changeAvatar');
    app.post('/merchant/username', 'merchant.changeUsername');

    // 个人中心
    app.get('/member/info', 'member.info');
    app.post('/member/info', 'member.edit');
    app.get('/member/rank', 'member.rank');

    // 店铺管理
    app.get('/store/get', 'store.get');
    app.post('/store/edit', 'store.edit_');

    // 系统模块
    app.get('/module/get','module.get');

    // 打印机管理
    app.get('/printer/list', 'printer.list');
    app.get('/printer/get', 'printer.get');
    app.get('/printer/getQuantity', 'printer.getQuantity');
    app.post('/printer/add', 'printer.add');
    app.post('/printer/edit', 'printer.edit');
    app.post('/printer/delete', 'printer.delete');
    app.post('/printer/print', 'printer.print');
    app.post('/printer/print/all', 'printer.printAll');

    // 密码相关
    app.post('/merchant/password','merchant.changePassword');
    app.post('/merchant/reset/password','merchant.resetPassword');

    app.post('/address/add', 'address.create');
    app.post('/address/edit','address.edit');
    app.post('/address/delete','address.del');
    app.post('/address/default','address.setDefault');
    app.get('/address/list','address.list');
    app.get('/address/default','address.default');
    app.get('/address/suggestion','address.suggestion');
    app.get('/address/get','address.get');

    app.get('/goods/group','goods.group');
    app.get('/goods/detail','goods.detail');
    app.get('/goods/pre','goods.pre');
    app.get('/goods/recommend','goods.recommend');
    app.get('/goods/list','goods.list');

    //商品套餐item
    // app.get('/goods/group/item','goods.group');

    //预约提醒
    app.post('/goods/remind/add', 'remind.add');
    app.post('/goods/remind/status', 'remind.status');
    app.post('/goods/remind/open', 'remind.open');
    app.post('/goods/remind/close', 'remind.close');
    app.post('/goods/remind/delete', 'remind.delete');
    app.get('/goods/remind/list', 'remind.list');
    app.get('/goods/remind/get', 'remind.get');

    app.post('/goods/like','goods.like');

    app.get('/comment/list','comment.list');
    app.get('/comment/goods','comment.goods');
    app.post('/comment','comment.add');



    // 修改密码 用户中心
    app.post('/member/password', 'member.changePassword');
    //
    // // 忘记密码
    // app.post('/forget', 'member.forget');
    // 重置密码
    app.post('/reset/password', 'member.resetPassword');
    app.post('/web/login', 'member.webLogin');

    // 订单
    app.post('/order/create', 'order.create');
    app.post('/order/info', 'order.info');
    app.post('/order/price', 'order.price');

    app.get('/order/detail', 'order.detail');
    app.get('/order/list', 'order.list');

    app.post('/order/receive', 'order.receive');
    app.post('/order/cancel', 'order.cancel');
    app.post('/order/delete', 'order.del');
    app.post('/order/refund', 'order.refund');
    app.post('/order/reminder', 'order.reminder');



    app.post('/pay', 'pay.order');
    app.get('/pay/result', 'pay.result');

    app.get('/coupon/list','coupon.list');
    app.get('/coupon/normal','coupon.normal');

    app.post('/invoice/add', 'invoice.add');
    app.post('/invoice/edit','invoice.edit');
    app.post('/invoice/delete','invoice.del');
    app.get('/invoice/list','invoice.list');
    app.get('/invoice/get','invoice.get');
    app.get('/invoice/default','invoice.getDefault');
    app.post('/invoice/default','invoice.setDefault');

    //定制
    app.get('/custom/type','custom.type');
    app.get('/custom/type/get','custom.getType');
    app.get('/custom/case','custom.case');
    app.get('/custom/list','custom.list');
    app.get('/custom/create/:id','custom.create');
    app.post('/custom/add','custom.create');
    app.post('/custom/cancel','custom.cancel');
    app.get('/custom/detail','custom.detail');

    app.get('/constellation/list','constellation.list');

};
