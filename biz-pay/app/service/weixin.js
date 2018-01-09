'use strict';
const util = require('util');

module.exports = app => {
    class TopicService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        async accessToken() {
            const result = await this.ctx.curl(this.app.urls('accessToken'), {
                method: 'get',
                dataType: 'json'
            });
            app.logger.info(result.data);
            return result.data.data;
        }

        /**
         * 获取用户的token信息
         * @param params
         */
        async token(params) {
            var url = util.format(this.app.config.weixin.tokenUrl, this.app.config.weixin.appid, this.app.config.weixin.appsecret, params.code);
            this.logger.info(url);
            const result = await this.ctx.curl(url, {
                method: 'get',
                dataType: 'json'
            });
            app.logger.info(result.data);
            return result.data;
        }

        /**
         * 获取jsapi_ticket
         * @param params
         */
        async ticket() {
            //从redis中获取
            let jsapiTicket = await this.app.redis.get(this.app.config.weixin.jsapiTicket.key);
            if (jsapiTicket){
                jsapiTicket = JSON.parse(jsapiTicket);
                if (0 == jsapiTicket.errcode){
                    return jsapiTicket.ticket;
                }
            }

            //获取access token
            let accessToken = await this.accessToken();
            var url = util.format(this.app.config.weixin.jsapiTicket.url, accessToken);
            this.logger.info(url);
            const result = await this.ctx.curl(url, {
                method: 'get',
                dataType: 'json'
            });

            let data = result.data;

            let errcode = data.errcode;
            if (0 == errcode){
                //保存经如redis
                await this.app.redis.setex(this.app.config.weixin.jsapiTicket.key, this.app.config.weixin.jsapiTicket.expire, JSON.stringify(data));
                return data.ticket;
            }

            return ""; //返回空
        }




        async bind(member, token){
            await this.service.member.bindWeixin({
                memberId: member.id,
                openId: token.openid
            });
        }

    }

    return TopicService;
};
