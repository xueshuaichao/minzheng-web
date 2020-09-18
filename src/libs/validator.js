/*
 * @des 自定义验证规则
 * */
export const mobileValidator = (required = true) => (rule, value, callback) => {
    if (value) {
        if (!/^1[3456789]\d{9}$/.test(value)) {
            callback(new Error('请填写正确的手机号'));
        } else {
            callback();
        }
    } else if (required) {
        callback(new Error('请填写手机号'));
    } else {
        callback();
    }
};

export const passwordValidator = (required = true) => (
    rule,
    value,
    callback,
) => {
    if (value) {
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(value)) {
            callback(new Error('密码格式为6-12位数字和字母的组合'));
        } else {
            callback();
        }
    } else if (required) {
        callback(new Error('请输入密码'));
    } else {
        callback();
    }
};

export const emailValidator = (required = true) => (rule, value, callback) => {
    if (value) {
        if (
            // eslint-disable-next-line no-useless-escape
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                value,
            )
        ) {
            callback(new Error('请输入正确的邮箱'));
        } else {
            callback();
        }
    } else if (required) {
        callback(new Error('请输入邮箱'));
    } else {
        callback();
    }
};

// var reg = /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/;
export const IDValidator = (required = true) => (rule, value, callback) => {
    if (value) {
        if (!/^(\d{18,18}|\d{15,15}|\d{17,17}X)$/.test(value)) {
            callback(new Error('请输入正确的身份证号'));
        } else {
            callback();
        }
    } else if (required) {
        callback(new Error('请输入身份证号'));
    } else {
        callback();
    }
};
