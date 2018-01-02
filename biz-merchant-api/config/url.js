'use strict';

module.exports =  {
    upload: '/common/file/upload',
    oss: '/oss',
    getUserInfo: '/user/get/{{id}}',   //参数使用{{params}}
    merchant: '/merchant',

    module: '/store/module',
    login: '/login',
    register: '/register',
    sendCode:'/send/code',
    changePassword:'/member/password',
    resetPassword:'/member/reset/password',
    member:'/member',
    mobileExists: '/mobile/exists',
    memberGet:'/member/get',
    bindWeixin: '/member/binding/weixin',
    //用户地址
    address:'/member/address',
    //用户优惠卷
    memberPrivilege: '/member/privilege',
    coupon: '/member/privilege',
    //区域信息
    district: '/district',
    districtQuery: '/district/get',

    // 留言本
    addGuestbook:'/guestbook',
    // 留言本
    guestbook: '/guestbook',

    // 店铺
    store: '/merchant/store',

    join:'/join/us',

    //打印机
    printer: '/printer',

    //商品
    goods: '/goods',
    //商品套餐
    goodsCombo: '/goods/combo',
    goodsComboCurrent: '/goods/combo/current',
    goodsComboNew: '/goods/combo/new',

    //预约提醒
    booking: '/booking',
    bookingRemind: '/booking/remind',
    bookingStatus: '/booking/status',

    order: '/order',
    calculatePrice: '/order/price',

    accessToken: '/weixin/access/token',
    chef: '/chef',

    cart: '/cart',
    comment: '/comment',
    image: '/image',
    invoice: '/invoice',
    goodsRemind: '/goods/remind',

    custom: '/custom',
    customCase: '/custom/case',
    customCategory: '/custom/category',
    constellation: '/constellation',

    test: '/test'
};