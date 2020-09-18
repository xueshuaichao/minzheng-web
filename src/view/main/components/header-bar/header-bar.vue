<template>
    <div class="header-bar">
        <p class="title">
            伟东云后台管理系统
        </p>
        <div class="custom-content-con">
            <slot />
        </div>
    </div>
</template>
<script>
import './header-bar.less';

export default {
    name: 'HeaderBar',
    computed: {
        breadcrumb() {
            return this.$store.state.app.breadCrumbList;
        },
    },
    methods: {
        switchLang() {
            this.$i18n.locale = this.$i18n.locale === 'zh-CN' ? 'en-US' : 'zh-CN';
        },
    },
};
</script>
