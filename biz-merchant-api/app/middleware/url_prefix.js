/**
 * 路由前缀
 * @param options
 * @param app
 * @returns {sessionRedis}
 */
module.exports = (options, app) => {
    return async function auth(ctx, next) {
        let prefix = app.config.routerPrefix;
        if (prefix && '' !== prefix){
            let url = ctx.request.url;
            if (url.indexOf(prefix) === 0){
                if (url == prefix){
                    ctx.request.url = '/';
                }else{
                    ctx.request.url = url.replace(prefix, '');
                }
            }
        }
        await next();
    }
}