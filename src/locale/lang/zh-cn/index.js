/**
 * @file
 * @author tanghao
 * @date 2019-04-11
 */
import { requireContext } from '@/libs/utils';

const files = requireContext(require.context('./', false, /\.js$/));

export default {
    language: 'EN',
    ...files,
};
