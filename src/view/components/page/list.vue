<template>
    <div :class="hiddenClass ? 'common-list' : 'common-list content-wrapper'">
        <header class="common-list-header">
            <div class="common-list-search">
                <slot name="header-search-bar" />
            </div>
        </header>
        <div class="common-list-button">
            <slot name="common-list-button" />
        </div>
        <div class="table">
            <slot name="table">
                <i-table
                    :columns="columns"
                    :data="data"
                    stripe
                    @on-selection-change="handleSelectionChange"
                >
                    <template
                        slot="name"
                        slot-scope="{ row }"
                    >
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template
                        slot="resource_name"
                        slot-scope="{ row }"
                    >
                        <a @click="$emit('tiganclick')">{{
                            row.resource_name
                        }}</a>
                    </template>
                    <template
                        slot="text"
                        slot-scope="{ row }"
                    >
                        <p :title="row.text">
                            {{ row.text | sliceText }}
                        </p>
                    </template>
                    <template
                        slot="rate"
                        slot-scope="{ row }"
                    >
                        <Rate
                            disabled
                            :value="row.difficulty"
                            :count="row.difficulty"
                        />
                        {{ difficultyList[row.difficulty - 1] }}
                    </template>

                    <template
                        slot="action"
                        slot-scope="{ row, index }"
                    >
                        <div class="btn-list">
                            <template v-for="item in btnList">
                                <a
                                    v-if="
                                        (hasPermission(item.permission) &&
                                            item.show &&
                                            item.show(row)) ||
                                            !item.show
                                    "
                                    :key="item.name"
                                    @click="handleBtnClick(item, row, index)"
                                >
                                    {{ $t("button." + item.name) }}
                                </a>
                            </template>
                        </div>
                    </template>
                </i-table>
            </slot>
        </div>
        <footer>
            <slot name="footer">
                <page
                    show-total
                    class-name="pager"
                    :current="pageParams.page_num"
                    :total="pageParams.total"
                    :page-size="pageParams.page_size"
                    @on-change="handlePageChange"
                />
            </slot>
        </footer>
        <slot />
    </div>
</template>

<script>
import { hasPermission } from '@libs/utils';

export default {
    name: 'PageList',

    filters: {
        sliceText(value) {
            if (typeof value !== 'string') return '';
            if (value.length <= 10) return value;

            return `${value.slice(0, 10)}...`;
        },
    },
    props: {
        columns: {
            type: Array,
            default() {
                return [];
            },
        },
        hiddenClass: {
            type: Boolean,
            default() {
                return false;
            },
        },
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        btnList: {
            type: Array,
            default() {
                return [];
            },
        },
        hideHeaderBtn: {
            type: Boolean,
            default: true,
        },
        hidePageHide: {
            type: Boolean,
            default: true,
        },
        pageParams: {
            type: Object,
            default() {
                return {
                    page_size: 10,
                    total: 100,
                    page_num: 1,
                };
            },
        },
    },
    data() {
        return {
            difficultyList: ['非常简单', '简单', '适中', '偏难', '非常难'],
        };
    },
    methods: {
        hasPermission(code) {
            return hasPermission(this.servicePermission, code);
        },

        handleBtnClick(...arg) {
            this.$emit('btn-click', ...arg);
        },

        handlePageChange(data) {
            this.$emit('page-change', data);
        },

        handleSelectionChange(selection) {
            this.$emit('on-selection-change', selection);
        },
    },
};
</script>

<style lang="less">
@import "../../../less/variables.less";
.common-list {
    .pager {
        text-align: center;
        margin-top: 30px;
    }
    .import-err {
        color: @errColor;
    }
    .ivu-table-row {
        height: 40px;
    }

    .ivu-table th {
        position: relative;
        overflow: visible;
    }
    .btn-list {
        a {
            padding: 0 10px;
            color: @btnColor;
            line-height: 1;
        }
        a:last-child {
            border-right: none;
        }
        a:first-child {
            padding-left: 0;
        }
    }
    .btn-list-item {
        margin-right: 10px;
    }
    .ivu-btn {
        margin-right: 20px;
    }
    &-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .title {
            line-height: 32px;
            font-size: 16px;
            color: @black;
            border-left: 4px solid @mainColor;
            padding-left: 5px;
            .desc {
                padding-left: 20px;
                font-size: 12px;
                font-weight: normal;
                color: @black;
            }
        }
        .ivu-form {
            display: flex;
            flex-flow: row wrap;
            flex-shrink: 1;
        }
        .btn-wrapper {
            display: flex;
            flex-flow: row;
            button {
                margin-right: 10px;
            }
        }
    }
    &-search {
        display: flex;
        flex-direction: row;
        flex-shrink: 1;
        .ivu-input-wrapper,
        .ivu-select {
            width: 240px;
        }
        .ivu-form-item {
            margin-right: 20px;
            margin-bottom: 20px;
        }
        .ivu-cascader-not-found-tip {
            width: 240px;
            line-height: 1.5;
        }
        .ivu-btn:last-child {
            margin-right: 0;
        }
    }
    &-button {
        margin: 20px 0;
    }
    .ivu-rate-star {
        margin-right: 2px;
    }

    .ivu-table-tip {
        padding-top: 50px;
        height: 400px;
        td {
            background-image: url("../../../assets/images/user/empty.png");
            background-position: top center;
            background-repeat: no-repeat;
            background-size: 170px;
            color: #71777d !important;
            height: 300px !important;

            span {
                position: relative;
                top: 30px;
            }
        }
    }
}

@media screen and (max-width: 1660px) {
    .common-list-search {
        .ivu-input-wrapper,
        .ivu-select {
            width: 170px;
        }
    }

    .ivu-form {
        .ivu-form-item-label {
            font-size: 14px;
        }
        .ivu-select-selected-value {
            font-size: 14px;
        }
    }

    .common-list-button {
        margin: 10px 0 20px 0;
    }
}
</style>
