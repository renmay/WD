module.exports = app => {

    return class HomeController extends app.Controller {

        async index() {
            const { ctx } = this;
            await ctx.render('alipay/alipay.js');


            // await ctx.redirect("http://www.baid/**/u.com");

        }



    };
};