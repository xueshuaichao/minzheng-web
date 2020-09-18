<template>
    <div class="content-wrapper page-detail">
        <i-button
            class="btn-prev"
            @click="handleClickBtn"
        >
            {{ btnName }}
        </i-button>
        <div :class="['content', className]">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageDetail',
    props: {
        btnName: {
            type: String,
            default: '返回',
        },
        path: {
            type: String,
            default: '',
        },
        className: {
            type: String,
            default: '',
        },
    },
    methods: {
        handleClickBtn() {
            const { path } = this;
            if (path) {
                this.$router.push(path);
            } else {
                this.$router.go(-1);
            }
        },
    },
};
</script>

<style lang="less">
@import "../../../less/variables.less";
.page-detail {
    font-size: 14px;
    .item {
        width: 300px;
    }
    .label {
        display: inline-block;
        width: 60px;
        flex-shrink: 0;
        text-align: right;
        margin-right: 32px;
        color: @black;
    }
    .large-label {
        width: 90px;
    }
    .value {
        color: @fontColor;
    }
    .flex-row {
        margin-bottom: 44px;
    }
    .content {
        padding-left: 72px;
    }
    .btn-prev {
        margin-bottom: 32px;
    }
}
</style>
