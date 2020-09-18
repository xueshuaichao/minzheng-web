/**
 * @des 用户管理
 */
import Main from '../view/main/main.vue';

export default {
    path: '/',
    component: Main,
    meta: {
        show: true,
        i18n: 'course.home',
        icon: 'icon9',
    },
    children: [
        {
            path: '/',
            name: 'classification',
            meta: {
                show: true,
                i18n: 'course.classification',
            },
            component: () => import('../view/course/classification/index.vue'),
        },
        {
            path: '/coursement',
            name: 'coursement',
            meta: {
                show: true,
                i18n: 'course.coursement',
            },
            component: () => import('../view/course/coursement/index.vue'),
        },
        {
            path: '/coursement/step1',
            name: 'coursementstep1',
            meta: {
                i18n: 'course.coursement',
            },
            component: () => import('../view/course/coursement/newcourse/step1.vue'),
        },
        {
            path: '/coursement/edit/:id',
            name: 'coursementedit',
            meta: {
                i18n: 'course.coursement',
            },
            component: () => import('../view/course/coursement/newcourse/step1.vue'),
        },
        {
            path: '/coursement/coursePreview/:id',
            name: 'coursePreview',
            meta: {
                i18n: 'course.coursement',
            },
            component: () => import('../view/course/coursement/coursePreview.vue'),
        },

        {
            path: '/resources/editvideo/:id',
            name: 'addvideo',
            meta: {
                show: false,
                i18n: 'course.resources',
            },
            component: () => import('../view/course/resources/addvideo.vue'),
        },
        {
            path: '/resources',
            name: 'resources',
            meta: {
                show: true,
                i18n: 'course.resources',
            },
            component: () => import('../view/course/resources/index.vue'),
        },
        {
            path: '/resources/addvideo',
            name: 'addvideo',
            meta: {
                show: false,
                i18n: 'course.resources',
            },
            component: () => import('../view/course/resources/addvideo.vue'),
        },
        {
            path: '/resources/editvideo/:id',
            name: 'addvideo',
            meta: {
                show: false,
                i18n: 'course.resources',
            },
            component: () => import('../view/course/resources/addvideo.vue'),
        },
        {
            path: '/resources/adddocument',
            name: 'adddocument',
            meta: {
                show: false,
                i18n: 'course.resources',
            },
            component: () => import('../view/course/resources/adddocument.vue'),
        },
        {
            path: '/resources/editdocument/:id',
            name: 'adddocument',
            meta: {
                show: false,
                i18n: 'course.resources',
            },
            component: () => import('../view/course/resources/adddocument.vue'),
        },
        {
            path: '/classlabel',
            name: 'classlabel',
            meta: {
                show: true,
                i18n: 'course.classlabel',
            },
            component: () => import('../view/course/classlabel/index.vue'),
        },
    ],
};
