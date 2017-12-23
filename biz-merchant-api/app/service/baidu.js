'use strict';
var util = require('util');

module.exports = app => {
    class BaiduService extends app.Service {
        constructor(ctx) {
            super(ctx);
        }

        /**
         * 定位
         * @param params
         */
        async location(params) {
            var lat = params.lat;
            var lng = params.lng;

            //通过经纬度定位
            if (lat && lng){
                var location = lat + "," + lng;
                var reverseGeocoder = util.format(this.app.config.baidu.reverseGeocoder, this.app.config.baidu.ak, location);

                const result = await this.ctx.curl(reverseGeocoder, {
                    dataType: 'json'
                });
                return result;
            }else{//通过ip定位
                var ip = params.ip;
                var qcip = util.format(this.app.config.baidu.qcip, this.app.config.baidu.ak, ip);

                const result = await this.ctx.curl(qcip, {
                    dataType: 'json'
                });
                return result;
            }
        }


        /**
         * 获取列表
         * @param params
         * @returns {{}}
         */
        async suggestion(params) {
            let data = {
                ak: this.app.config.baidu.ak,
                query: params.query,
                page_size: 20,
                page_num: 0,
                scope: 1,
                output: 'json',
                city_limit: true
            };

            if (1 === params.type){//城市检索
                data.region = params.city;
            }else if (2 === params.type){//矩形区域检索
                data.bounds = this.app.config.baidu.bounds;
            }else{//圆形区域检索
                data.location = this.app.config.baidu.location;
                data.radius = this.app.config.baidu.radius;
            }
            this.logger.info(data);
            const result = await this.ctx.curl(this.app.config.baidu.placeSearch, {
                dataType: 'json',
                data: data
            });
            // this.logger.info(result.data);


            //计算距离  调用百度计算
            let placeSearchResults = result.data.results;
            let routematrix = {
                ak: this.app.config.baidu.ak,
                output: 'json',
                origins: this.app.config.baidu.location,
                destinations: ''
            };
            let destinations = '';
            for (var i = 0; i < placeSearchResults.length; i++){
                destinations += placeSearchResults[i].location.lat + "," + placeSearchResults[i].location.lng;
                if (placeSearchResults.length > i + 1){
                    destinations += "|";
                }
            }
            routematrix.destinations = destinations;

            const routematrixResult = await this.ctx.curl(this.app.config.baidu.routematrix, {
                dataType: 'json',
                data: routematrix
            });
            let returnData = [];
            if (routematrixResult.data.status == 0){
                let routematrixResults = routematrixResult.data.result;

                for (var i = 0; i < routematrixResults.length; i++){
                    let distance = routematrixResults[i].distance.value;
                    if (distance <= this.app.config.baidu.radius){
                        placeSearchResults[i].distance = distance;
                        returnData.push(placeSearchResults[i]);
                    }
                }
            }

            return returnData;
        }


        async distance(params) {
            //计算距离  调用百度计算
            let routematrix = {
                ak: this.app.config.baidu.ak,
                output: 'json',
                origins: this.app.config.baidu.location,
                destinations: params.lat + ',' + params.lng
            };

            const routematrixResult = await this.ctx.curl(this.app.config.baidu.routematrix, {
                dataType: 'json',
                data: routematrix
            });

            if (routematrixResult.data.status != 0){
                throw new Error('error');
            }

            let routematrixResults = routematrixResult.data.result;
            let distance = routematrixResults[0].distance.value;
            return distance;
        }

    }

    return BaiduService;
};
