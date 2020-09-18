<template>
    <Modal
        v-model="show"
        width="650"
        title="添加标签"
        class="modal-resource large-modal"
    >
        <span style="margin-right:10px;">一级分类</span>
        <Select
            placeholder="一级分类"
            style="margin-right:10px;"
            @on-change="taggetTreechange"
        >
            <Option
                v-for="(item, index) in taggetTreelist"
                :key="index"
                :value="item.id"
            >
                {{ item.name }}
            </Option>
        </Select>
        <span style="margin-right:10px;">二级分类</span>
        <Select
            placeholder="二级分类"
            @on-change="taggetTreechange2"
        >
            <Option
                v-for="(item, index) in taggetTreelisttwo"
                :key="index"
                :value="item.id"
            >
                {{ item.name }}
            </Option>
        </Select>
        <div class="kcglStep1Tag">
            <CheckboxGroup v-model="chooseTag">
                <Checkbox
                    v-for="(item, index) in taglist"
                    :key="index"
                    :label="item.id + '&' + item.name"
                >
                    <div>{{ item.name }}</div>
                </Checkbox>
            </CheckboxGroup>
        </div>
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
/* eslint-disable */
import api from "@api/course";
// import { resourceMixins } from '@/mixins';

export default {
    name: "Course",
    // mixins: [resourceMixins],
    data() {
        return {
            chooseTag: [],
            show: false,
            taggetTreelist: [],
            taggetTreelisttwo: [],
            taglist: []
        };
    },

    created() {},

    methods: {
        taggetTreechange(data) {
            const that = this;
            (this.taglist = []),
                (this.taggetTreelisttwo = []),
                this.taggetTreelist.forEach(val => {
                    if (val.id === data && val.children) {
                        that.taggetTreelisttwo = val.children
                            ? val.children
                            : [];
                    }
                });
        },
        taggetTreechange2(id) {
            const that = this;
            this.taggetTreelisttwo.forEach(val => {
                if (val.id === id && val.children) {
                    that.taglist = val.children ? val.children : [];
                }
            });
        },
        handleShow() {
            this.show = true;
            this.chooseTag = [];
            this.taggetTree();
        },
        taggetTree() {
            return api.taggetTree().then(res => {
                const { data } = res;
                if (res.success) {
                    this.taggetTreelist = data;
                }
            });
        },

        handleClickSave() {
            this.$emit("on-save", this.chooseTag);
            this.show = false;
        }
    }
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
.kcglStep1Tag {
    margin-top: 20px;
    .ivu-checkbox-group .ivu-checkbox-wrapper div {
        display: inline-block;
        height: 35px;
        line-height: 35px;
        padding: 0 5px;
        width: auto;
        color: #fff;
        text-align: center;
    }
    .ivu-checkbox-group .ivu-checkbox-wrapper {
        margin-right: 10px;
        margin-bottom: 20px;
    }
    .ivu-checkbox-group .ivu-checkbox-wrapper:nth-child(5n + 1) div {
        background-color: #0088ff;
    }
    .ivu-checkbox-group .ivu-checkbox-wrapper:nth-child(5n + 2) div {
        background-color: #845cee;
    }
    .ivu-checkbox-group .ivu-checkbox-wrapper:nth-child(5n + 3) div {
        background-color: #ff4858;
    }
    .ivu-checkbox-group .ivu-checkbox-wrapper:nth-child(5n) div {
        background-color: #ffba00;
    }
    .ivu-checkbox-group .ivu-checkbox-wrapper div {
        background-color: #2cb18b;
    }
}
</style>
