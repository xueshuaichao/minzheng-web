<template>
    <div class="content-wrapper page-edit">
        <header class="flex-row header">
            <div class="tabs flex-row">
                <div
                    v-for="(item, index) in tabs"
                    :key="item"
                    class="item"
                    :class="currentTabIndex === index && 'active'"
                    @click="handleClickTab(index)"
                >
                    {{ item }}
                </div>
            </div>
            <slot name="backBtn">
                <i-button
                    class="btn-prev"
                    @click="handleClickCancel"
                >
                    返回
                </i-button>
            </slot>
        </header>
        <slot />
        <slot name="footer">
            <div
                v-if="!footerHide"
                class="footer-detail"
                :class="$store.state.isCollapsed && 'footer-collapsed'"
            >
                <i-button @click="handleClickCancel">
                    取消
                </i-button>
                <i-button
                    type="primary"
                    class="mar-r-16"
                    @click="handleClickSave"
                >
                    {{ saveText }}
                </i-button>
            </div>
        </slot>
    </div>
</template>

<script>
import { debounce } from '@libs/utils';

export default {
    name: 'PageEdit',
    props: {
        value: {
            type: Number,
            default: 0,
        },

        title: {
            type: [String, Array],
            default: '',
        },

        saveText: {
            type: String,
            default: '保存',
        },

        footerHide: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            tabs: [],
            currentTabIndex: 0,
        };
    },

    watch: {
        value: {
            handler(val) {
                this.currentTabIndex = val;
            },
            immediate: true,
        },
    },

    created() {
        const { title } = this;

        this.tabs = typeof title === 'string' ? [title] : title;

        this.handleClickSave();
    },
    methods: {
        handleClickTab(index) {
            this.currentTabIndex = index;
            this.$emit('on-tab', this.tabs[index], index);
        },

        handleClickSave() {
            this.handleClickSave = debounce(
                () => {
                    this.$emit('on-save');
                },
                300,
                true,
            );
        },

        handleClickCancel() {
            this.$router.go(-1);
        },
    },
};
</script>

<style lang="less">
@import "../../../less/variables.less";

.page-edit {
    position: relative;
    padding-right: 66px !important;
    padding-bottom: 100px !important;

    .header {
        justify-content: space-between;
        margin-bottom: 40px;
    }

    .ivu-form {
        .ivu-form-item-label {
            color: #71777d;
        }
    }

    .ivu-select {
        width: 354px;
    }

    .ivu-form-item {
        margin: 0 auto;
        margin-bottom: 30px;
        .ivu-input-wrapper {
            width: 354px;
        }
    }

    .ivu-form-item-content {
        font-size: 14px;
    }

    .ivu-cascader-not-found-tip {
        width: 220px;
        line-height: 1.5;
    }

    .footer-detail {
        position: fixed;
        width: calc(100% - 277px);
        height: 80px;
        right: 0;
        bottom: 0;
        padding-top: 20px;
        text-align: center;
        box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.06);
        background-color: white;
        .ivu-btn {
            width: 160px;
            height: 40px;
        }
        .ivu-btn-default {
            margin-right: 20px;
            border: none;
            background: #f2f6fc;
        }

        &.footer-collapsed {
            width: calc(100% - 95px);
        }
    }

    .tabs {
        border-bottom: 1px solid #e4e7ed;
        .item {
            padding: 0 22px;
            padding-bottom: 10px;
            font-size: 24px;
            color: #71777d;
            &:hover {
                cursor: pointer;
            }
        }
        .active {
            border-bottom: 1px solid #448aff;
            color: #448aff;
        }
    }

    .common-form {
        padding-left: 160px;
        .title {
            margin-bottom: 30px;
            font-weight: 500;
            font-size: @font-size-20;
            color: @font-color-black;
        }
    }
}

@media screen and (max-width: 1660px) {
    .page-edit {
        .ivu-select {
            width: 300px;
        }

        .ivu-form-item {
            margin: 0 auto;
            margin-bottom: 30px;
            .ivu-input-wrapper {
                width: 300px;
            }
        }

        .common-form {
            padding-left: 80px;
        }
    }
}
</style>
