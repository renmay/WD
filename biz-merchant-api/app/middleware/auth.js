
/**
 * 登录验证
 * @param options
 * @param app
 * @returns {auth}
 */
module.exports = (options, app) => {
    return async function auth(ctx, next) {
        let member = ctx.token.member;
        if (!member || !member.id){
            return unauthorized(ctx);
        }

        app.logger.info(`${ctx.request.href} auth:${member.id}`);
        await next();
    }
}

/**
 * 返回401 unauthorized
 * @param _this
 * @returns {{code: number, message: string}}
 */
function unauthorized(_ctx) {
    _ctx.response.status = 401;
    return _ctx.body = {
        code: 401,
        message: 'unauthorized'
    };
}





