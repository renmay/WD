
process.env.VUE_ENV = 'server';
require('egg').startCluster({
  baseDir: __dirname,
  workers: process.env.WORKERS,
  port: 7005 //process.env.PORT || 7001, // default to 7001
});
