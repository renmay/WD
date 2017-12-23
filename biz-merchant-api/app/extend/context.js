/**
 * 对httpclient中的curl方法进行重写 增加请求token信息
 * @param url
 * @param options
 * @returns {Promise.<TResult>}
 */
exports.fetch = function(url, options = {}) {
    //请求开始时 向header中加入Authorization
    // 1. 从session中获取Authorization
    // 2. 如果都没有不设置

    let _ctx = this;

    const authorization = this.token.authorization;
    this.app.logger.info(this.token);
    this.app.logger.info("authorization:"+authorization);
    if (authorization){
        let headers = options.headers;

        if (!headers){
            options.headers = {
                "Authorization": authorization
            };
        }else{
            headers.Authorization = authorization;
        }
    }

    //对curl进行封装
    return new Promise(resolve => {
        this.curl(url, options).then(function (value) {
            //获取authorization 并写回session中
            const authorization = value.headers.authorization;
            if (authorization){
                _ctx.token.authorization = authorization;
            }
            resolve(value);
        })
    }).then(function (result) {
        return result;
    });
}