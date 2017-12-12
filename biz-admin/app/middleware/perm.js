// const menu = require('../data/menu');
// /**
//  * 用户权限验证
//  * @param options
//  * @param app
//  * @returns {sessionRedis}
//  */
// module.exports = (options, app) => {
//     return async function sessionRedis(ctx, next) {
//         let member = this.ctx.session.member;
//
//         if ('1' != member.id){//这么写死吧
//             let menus = member.menus;
//             let path = this.request.path;
//             if (!isContain(menus, path)){
//                 if (this.acceptJSON) {
//                     return this.body = {
//                         code: 401,
//                         message: '无权操作',
//                     };
//                 }else{
//                     return yield this.render('error.html', {status: 401});
//                 }
//             }
//         }
//
//         yield next;
//     }
// };
//
// function isContain(arr, obj) {
//     for (let i in arr) {
//         if (arr[i] == obj){
//             return true;
//         }
//     }
//     return false;
// }
//
