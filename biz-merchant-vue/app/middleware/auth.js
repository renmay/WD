// const menu = require('../data/menu');
/**
 * 用户权限验证
 * @param options
 * @param app
 * @returns {sessionRedis}
 */
module.exports = () => {
    return async function sessionRedis(ctx, next) {
        ctx.app.logger.info("************************");
        ctx.app.logger.info(ctx.session);
        ctx.app.logger.info("************************");
        let member = ctx.session.member;
        if (!member || !member.id){
            return ctx.redirect('/login');
        }

        ctx.app.logger.info(`auth:${ctx.session.member.id}`);

        await next();
    }
};
