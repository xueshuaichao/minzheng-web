<template>
    <div class="app-header flex-row mar-b-20">
        <div class="logo flex-row">
            <img
                src="../../../assets/images/header/logo.png"
                alt=""
            >
            伟东云后台管理系统
        </div>
        <slot />
    </div>
</template>
<script>
export default {
    name: 'AppHeader',
};
</script>
>
<style lang="less">
@import "../../../less//variables.less";

.app-header {
    width: 100%;
    height: 64px;
    flex-shrink: 0;
    padding: 0 20px;
    justify-content: space-between;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.1);

    .logo {
        font-size: 20px;
        color: @font-color;

        img {
            width: 32px;
            margin-right: 4px;
        }
    }
}
</style>
