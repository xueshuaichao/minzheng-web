/**
 * @file
 * @author tanghao
 * @date 2018/8/2
 */
export default [
    {
        path: '/401',
        name: 'error401',
        component: () => import('../view/error/401.vue'),
    },
    {
        path: '/500',
        name: 'error500',
        component: () => import('../view/error/500.vue'),
    },
    {
        path: '*',
        name: 'error404',
        component: () => import('../view/error/404.vue'),
    },
];
