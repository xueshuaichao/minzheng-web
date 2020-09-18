<template>
    <Modal
        v-model="show"
        width="1000"
        title="资源选择"
        height="500"
        class="modal-resource large-modal"
    >
        <!-- <i-form
            class="flex-row"
            :label-width="100"
        >
            <form-item label="资源分类">
                <Select
                    v-model="form.resourceCategoyId"
                    placeholder="请选择资源分类"
                >
                    <Option
                        v-for="item in category"
                        :key="item.id"
                        :value="item.id"
                    >
                        {{ item.name }}
                    </Option>
                </Select>
            </form-item>
            <i-button
                type="primary"
                class="mar-l-20"
                @click="getResourcesList(1)"
            >
                查询
            </i-button>
            <i-button
                class="mar-l-20"
                @click="resetForm"
            >
                重置
            </i-button>
        </i-form> -->
        <Table
            border
            :columns="columns1"
            :data="list"
            stripe
        >
            <div
                v-if="list"
                slot="radio"
                slot-scope="{ row, index }"
            >
                <Radio
                    v-model="radioMap[index]"
                    @on-change="handleChange(index, row)"
                />
            </div>
        </Table>
        <page
            show-total
            class-name="pager"
            :current="form.queryString.pageNum"
            :total="total"
            :page-size="form.queryString.pageSize"
            @on-change="getResourcesList"
        />
        <template slot="footer">
            <i-button @click="show = !show">
                取消
            </i-button>
            <i-button
                type="primary"
                @click="handleClickSave"
            >
                确定
            </i-button>
        </template>
    </Modal>
</template>

<script>
import api from '@api/course';
import { resourceMixins } from '@/mixins';

export default {
    name: 'Course',
    mixins: [resourceMixins],
    data() {
        return {
            form: {
                fileType: 1,
                queryString: {
                    pageNum: 1,
                    pageSize: 10,
                },
            },
            show: false,
            list: [],
            radioMap: {},
            currentIndex: null,
            category: [],
            total: 0,
            columns1: [
                {
                    title: '资源ID',
                    key: 'id',
                    width: 100,
                    align: 'center',
                },
                {
                    title: '资源名称',
                    key: 'name',
                    width: 260,
                    align: 'center',
                },
                {
                    title: '资源类型',
                    key: 'typeDes',
                    width: 100,
                    align: 'center',
                },
                {
                    title: '资源分类',
                    key: 'categoryName',
                    width: 150,
                    align: 'center',
                },
                {
                    title: '上传日期',
                    key: 'createTime',
                    width: 200,
                    align: 'center',
                },
                {
                    title: '绑定状态',
                    key: 'bindStatusDes',
                    width: 100,
                    align: 'center',
                },
                {
                    title: '选择',
                    slot: 'radio',
                    width: 100,
                    fixed: 'right',
                    align: 'center',
                },
            ],
        };
    },

    created() {
        // this[
        //     this.$attrs.type === '1'
        //         ? 'getCategoryOfCourse'
        //         : 'getCategoryOfPolicy'
        // ]().then((res) => {
        //     this.category = res;
        // });
    },

    methods: {
        handleShow(index, i) {
            this.show = true;
            this.getResourcesList();
            this.currentIndex = null;
            this.parentData = { index, i };
        },

        getResourcesList(num = 1) {
            this.form.queryString.pageNum = num;
            this.radioMap = {};
            api.findByConditionWithPage(this.form).then(
                ({ data: { list, total } }) => {
                    this.list = list ? this.parseData(list) : [];
                    this.total = total;
                },
            );
        },

        parseData(list) {
            const { category } = this;
            list.forEach((v) => {
                const info = category.find(
                    item => item.id === v.resourceCategoyId,
                );
                v.resourceCategoryName = info ? info.name : '';
            });

            return list;
        },

        resetForm() {
            this.form = {
                ...this.form,
                queryString: {
                    pageNum: 1,
                    pageSize: 10,
                },
                fileType: 1,
            };
            this.getResourcesList(1);
        },

        handleChange(index) {
            const { radioMap } = this;
            Object.keys(radioMap).forEach((v) => {
                radioMap[v] = false;
            });
            radioMap[index] = true;
            this.currentIndex = index;
        },

        handleClickSave() {
            if (this.currentIndex !== null) {
                this.$emit(
                    'on-save',
                    this.list[this.currentIndex],
                    this.parentData,
                );
                this.show = false;
            } else {
                this.$Message.error('请选择资源');
            }
        },
    },
};
</script>

<style lang="less">
.modal-resource {
    .ivu-modal-body {
        height: 400px;
        overflow: auto;
    }

    .ivu-page {
        text-align: center;
        margin-top: 20px;
    }
}
</style>
