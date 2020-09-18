<template>
    <page-list
        :columns="columns"
        :data="courselist"
        :btn-list="btnList"
        :page-params="{ total, page_num: formValidate.pageNum }"
        :hide-header-btn="false"
        @btn-click="handleAction"
        @page-change="getCourseList"
    >
        <template slot="header-search-bar">
            <i-form :label-width="80">
                <form-item label="课程名称">
                    <i-input v-model="formValidate.name" />
                </form-item>
                <form-item label="课程分类">
                    <i-coursetype
                        ref="coursetype"
                        v-model="formValidate.categoryId"
                        @on-change="handleAreaChange"
                    />
                </form-item>
                <form-item label="课程状态">
                    <Select v-model="formValidate.online">
                        <Option
                            v-for="(item, index) in statuslist"
                            :key="index"
                            :value="item.status"
                        >
                            {{ item.tag }}
                        </Option>
                    </Select>
                </form-item>
                <form-item label="更新日期">
                    <DatePicker
                        v-model="daterangetime"
                        type="daterange"
                        placement="bottom-start"
                        placeholder="创建日期"
                        @on-change="
                            ([s, e]) => {
                                formValidate.statUpdateTime = s;
                                formValidate.endUpdateTime = e;
                            }
                        "
                    />
                </form-item>
                <i-button
                    type="primary"
                    @click="findCourseList(1)"
                >
                    搜索
                </i-button>
                <i-button @click="resetbtn">
                    重置
                </i-button>
            </i-form>
        </template>
        <template slot="common-list-button">
            <i-button
                type="primary"
                @click="$router.push('/coursement/step1')"
            >
                新建课程
            </i-button>
        </template>
    </page-list>
</template>

<script>
import api from '@api/course';
import Coursetype from '../../components/coursetype/index.vue';

export default {
    components: {
        'i-coursetype': Coursetype,
    },
    data() {
        return {
            daterangetime: '',
            total: 0,
            formValidate: {
                name: '',
                categoryId: '',
                online: '',
                statUpdateTime: '',
                endUpdateTime: '',
                pageNum: 1,
                pageSize: 10,
            },
            btnList: [
                {
                    name: 'release',
                    show({ online }) {
                        return online === 0;
                    },
                },
                {
                    name: 'unrelease',
                    show({ online }) {
                        return online !== 0;
                    },
                },
                {
                    name: 'edit',
                    show({ online }) {
                        return online === 0;
                    },
                },
                {
                    name: 'preview',
                    show({ online }) {
                        return online !== 0;
                    },
                },
                {
                    name: 'delete',
                    show({ online }) {
                        return online === 0;
                    },
                },
            ],
            courselist: [],
            columns: [
                {
                    title: '',
                    align: 'center',
                    minWidth: 200,
                    key: 'name',
                    renderHeader: (h, params) => {
                        params.column.title = `课程名称 (共 ${this.total}条)`;
                        return h('div', [h('div', params.column.title)]);
                    },
                    render: (h, params) => {
                        let txt = '';
                        if (params.row.name.length > 15) {
                            txt = `${params.row.name.substring(0, 15)}...`;
                        } else {
                            txt = params.row.name;
                        }
                        return h('span', {}, txt);
                    },
                },
                {
                    title: '课程分类',
                    minWidth: 200,
                    align: 'center',
                    key: 'categoryName',
                },
                {
                    title: '课程状态',
                    align: 'center',
                    minWidth: 90,
                    key: 'online',
                    render: (h, params) => {
                        let txt = '';
                        let txtColor = '';
                        if (params.row.online === 1) {
                            txt = '已发布';
                            txtColor = '#FF9947';
                        } else if (params.row.online === 0) {
                            txt = '草稿';
                            txtColor = '#9D9D9D';
                        }
                        return h(
                            'span',
                            {
                                props: {
                                    type: 'text',
                                    size: 'large',
                                },
                                style: {
                                    color: txtColor,
                                },
                            },
                            txt,
                        );
                    },
                },
                {
                    title: '操作日期',
                    minWidth: 100,
                    align: 'center',
                    key: 'updateTime',
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: '250',
                    fixed: 'right',
                    align: 'center',
                },
            ],
            statuslist: [
                {
                    tag: '草稿',
                    status: '0',
                },
                {
                    tag: '已发布',
                    status: '1',
                },
            ],
        };
    },

    mounted() {
        this.findCourseList();
    },

    methods: {
        getCourseList(page) {
            this.formValidate.pageNum = page;
            console.log(this.formValidate.pageNum);
            this.findCourseList();
        },
        resetbtn() {
            this.daterangetime = '';
            this.formValidate = {
                name: '',
                categoryId: '',
                online: '',
                statUpdateTime: '',
                endUpdateTime: '',
                pageNum: 1,
                pageSize: 10,
            };
            this.$refs.coursetype.typrresetbtn();
            this.findCourseList();
        },
        handleAreaChange([courseType1, courseType2, courseType3, courseType4]) {
            console.log(courseType1, courseType2, courseType3, courseType4);
            this.formValidate.categoryId = courseType4;
        },
        handleAction({ name }, { id }) {
            switch (name) {
                case 'release':
                    this.coursepublish(id);
                    break;
                case 'unrelease':
                    this.courseunPublish(id);
                    break;
                case 'edit':
                    this.$router.push(`/coursement/edit/${id}`);
                    break;
                case 'preview':
                    this.$router.push(`/coursement/coursePreview/${id}`);
                    break;
                case 'delete':
                    this.deleteCourse(id);
                    break;
                default:
                    break;
            }
        },
        coursepublish(id) {
            this.$Modal.confirm({
                title: '发布课程',
                onOk: () => {
                    api.coursepublish({ queryString: { courseId: id } }).then(
                        () => {
                            this.$Message.success('操作成功');
                            this.findCourseList();
                        },
                    );
                },
            });
        },
        courseunPublish(id) {
            this.$Modal.confirm({
                title: '取消发布课程',
                onOk: () => {
                    api.courseunPublish({ queryString: { courseId: id } }).then(
                        () => {
                            this.$Message.success('操作成功');
                            this.findCourseList();
                        },
                    );
                },
            });
        },
        deleteCourse(id) {
            this.$Modal.confirm({
                title: '删除课程后会影响学员学习，是否确定要删除？',
                onOk: () => {
                    api.coursedelete({ queryString: { courseId: id } }).then(
                        () => {
                            this.$Message.success('操作成功');
                            this.findCourseList();
                        },
                    );
                },
            });
        },
        findCourseList(num) {
            // console.log('num', num);
            if (num === 1) {
                this.formValidate.pageNum = num;
            }

            this.formValidate.statUpdateTime = this.formValidate.statUpdateTime !== ''
                ? new Date(this.formValidate.statUpdateTime).getTime()
                : '';
            this.formValidate.endUpdateTime = this.formValidate.endUpdateTime !== ''
                ? new Date(this.formValidate.endUpdateTime).getTime()
                : '';
            api.findCourseList(this.formValidate).then(
                ({ data: { list, total } }) => {
                    this.courselist = list;
                    this.total = total;
                    // this.parseData(list);
                },
            );
        },
        parseData(list) {
            list.forEach((v) => {
                v.courseName = v.courseName;
            });

            return list;
        },
    },
};
</script>
<style lang="less" scoped></style>
