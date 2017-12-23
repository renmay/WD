/**
 * 统一错误处理
 * @param options
 * @param app
 * @returns {sessionRedis}
 */
module.exports = (options, app) => {
    return async function errorHandler(ctx, next) {
        try{
            await next();
        }catch (err){
            // 注意：自定义的错误统一处理函数捕捉到错误后也要 `app.emit('error', err, this)`
            // 框架会统一监听，并打印对应的错误日志
            app.emit('error', err, this);
            // 自定义错误时异常返回的格式
            //要根据用户请求类型判断用要

            //判断是否是否验证码没通过

            let code = err.code;

            if (code && 'invalid_param' == code){
                let message = err.message;
                let errors = err.errors;

                if (errors && errors.length > 0){
                    //获取第一个错误信息
                    let error = errors[0];

                    if ('missing_field' == error.code){
                        message = `${error.field} ${error.message}`;
                    }else{
                        message = error.message;
                    }

                }

                return ctx.body = {
                    code: 501,
                    message: message,
                };
            }


            ctx.body = {
                code: 500,
                message: err.message ? err.message : '出错了',
            };
        }


    }
}
