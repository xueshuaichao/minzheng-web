/* eslint-disable */
/*
 * @des 插件
 * */
import Vue from "vue";

const downloadWithLink = (src, name) => {
    const url = src.replace(
        /^data:image\/[^;]+/,
        "data:application/octet-stream"
    );
    const link = document.createElement("a");
    link.href = url;
    link.target = "_bank";
    link.download = `${name}.png`;

    // 兼容火狐
    link.dispatchEvent(
        new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );
};

const downloadWithBlob = (src, name) => {
    const base64Str = atob(src.split(",")[1]);
    let length = base64Str.length;
    const u8arr = new Uint8Array(length);
    while (length--) {
        u8arr[length] = base64Str.charCodeAt(length);
    }
    const blob = new Blob([u8arr]);
    window.navigator.msSaveOrOpenBlob(blob, `${name}.png`);
};

const plugin = {};

plugin.install = Vue => {
    // Object.assign
    Vue.prototype.$assign = (target, ...source) =>
        Object.assign(target, ...source);

    // download base64 image
    Vue.prototype.$download = (src, name = "下载") => {
        const msSaveOrOpenBlob = window.navigator.msSaveOrOpenBlob;
        msSaveOrOpenBlob
            ? downloadWithBlob(src, name)
            : downloadWithLink(src, name);
    };
};

Vue.use(plugin);
