'use strict';
/**
 * 前台界面菜单配置 目前只支持三级菜单
 * 下一级菜单必须以上一级菜单开头，如：
 * '/app'               一级菜单
 * '/app/list'          二级菜单
 * '/app/list/third'    三级菜单
 *
 * 一级菜单url不能相同
 */
module.exports =  {
    menu: [
        {
            url: '/dashboard',
            icon: 'fa fa-home',
            name: '概况',
        },
        {
            url: '/store/module',
            icon: 'fa fa-home',
            name: '店铺',
            children: [
                {
                    url: '/store/module',
                    name: '店铺模块'
                },
                {
                    url: '/store/module2',
                    name: '店铺模块'
                },
                {
                    url: '/constellation',
                    name: '星座设置',
                    children: [
                        {
                            url: '/privilege',
                            icon: 'fa fa-info-circle',
                            name: '营销',
                        },
                        {
                            url: '/privilege',
                            name: '优惠卷'
                        }
                    ]
                }
            ]
        },
        {
            url: '/goods',
            icon: 'fa fa-bar-chart-o',
            name: '商品',
            children: [
                {
                    url: '/goods/list',
                    name: '商品列表',
                    children: [
                        {
                            url: '/goods/detail/46',
                            icon: 'fa fa-info-circle',
                            name: '营销',
                        },
                        {
                            url: '/privilege',
                            name: '优惠卷'
                        }
                    ]
                },
                {
                    url: '/goods/type',
                    name: '菜品类型',
                    children: [
                        {
                            url: '/privilege',
                            icon: 'fa fa-info-circle',
                            name: '营销',
                        },
                        {
                            url: '/privilege',
                            name: '优惠卷'
                        }
                    ]
                }
            ]
        },{
            url: '/custom',
            icon: 'fa fa-bar-chart-o',
            name: '定制',
            children: [
                {
                    url: '/custom/list',
                    name: '定制列表',
                    children: [
                        {
                            url: '/privilege',
                            icon: 'fa fa-info-circle',
                            name: '营销',
                        },
                        {
                            url: '/privilege',
                            name: '优惠卷'
                        }
                    ]
                },
                {
                    url: '/custom/category',
                    name: '定制分类',
                    children: [
                        {
                            url: '/privilege',
                            icon: 'fa fa-info-circle',
                            name: '营销',
                        },
                        {
                            url: '/privilege',
                            name: '优惠卷'
                        }
                    ]
                },
                {
                    url: '/custom/case',
                    name: '定制案列'
                }
            ]
        },
        {
            url: '/member',
            icon: 'fa fa-archive',
            name: '会员',
            children: [
                {
                    url: '/member',
                    name: '会员列表',
                    children: [
                        {
                            url: '/privilege',
                            icon: 'fa fa-info-circle',
                            name: '营销',
                        },
                        {
                            url: '/privilege',
                            name: '优惠卷'
                        }
                    ]
                },
                {
                    url: '/guestbook',
                    name: '用户留言',
                    children: [
                        {
                            url: '/privilege',
                            icon: 'fa fa-info-circle',
                            name: '营销',
                        },
                        {
                            url: '/privilege',
                            name: '优惠卷'
                        }
                    ]
                },
                {
                    url: '/join/us',
                    name: '加入我们'
                }
            ]
        },
        {
            url: '/seller',
            icon: 'fa fa-bar-chart-o',
            name: '商户',
            children: [
                {
                    url: '/seller',
                    name: '店员'
                },
                {
                    url: '/seller/menu',
                    name: '用户权限'
                },
                {
                    url: '/chef',
                    name: '厨师'
                }
            ]
        },
        {
            url: '/order',
            icon: 'fa fa-bar-chart-o',
            name: '订单',
            children: [
                {
                    url: '/order/list',
                    name: '订单列表'
                },
                {
                    url: '/order/table',
                    name: '待支付'
                },
                {
                    url: '/order/form',
                    name: '已支付'
                },
                {
                    url: '/order/deliver',
                    name: '待配送'
                },
                {
                    url: '/order/receive',
                    name: '待收货'
                },
                {
                    url: '/order/refund',
                    name: '待退款'
                },
                {
                    url: '/pay/order',
                    name: '交易记录'
                }
            ]
        }
    ],
    getMenus: function (menuList, menus, level, parent) {
        for (let i = 0; i < menus.length; i++){
            let menu = menus[i];
            let id = menuList.length + 1;
            let obj = {
                id: id,
                url: menu.url,
                name: menu.name,
                title: menu.title,
                level: level,
                parent: parent,
                index: i
            }
            menuList.push(obj);

            let children = menu.children;
            if (children && children.length > 0){
                this.getMenus(menuList, children, level + 1, id);
            }
        }
    }
};