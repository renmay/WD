module.exports = app => {

    return class HomeController extends app.Controller {

        async index() {
            const { ctx } = this;
            // await ctx.render('index/index.js');


            await ctx.redirect("http://www.baidu.com");

        }



    };
};