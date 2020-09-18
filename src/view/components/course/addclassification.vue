<template>
    <Modal
        v-model="show"
        width="1000"
        :title="'课程' + title + '选择'"
        @on-ok="handleClickSave"
    >
        <i-form
            ref="formValidate"
            :label-width="155"
            :model="formValidate"
            :rules="ruleValidate"
        >
            <form-item
                :label="'课程' + title + '名称'"
                prop="categoryname"
            >
                <i-input
                    v-model="formValidate.categoryname"
                    :placeholder="'课程' + title + '名称'"
                />
            </form-item>
        </i-form>
    </Modal>
</template>

<script>
export default {
    name: 'Questions',
    props: {
        categoryname: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        saveText: {
            type: String,
            default: '保存',
        },
    },
    data() {
        return {
            show: false,
            formValidate: {
                categoryname: '',
            },
            ruleValidate: {
                categoryname: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('课程分类名称不能为空'));
                            } else if (value.length > 20) {
                                callback(
                                    new Error('课程分类名称不能超过20个字符'),
                                );
                            } else {
                                callback();
                            }
                        },
                    },
                ],
            },
        };
    },

    created() {},

    methods: {
        handleShow(categoryname) {
            const self = this;
            this.$nextTick(() => {
                self.formValidate.categoryname = categoryname;
            });
            this.show = true;
        },
        handleClickSave() {
            this.$emit('on-save', this.formValidate.categoryname);
            this.formValidate.categoryname = '';
        },
    },
};
</script>
<style lang="less"></style>
