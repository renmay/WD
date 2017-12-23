'use strict';

class Store {
    constructor(client){
        this.client = client;
    }

    /**
     * 判断key是否存在
     * @param key
     * @returns {Promise.<*>}
     */
    async exists(key){
        let exists = await this.client.exists(key);
        return exists !== 0;
    }

    async destroy(key){
        await this.client.del(key);
    }

    /**
     * 保存key
     * @param key
     * @param value
     * @returns {Promise.<void>}
     */
    async set(key, value, maxAge){
        let storedValue = (typeof value === 'object') ? JSON.stringify(value): value;
        await this.client.set(key, storedValue);
        if (maxAge){
            await this.client.expire(key, maxAge);
        }
    }

    /**
     * 获取key
     * @param key
     * @returns {Promise.<*>}
     */
    async get(key, maxAge){
        let value = await this.client.get(key);
        if (maxAge){
            await this.client.expire(key, maxAge);
        }

        if(value && typeof value === 'string'){
            return JSON.parse(value);
        }else{
            return value;
        }
    }
}

module.exports = Store;