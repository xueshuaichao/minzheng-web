<template>
    <div class="app-loading">
        <Spin
            v-if="value"
            fix
        >
            <Icon
                type="ios-loading"
                :size="size"
                class="demo-spin-icon-load"
            />
            <div>{{ loadingText }}</div>
        </Spin>
    </div>
</template>
<script>
export default {
    name: 'Loading',
    props: {
        loadingText: {
            type: String,
            default: '上传中',
        },
        size: {
            type: String,
            default: '20',
        },
        value: {
            type: [String, Boolean, Number],
            default: false,
        },
    },
};
</script>
>
<style lang="less">
.app-loading {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    .ivu-spin-main {
        width: 100%;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
    }
    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
}
</style>
