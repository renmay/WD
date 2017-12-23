'use strict';

const uid = require('uid-safe');
const jwt = require('jsonwebtoken');

const Token = require('./token');
const Store = require('./store');

const ONE_DAY = 24 * 60 * 60 * 1000;

/**
 * Token model
 */
class ContextToken {
    constructor(ctx, opts) {
        this.ctx = ctx;
        this.opts = Object.assign({}, opts);
        this.store = this.opts.store;
    }

    get json() {
        var self = this;
        var obj = {};

        Object.keys(this).forEach(function (key) {
            if ('isNew' === key) return;
            if ('_' === key[0]) return;
            obj[key] = self[key];
        });

        return obj;
    }

    get() {
        const token = this.token;
        // already retrieved
        if (token) return token;
        // unset
        if (token === false) return null;

        return this.token;
    }

    jwt() {
        let jsonwebtoken = this.jsonwebtoken;
        // already retrieved
        if (jsonwebtoken) return jsonwebtoken;

        this._token = this.externalKey;
        jsonwebtoken = this.jsonwebtoken = jwt.sign({
            _token: this._token
        }, this.opts.secret);

        return jsonwebtoken;
    }

    set(val) {
        if (val === null) {
            this.token = false;
            return;
        }
        if (typeof val === 'object') {
            // use the original `externalKey` if exists to avoid waste storage
            this.create(this.externalKey, val);
            return;
        }
        throw new Error('this.token can only be set as null or an object.');
    }


    static generateTokenId (header){
        if(!header){
            return uid.sync(24);
        }else{
            return header+":"+uid.sync(24);
        }
    }

    static getExternalKey (key, authorization, secret){
        if (key && authorization && secret){
            try {
                let data = jwt.verify(authorization, secret);
                return data[key];
            } catch(err) {
                throw err;
            }
        }
        return null;
    }

    async initFromExternal() {
        const ctx = this.ctx;
        const opts = this.opts;

        //获取key
        const externalKey = ContextToken.getExternalKey(opts.key, ctx.get('authorization'), opts.secret);

        if (!externalKey) {
            // create a new `externalKey`
            this.create();
            return;
        }

        //从store中读取数据
        const json = await this.store.get(externalKey, opts.maxAge);
        if (!json) {
            // create a new `externalKey`
            this.create(externalKey);
            return;
        }

        // create with original `externalKey`
        this.create(externalKey, json);
    }

    create(externalKey, val) {
        if (this.store){
            this.externalKey = externalKey || ContextToken.generateTokenId(this.opts.suffix);
        }

        this.token = new Token(this.ctx, val);
    }

    async commit(){
        const token = this.token;
        const opts = this.opts;

        // not accessed
        if (undefined === token) return;

        // removed
        if (token === false) {
            await this.remove();
            return;
        }

        await this.save(opts);
    }

    /**
     * 保存
     * @param store
     * @returns {Promise.<void>}
     */
    async save(opts) {
        let json = this.token.toJSON();
        await this.store.set(this.externalKey, json, opts.maxAge);
    }

    async save(changed) {
        const opts = this.opts;
        const key = opts.key;
        const externalKey = this.externalKey;
        let json = this.token.toJSON();
        // set expire for check
        const maxAge = opts.maxAge ? opts.maxAge : ONE_DAY;
        json._expire = maxAge + Date.now();
        json._maxAge = maxAge;

        // save to external store
        if (externalKey) {
            await this.store.set(externalKey, json, maxAge, {
                changed,
                rolling: opts.rolling,
            });
        }
    }


    /**
     * 移除
     * @returns {Promise.<void>}
     */
    async remove() {
        const externalKey = this.externalKey;
        if (externalKey) await this.store.destroy(externalKey);
    }

}

module.exports = ContextToken;



