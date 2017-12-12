import Vue from 'vue';

import VueRouter from 'vue-router';

import List from './component/list';
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
            path: '/order',
            component: List
        },
        {
            path: '/order/list',
            component: List
        },
        {
            path: '/order/detail',
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
