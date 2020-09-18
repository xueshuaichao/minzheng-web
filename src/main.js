import Vue from 'vue';
import './libs/iview';
import './directives';
import './plugin';
import './mixins';

import './view/components/index';
import './libs/polyfill/find';
import './libs/polyfill/dataset';

import echarts from 'echarts';
import Icon from './view/components/icon/index.vue';
import App from './app.vue';
import router from './router';
import store from './store';
import i18n from './locale';
import config from './config';

import './app.less';

Vue.prototype.$echarts = echarts;

Vue.config.productionTip = process.env.NODE_ENV === 'development';

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;

Vue.component('common-icon', Icon);

// store.commit('setToken');
// store.commit('setUserInfo');
new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#wdc-app');
