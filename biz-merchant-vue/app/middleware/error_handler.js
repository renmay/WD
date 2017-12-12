const util = require('util');

/**
 * 统一错误处理
 * @param options
 * @param app
 * @returns {sessionRedis}
 */
module.exports = (options, app) => {
    return function* errorHandler(next) {
        try {
            yield next;
        } catch (err) {
            // 注意：自定义的错误统一处理函数捕捉到错误后也要 `app.emit('error', err, this)`
            // 框架会统一监听，并打印对应的错误日志
            this.app.emit('error', err, this);

            app.logger.info(err.message);

            // 自定义错误时异常返回的格式
            //要根据用户请求类型判断用要
            if (this.acceptJSON){
                //未登录
                if ('Unauthorized' == err.message){
                    return this.body = {
                        code: 401,
                        message: 'Unauthorized'
                    };
                }else{
                    return this.body = {
                        code: 500,
                        data: this.app.config.env === 'prod' ? '' : this.request,
                        message: err.message ? err.message : '出错了',
                    };
                }

            }else{
                //未登录
                if ('Unauthorized' == err.message){
                    return yield this.redirect('/login');
                }else{
                    const status = detectStatus(err);
                    const code = err.code || err.type;
                    let message = detectErrorMessage(this, err);
                    if (code) {
                        message = `${message} (code: ${code})`;
                    }
                    if (isProd(app)) {
                        this.status = 500;
                        this.body = `<h2>Internal Server Error, real status: ${status}</h2>`;
                        return;
                    }
                    const locals = {
                        title: err.name,
                        url: this.url,
                        message,
                        errStack: err.stack,
                        hostname: this.hostname,
                        ip: this.ip,
                        query: util.inspect(this.query),
                        userAgent: this.header['user-agent'],
                        accept: this.header.accept,
                        cookie: util.inspect(this.header.cookie),
                        session: '',
                        coreName: this.app.poweredBy,
                        baseDir: this.app.config.baseDir,
                        config: util.inspect(this.app.config),
                    };
                    return yield this.render('onerror_page.html', locals);
                }

            }
        }

    }
};

function detectErrorMessage(ctx, err) {
    // detect json parse error
    if (err.status === 400 &&
        err.name === 'SyntaxError' &&
        ctx.request.is('application/json', 'application/vnd.api+json', 'application/csp-report')) {
        return 'Problems parsing JSON';
    }
    return err.message;
}

function detectStatus(err) {
    // detect status
    let status = err.status || 500;
    if (status < 200) {
        // invalid status consider as 500, like urllib will return -1 status
        status = 500;
    }
    return status;
}


function isProd(app) {
    return app.config.env !== 'local' && app.config.env !== 'unittest';
}
