'use strict';
import menu from '../../../menu';

/**
 * firstIndex: 当前菜单所在索引 通过menu[firstIndex] 可以获取所有的二级菜单
 *
 */
const state = {
    menu: {
        menus: menu.menu,
        firstIndex: 0,
        secondIndex: 0,
        thirdIndex: 0,

    },
    oss: {
        server: '',
        key: '',
        OSSAccessKeyId: '',
        policy: '',
        signature: '',
        host: '',
        expire: '',
        maxSize: '',
        dir: '',
        callback: '',
        url: '',
        success_action_status: 200
    }
};

export default state;