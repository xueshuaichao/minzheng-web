/**
 * @des 用户管理
 */
import Main from '../view/main/main.vue';

export default {
    path: '/',
    component: Main,
    meta: {
        show: true,
        i18n: 'task.home',
        icon: 'icon9',
    },
    children: [
        {
            path: '/',
            name: 'training',
            meta: {
                show: true,
                i18n: 'task.training',
            },
            component: () => import('../view/task/index.vue'),
        },
    ],
};
