/**
 * 404
 * @param options
 * @param app
 * @returns {sessionRedis}
 */
module.exports = (options, app) => {
    return function* (next) {
        yield next;
        if (this.status === 404 && !this.body) {
            if (this.acceptJSON){
                this.body = {
                    coe: 404,
                    message: 'Not Found'
            };
            }else{
                this.redirect('/404');
            }
        }
    };
};

