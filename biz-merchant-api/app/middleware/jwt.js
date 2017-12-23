
const ContextToken = require('../token/context');
const Store = require('../token/store');

const CONTEXT_TOKEN = Symbol('context#contextToken');
const _CONTEXT_TOKEN = Symbol('context#_contextToken');

/**
 * jwt 登录验证
 * @param options
 * @param app
 * @returns {auth}
 */

module.exports = (opts, app) => {
    return async function auth(ctx, next) {
        let authorization = ctx.get('authorization');
        let path = ctx.request.path;

        // if ('/authorization' !== path){
        //     if (!authorization || authorization == ''){
        //         return forbidden(ctx); //禁止访问
        //     }
        // }

        if ('/authorization' !== path && (authorization == '' || !authorization)){//无权限
            return forbidden(ctx); //禁止访问
        }

        opts = formatOpts(opts, app);
        extendContext(ctx, opts);
        const token = ctx[CONTEXT_TOKEN];
        try {
            if (token.store) await token.initFromExternal();
        }catch (err){
            return forbidden(ctx); //禁止访问
        }

        try {
            await next();
        } catch (err) {
            throw err;
        } finally {
            await token.commit();
        }
    }
}


function formatOpts(opts, app) {
    opts = opts || {};
    // key
    opts.key = opts.key || '_token';
    opts.secret = opts.secret || 'secret';

    // back-compat maxage
    if (!('maxAge' in opts)) opts.maxAge = opts.maxage;

    if (!opts.store){
        opts.store = new Store(app.redis);
    }
    return opts;
}

/**
 * 对context扩展
 * @param context
 * @param opts
 * @returns {*}
 */
function extendContext(context, opts) {
    Object.defineProperties(context, {
        [CONTEXT_TOKEN]: {
            get() {
                if (this[_CONTEXT_TOKEN]) return this[_CONTEXT_TOKEN];
                this[_CONTEXT_TOKEN] = new ContextToken(this, opts);
                return this[_CONTEXT_TOKEN];
            },
        },
        token: {
            get() {
                return this[CONTEXT_TOKEN].get();
            },
            set(val) {
                this[CONTEXT_TOKEN].set(val);
            },
            configurable: true,
        },
        jwt: {
            get() {
                return this[CONTEXT_TOKEN].jwt();
            },
            set(val){

            }
        },
        tokenOptions: {
            get() {
                return this[CONTEXT_TOKEN].opts;
            },
        },
    });
}

/**
 * 返回403 Forbidden
 * @param _this
 * @returns {{code: number, message: string}}
 */
function forbidden(_ctx) {
    _ctx.response.status = 403;
    return _ctx.body = {
        code: 403,
        message: 'Forbidden'
    };
}


