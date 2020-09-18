import Area from '../config/data';

const getAreaName = (code) => {
    let name = '';
    function queryAreaName(data) {
        data.forEach((v) => {
            if (v.value === String(code)) {
                name = v.label;
            }
            if (v.children) {
                queryAreaName(v.children);
            }
        });
    }
    queryAreaName(Area);
    return name;
};

/*
 * @des 获取地址详细信息
 * @param { Array } codeList;
 * */
export const getAddress = (codeList = []) => codeList.map(v => getAreaName(v)).join('');
export default {};
