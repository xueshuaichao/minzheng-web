/* eslint-disable class-methods-use-this */
/**
 * @des storage
 */

const SERVICE_MAN_DATA = 'SERVICE_MAN_DATA';

class Storage {
    constructor() {
        this.loginInfo = null;
    }

    add(key, value) {
        const isObject = typeof value === 'object';
        localStorage.setItem(key, isObject ? JSON.stringify(value) : value);
    }

    get(key) {
        return localStorage.getItem(key);
    }

    clear() {
        localStorage.removeItem(SERVICE_MAN_DATA);
        this.loginInfo = null;
    }

    setLoginInfo(data) {
        this.loginInfo = data;
        this.add(SERVICE_MAN_DATA, data);
    }

    getLoginInfo() {
        const { loginInfo } = this;
        let data = '';

        if (loginInfo) {
            data = loginInfo;
        } else {
            const info = this.get(SERVICE_MAN_DATA);

            data = info ? JSON.parse(info) : null;
        }

        this.loginInfo = data;
        return data;
    }

    getToken() {
        const { loginInfo } = this;

        if (loginInfo) {
            return loginInfo.token;
        }
        return '';
    }
}

export default new Storage();
