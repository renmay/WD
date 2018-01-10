const nunjucks = require('nunjucks');
const url = require('../../config/url');
module.exports = {
    /**
     * 返回url.js 中定义的url
     * @param name
     * @param data
     * @returns {string}
     */
    urls(name, data, host = this.config.baseUrl) {
        let dotIndex = name.indexOf(".");
        if (dotIndex != -1 && data){
            let urlName = name.substr(0, dotIndex);
            let param = name.substr(dotIndex+1);
            let result = host + nunjucks.renderString(`${url[urlName]}/{{${param}}}`, data);
            this.logger.info(result);
            return result;
        }
        if (data){
            let result = host + nunjucks.renderString(url[name], data);
            this.logger.info(result);
            return result;
        }else{
            let result = host + url[name];
            this.logger.info(result);
            return result;
        }
    }

};