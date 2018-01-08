'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // const { router, controller } = app;
  // router.get('/', controller.home.index);

  // 错误处理
  app.get(/^\/40*/, 'error._40x');
  app.get(/^\/50*/, 'error._50x');
  app.get('/error', 'error.error');
  app.get('/upload', 'upload.get');

  // 首页
  app.get('/', 'home.index');
  app.get('/index', 'home.index');

  // 登陆
  app.get('/login', 'login.login');
  app.post('/login', 'login.login');
  app.get('/logout', 'login.logout');


  // app.get('/sms/send', 'sms.send');
  // app.post('/sms/send', 'sms.send');
};
