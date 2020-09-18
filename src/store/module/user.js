import api from '@api/user';
import storage from '@libs/storage';

function getHomePermission(permission) {
    let res = '';

    permission.forEach((v) => {
        if (!res && v.length > 6 && v.indexOf('-') > -1) {
            res = v.slice(0, 5);
        }
    });

    return res;
}

export default {
    state: {
        userInfo: '',
        permission: [],
        homePermission: '',
    },

    mutations: {
        setLoginInfo(state, data) {
            state.userInfo = data.user;
        },

        setUserPermission(state, data) {
            state.permission = data;
            state.homePermission = getHomePermission(data);
        },
    },

    actions: {
        getUserInfo({ commit, state }) {
            const data = storage.getLoginInfo();
            return new Promise((resolve, reject) => {
                if (!data) reject();

                commit('setLoginInfo', data);
                if (state.permission.length) {
                    resolve(state.permission);
                    return;
                }
                api.getUserPermission()
                    .then((res) => {
                        commit('setUserPermission', res.data);
                        resolve(res.data);
                    })
                    .catch(reject);
            });
        },

        loginOut({ state }) {
            storage.clear();
            state.permission = [];
            return Promise.resolve();
        },
    },
};
