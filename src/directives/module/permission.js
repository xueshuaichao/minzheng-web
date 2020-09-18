/**
 * @file
 * @author tanghao
 * @date 2019-07-26
 */

import { hasPermission } from '../../libs/utils';

export default {
    inserted: (el, { value: { list, code } }) => {
        if (!hasPermission(list, code)) {
            el.remove();
        }
    },
};
