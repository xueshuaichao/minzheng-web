import Vue from 'vue';
import { requireContext } from '@libs/utils';

function registerGlobalComponents() {
    const file = requireContext(require.context('./page', false, /\.vue$/));

    Object.keys(file).forEach(v => Vue.component(`page-${v}`, file[v]));
}

registerGlobalComponents();
