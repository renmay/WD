import Vue from 'vue';

import VueRouter from 'vue-router';

import List from './component/list';
import List2 from './component/list2';
import Form from './component/form';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: List
        },
        {
            path: '/store/module2',
            component: List2
        },
        {
            path: '/store/module',
            component: List
        },
        {
            path: '/store/module/edit',
            component: Form
        },
        {
            path: '/order/table',
            component: List
        },
        {
            path: '/order/form',
            component: Form
        }
    ]
});


export default router;
