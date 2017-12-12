
module.exports = app => {
    app.get('/', 'home.index');
    // app.get('/client', app.controller.home.home.client);
    // app.get('/element', app.controller.home.home.element);
    // app.get('/pager', app.controller.home.home.pager);
    // app.get('/await/es6', app.controller.await.es6.index);
    // app.get('/await', app.controller.await.await.index);
    // app.get('/await/client', app.controller.await.await.client);
    // app.get('/await/element', app.controller.await.await.element);
    // app.get('/await/pager', app.controller.await.await.pager);
    //
    // app.get('/about', app.controller.about.about.index);
    // app.get('/router', app.controller.router.router.index);
    // app.get('/dynamic', app.controller.dynamic.dynamic.index);
    // app.get('/app/api/article/list', app.controller.app.app.list);
    // app.get('/app/api/article/:id', app.controller.app.app.detail);
    // app.get('/app(/.+)?', app.controller.app.app.index);

    app.get('/dashboard(/.+)?', 'home.index');
    // app.get('/goods(/.+)?', app.controller.app.app.index);
    // app.get('/custom(/.+)?', app.controller.app.app.index);
    // app.get('/member(/.+)?', app.controller.app.app.index);
    // app.get('/seller(/.+)?', app.controller.app.app.index);
    app.get('/order(/.+)?', 'order.index');
    app.post('/order/api/list', 'order.list');
    app.post('/order/api/delete', 'order.delete');
    app.post('/order/api/edit', 'order.edit');


    app.get('/store(/.+)?', 'store.index');
    app.post('/store/api/list', 'store.list');
    app.post('/store/api/delete', 'store.delete');
    app.post('/store/api/edit', 'store.edit');

    // app.get('/less', app.controller.css.css.less);
    // app.get('/css/module', app.controller.css.css.module);
    // app.get('/sass', app.controller.css.css.sass);
    // app.get('/test', app.controller.test.test.index);


    app.get('/common/api/file/sign', 'upload.get');

    app.get('/login', 'login.login');
    app.post('/login', 'login.login');
};
