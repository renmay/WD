const nunjucks = require('nunjucks');
const url = require('../../config/url');
module.exports = {
  /**
     * 返回url.js 中定义的url
     * @param name
     * @param data
     * @returns {string}
     */
  urls(name, data, host = this.config.api.base) {
    const dotIndex = name.indexOf('.');
    if (dotIndex !== -1 && data) {
      const urlName = name.substr(0, dotIndex);
      const param = name.substr(dotIndex + 1);
      const result = host + nunjucks.renderString(`${url[urlName]}/{{${param}}}`, data);
      this.logger.info(result);
      return result;
    }
    if (data) {
      const result = host + nunjucks.renderString(url[name], data);
      this.logger.info(result);
      return result;
    }
    const result = host + url[name];
    this.logger.info(result);
    return result;

  },

};
