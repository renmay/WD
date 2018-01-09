'use strict'
const crypto = require('crypto');
const nunjucks = require('nunjucks');
const moment = require('moment');
const util = require('util');

// this 是 helper 对象，在其中可以调用其他 helper 方法
// this.ctx => context 对象
// this.app => application 对象
module.exports = {

    res(message = '', code = 200, data = ''){
        if (arguments.length === 1 && typeof message !== "string"){
            data = message;
            message = '';
        }
        return {
            code,
            message,
            data
        };
    },
    /**
     * 判断是否是微信浏览器
     * @param {Object} req request
     */
    isWeixinBrower(req){
        var userAgent = req.header['user-agent'];
        this.logger.info(userAgent);
        if(userAgent.toLowerCase().indexOf("micromessenger") != -1) {
            return true;
        } else {
            return false;
        }
    },
    isAlipayBrower(req){
        var userAgent = req.header['user-agent'];
        this.logger.info(userAgent);
        if(userAgent.toLowerCase().indexOf("alipay") != -1) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断用户所在浏览器
     * @param req
     * @returns {*}
     */
    brower(req){
        var userAgent = req.header['user-agent'];
        this.logger.info(userAgent);
        if(userAgent.toLowerCase().indexOf("micromessenger") != -1) {
            return 'weixin';
        } else if(userAgent.toLowerCase().indexOf("alipay") != -1) {
            return 'alipay';
        }else {
            return 'other'
        }
    },
    /**
     * 和当前时间比较大小
     * 支持的格式为 2017-09-09 21:22:11
     * @param data
     * @returns {string}
     */
    compareDate(date1, date2){
        if (!date2){
            date2 = moment();
        }else{
            date2 = moment(date2);
        }
        return moment(date1).valueOf() - date2.valueOf();

    },
    /**
     * 转换日期为星期
     * @param date 日期字符串
     * @param language 显示语言 默认为中文 英文传： en
     * @returns {*}
     */
    convertDateToDay(date, language){
        var day=new Array('星期日', '星期一','星期二','星期三','星期四','星期五','星期六');
        if (language == 'en'){
            day=new Array('Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
        }
        var index = new Date(moment(date).valueOf()).getDay();
        return day[index];
    },
    currentWeek(date){
        var index = new Date(moment(date).valueOf()).getDay();
        return index;
    },
    currentDate(format){
        if (util.isNullOrUndefined(format)){
            format = "YYYY-MM-DD HH:mm:ss";
        }
        return moment(new Date()).format(format);
    },
    /*
     *有效期
     */
    termDate(date , month, format){
        if (util.isNullOrUndefined(format)){
            format = "YYYY-MM-DD HH:mm:ss";
        }
        return moment(date).subtract('months',month).format(format);
    },
    /**
     * 计算两个日期之间的天数
     * @param date1
     * @param date2
     */
    diffOfDate(date1, date2, type = 'days'){
        if (!date2){
            date2 = moment();
        }else{
            date2 = moment(date2);
        }
        return moment(date1).diff(date2, type);
    },
    date(data, format){
        if (util.isNullOrUndefined(data)){
            return "";
        }
        if (util.isNullOrUndefined(format)){
            format = "YYYY-MM-DD HH:mm:ss";
        }
        return moment(data).format(format);
    },
    show(data, length){
        if (!data){
            return "";
        }
        if (length && data.length > length){
            return data.substring(0, length) + "...";
        }
        return data;
    },
    /**
     * 数字转字符串 长度不足补0
     * @param number
     * @param length
     * @returns {*}
     */
    numberToString(number, length){

        if (!number && number != 0){
            return "";
        }
        number = number + "";
        if (!length){
            return number;
        }
        if (number.length >= length){
            return number;
        }

        var len = number.length;

        for (var i = 0; i < length - len; i++){
            number = "0" + number;
        }
        return number;

    },
    /**
     *  https://help.aliyun.com/document_detail/44688.html?spm=5176.doc48884.6.932.5LI6BH
     *  指定缩略的模式：
     *   lfit：等比缩放，限制在设定在指定w与h的矩形内的最大图片。
     *   mfit：等比缩放，延伸出指定w与h的矩形框外的最小图片。
     *   fill：固定宽高，将延伸出指定w与h的矩形框外的最小图片进行居中裁剪。
     *   pad：固定宽高，缩略填充
     *   fixed：固定宽高，强制缩略
     * @param width
     * @param height
     * @param m_fill
     * @returns {string}
     */
    showImage(image, width, height, scale = 'lfit'){
        if (!image || image == ''){
            return '/img/no-image.png';
        }

        let params = "";

        if (width){
            params = "x-oss-process=image/resize,m_"+scale+",w_"+width;
        }

        if (height){
            params += ",h_"+height;
        }

        return this.config.imageUrl + "/" + image + "?" + params;
    },
    renderString(str, data){
        return nunjucks.renderString(str, data);
    },

    /**
     * oss 上传签名
     * @param accesskey oos加密的key
     * @param expire  过期时间 默认10分钟
     * @param maxSize 上传大小 默认10M = 1024 * 1204 * 10
     * @param dir 指定用户上传的文件目录 必须在此目录下才能上传
     * @returns {*}
     */
    oosSign(secret, expire = 10, maxSize = 1048576000, dir = '') {

        let date = new Date();
        let timestamp = date.getTime() + expire * 60 * 1000;
        let expiration = new Date(timestamp).toISOString();

        dir = dir == '' ? date.getTime() : dir;

        let policyText = {
            "expiration": expiration, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
            "conditions": [
                ["content-length-range", 0, maxSize], // 设置上传文件的大小限制 默认10M = 1024 * 1014 * 10
                ["starts-with","$key",`temp/${dir}/`] //指定上传到的目录前缀
            ]
        };

        let base64Policy = new Buffer(JSON.stringify(policyText)).toString("base64");

        //signature
        let hmac = crypto.createHmac('sha1', secret);
        hmac.update(base64Policy);
        let signature = hmac.digest('base64');

        let result = {
            policy: base64Policy,
            signature: signature,
            expire: timestamp,
            maxSize,
            dir: `temp/${dir}/`
        }

        return result;
    },


    /**
     * 对参数进行排序 并组成一个字符串
     * @param args
     * @returns {string}
     */
    raw (args) {
        var keys = Object.keys(args);
        keys = keys.sort()
        var newArgs = {};
        keys.forEach(function (key) {
            newArgs[key.toLowerCase()] = args[key];
        });

        var string = '';
        for (var k in newArgs) {
            string += '&' + k + '=' + newArgs[k];
        }
        string = string.substr(1);
        return string;
    },
    /**
     * 微信签名
     * @param jsapiTicket
     * @param url
     * @returns {{jsapi_ticket: *, nonceStr: string, timestamp: Number, url: *}}
     */
    weixinSign(jsapiTicket, url) {
        var ret = {
            jsapi_ticket: jsapiTicket,
            nonceStr: Math.random().toString(36).substr(2, 15),
            timestamp: parseInt(new Date().getTime() / 1000),
            url: url
        };
        var string = this.raw(ret);

        const hash = crypto.createHash('sha1');
        hash.update(string);
        ret.signature = hash.digest('HEX');
        this.logger.info(`weixin sign: ${string} --> ${ret.signature}`);
        return ret;
    },

};