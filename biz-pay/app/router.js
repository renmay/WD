
module.exports = app => {
    app.get('/', 'home.index');

    app.post('/pay/alipay','pay.alipay');
    app.post('/pay/weixin','pay.weixin');

    app.get('/weixin/login','weixin.login');
    app.get('/alipay/login','alipay.login');

    //二维码扫码进入的界面 如果没有别上面的路由匹配将被此路由匹配
    app.get('/:no', 'qr.scan');


};
