import Vue from 'vue';
import iView from 'view-design';
import Router from 'vue-router';
// import store from '../store';
// import CONFIG from '../config';
import routes from './routers';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes,
});

// function getHomeRoute(routes, homePermission) {
//     let res = '';
//     routes.forEach((item) => {
//         if (item.meta && item.meta.permission === homePermission) {
//             res = item;
//         } else if (item.children && item.children.length) {
//             const route = getHomeRoute(item.children, homePermission);

//             if (route) {
//                 res = route;
//             }
//         }
//     });

//     return res;
// }

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;
