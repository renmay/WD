'use strict';

const uid = require('uid-safe');
const jwt = require('jsonwebtoken');

const Store = require('./store');


/**
 * Token model
 */
class Token {
    constructor(ctx, obj) {
        this._ctx = ctx;
        if (!obj) {
            this.isNew = true;
        } else {
            for (const k in obj) {
                this[k] = obj[k];
            }
        }
    }

    toJSON() {
        const obj = {};

        Object.keys(this).forEach(key => {
            if (key === 'isNew') return;
            if (key[0] === '_') return;
            obj[key] = this[key];
        });

        return obj;
    }

    inspect() {
        return this.toJSON();
    }

    get length() {
        return Object.keys(this.toJSON()).length;
    }

    get populated() {
        return !!this.length;
    }

    save() {
        this._requireSave = true;
    }

}

module.exports = Token;



