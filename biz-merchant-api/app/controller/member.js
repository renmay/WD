'use strict';
module.exports = app => {
    class MemberController extends app.Controller {

        async webLogin(){
            let member = this.ctx.token.member;
            this.ctx.body = this.ctx.helper.res(member);
        }

        async info(){
            let member = this.ctx.token.member;

            let data = await this.service.member.get({
                memberId: member.id
            });

            let coupon = await this.service.coupon.count({
                memberId: member.id,
                status: 1
            });

            let username = data.nickname;

            if (!username || '' == username){
                username = data.mobile
            }

            //星座
            let constellation = this.ctx.helper.constellation(data.birthday);

            this.ctx.body = this.ctx.helper.res({
                constellation,
                point: data.point,
                couponNumber: coupon.count,
                avatar: data.avatar,
                mobile: data.mobile,
                nickname: data.nickname,
                username: username,
                sex: data.sex,
                birthday: data.birthday?data.birthday:''
            });
        }

        async rank(){
            let member = this.ctx.token.member;

            let data = await this.service.member.get({
                memberId: member.id
            });

            let rank = data.rank;
            let rankPoint = 2000;
            let point = data.point;
            let rankExpires = data.rankExpires
            let totalPoint = data.totalPoint;
            let diffPoint = rankPoint - point;

            diffPoint = diffPoint < 0 ? 0 : diffPoint;

            //星座
            let info = "会员介绍会员介绍会员介绍会员介绍会员介绍会员介绍会员介绍会员介绍会员介绍会员介绍会员介绍";

            this.ctx.body = this.ctx.helper.res({
                point,
                rankPoint,
                rankExpires,
                diffPoint,
                totalPoint,
                rank,
                info
            });
        }


        async edit(){
            let params = this.ctx.request.body;

            let avatar = params.avatar;

            if (avatar && avatar != ''){
                if (avatar.indexOf('http://') != 0){
                    params.avatar = `${this.app.config.imageUrl}/${avatar}`;
                }
            }

            let member = this.ctx.token.member;
            params.id = member.id;
            params.memberId = member.id;
            let data = await this.service.member.edit(params);

            this.ctx.body = data;
        }

        async changePassword(){
            this.ctx.validate({
                oldPassword: {type: 'string',  min : 6},
                password: {type: 'string',  min : 6}
            });

            let params = this.ctx.request.body;

            let member = this.ctx.token.member;
            params.memberId = member.id;
            let data = await this.service.member.changePassword(params);

            this.ctx.body = data;
        }

        async resetPassword(){
            this.ctx.validate({
                mobile: {type: 'mobile'},
                code: {type: 'string'},
                password: {type: 'string',  min : 6}
            });

            let params = this.ctx.request.body;

            let reset = this.ctx.token.reset;

            if (!reset){
                return this.ctx.body = this.ctx.helper.res('请先发送验证码', 500);
            }

            //验证验证码
            if (params.code != reset.code){
                return this.ctx.body = this.ctx.helper.res('验证码不正确', 500);
            }

            //验证手机号
            if (params.mobile != reset.mobile){
                return this.ctx.body = this.ctx.helper.res('手机号码不匹配', 500);
            }

            let data = await this.service.member.resetPassword(params);

            if (data.code == 200){
                this.ctx.token.reset = undefined;
            }

            this.ctx.body = data;
        }


    }
    return MemberController;
};
