'use strict';

module.exports = {
  menu: [
    {
      url: '/index',
      icon: 'fa fa-home',
      name: '首页',
      children: [
        {
          url: '/index',
          name: '消息通知',
        },
        {
          url: '/order/config',
          name: '财务报表',
        },
        {
          url: '/constellation',
          name: '待办事项',
        },
      ],
    },
    {
      url: '/module',
      icon: 'fa fa-bar-chart-o',
      name: '模块',
      children: [
        {
          url: '/module',
          name: '系统模块',
        },
      ],
    },
    {
      url: '/merchant',
      icon: 'fa fa-bar-chart-o',
      name: '商家',
      children: [
        {
          url: '/merchant',
          name: '全部',
        },
      ],
    },
    {
      url: '/order',
      icon: 'fa fa-bar-chart-o',
      name: '订单',
      children: [
        {
          url: '/order',
          name: '订单列表',
        },
        {
          url: '/order/unpaid',
          name: '待支付',
        },
        {
          url: '/order/paid',
          name: '已支付',
        },
        {
          url: '/order/deliver',
          name: '待配送',
        },
        {
          url: '/order/receive',
          name: '待收货',
        },
        {
          url: '/order/refund',
          name: '待退款',
        },
        {
          url: '/pay/order',
          name: '交易记录',
        },
      ],
    },
    {
      url: '/member',
      icon: 'fa fa-bar-chart-o',
      name: '会员',
      children: [
        {
          url: '/member',
          name: '会员',
        },
      ],
    },
  ],
  getMenu(url) {
    const menu = this.menu;
    if (!url || url == '/' || url == '') {
      for (const i in menu) {
        if (i == 0) {
          menu[0].current = true;
          menu[0].children[0].current = true;
        } else {
          menu[i].current = false;
        }
        // 取出第一个children的url赋值给menu
        const first_children = menu[i].children;
        if (first_children && first_children.length > 0) {
          menu[i].url = first_children[0].url;
        }
      }
      return menu;
    }
    let children_current = false; // 用于判断是否已经找到子节点
    for (const i in menu) {
      menu[i].current = false;
      if (!children_current) { // 判断是否已经查找到子节点 因为存在缓存 node不是每次都读磁盘 所以需要将其他的current置为false
        const children = menu[i].children;
        const url_obj = {
          index: -1,
          length: 0,
        };
        for (const j in children) {
          children[j].current = false;
          if (url.indexOf(children[j].url) != -1) {
            const len = children[j].url.length;
            // 判断当前url是否比上一个匹配到的url更精确
            if (url_obj.length < len) {
              // 将当前menu置为false
              menu[i].current = true;
              children[j].current = children_current = true;
              // 将上一个置为false
              if (url_obj.index >= 0) {
                children[url_obj.index].current = false;
              }

              url_obj.index = j;
              url_obj.length = len;
            }
          }
        }
      }

      // 取出第一个children的url赋值给menu
      const first_children = menu[i].children;
      if (first_children && first_children.length > 0) {
        menu[i].url = first_children[0].url;
      }
    }
    if (!children_current) {
      menu[0].current = true;
      menu[0].children[0].current = true;
    }
    return menu;
  },
};
