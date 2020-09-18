<template>
    <page-list
        :columns="columns"
        :data="resourceslist"
        :btn-list="btnList"
        :page-params="{
            total,
            page_num: formValidate.queryString.pageNum,
            page_size: formValidate.queryString.pageSize
        }"
        :hide-header-btn="false"
        @btn-click="handleAction"
        @page-change="getCourseList"
    >
        <template slot="header-search-bar">
            <i-form :label-width="110">
                <form-item label="文件名称">
                    <i-input v-model="formValidate.name" />
                </form-item>
                <form-item label="分类">
                    <i-coursetype
                        ref="coursetype"
                        v-model="formValidate.resourceCategoyId"
                        @on-change="handleAreaChange"
                    />
                </form-item>
                <form-item label="是否加入课程">
                    <Select
                        v-model="formValidate.isJoin"
                        style="width: 160px;"
                        placeholder="请选择"
                    >
                        <Option
                            v-for="item in isJoinlist"
                            :key="item.value"
                            :value="item.value"
                        >
                            {{ item.label }}
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
                                formValidate.startDate = s;
                                formValidate.endDate = e;
                            }
                        "
                    />
                </form-item>
                <i-button
                    type="primary"
                    @click="findByConditionWithPage(1)"
                >
                    搜索
                </i-button>
                <i-button @click="resetbtn()">
                    重置
                </i-button>
            </i-form>
        </template>
        <template slot="common-list-button">
            <!-- <Tabs
                :value="name"
                :animated="false"
                @on-click="handleTabRemove"
            >
                <TabPane
                    label="视频"
                    name="05"
                > -->
            <i-button
                type="primary"
                @click="$router.push('/resources/addvideo')"
            >
                上传视频
            </i-button>
            <!-- </TabPane>
                <TabPane
                    label="音频"
                    name="02"
                >
                    <i-button
                        type="primary"
                        @click="$router.push('/resources/addvideo')"
                    >
                        上传音频
                    </i-button>
                </TabPane>
                <TabPane
                    label="文档"
                    name="03"
                >
                    <i-button
                        type="primary"
                        @click="$router.push('/resources/adddocument')"
                    >
                        上传文档
                    </i-button>
                </TabPane>
            </Tabs> -->
        </template>
        <preview-video
            ref="previewVideo"
            v-model="videoResourceUrl"
        />
    </page-list>
</template>

<script>
/* eslint-disable */
import api from "@api/course";
import Coursetype from "../../components/coursetype/index.vue";
import PreviewVideo from "@component/video/index.vue";
export default {
    components: {
        "i-coursetype": Coursetype,
        PreviewVideo
    },
    data() {
        return {
            videoResourceUrl: "",
            name: "",
            daterangetime: "",
            total: 0,
            formValidate: {
                queryString: {
                    pageNum: 1,
                    pageSize: 10
                },
                fileType: 1,
                name: "",
                resourceCategoyId: "",
                isJoin: "",
                startDate: "",
                endDate: ""
            },
            btnList: [
                {
                    name: "edit"
                },
                {
                    name: "preview"
                },
                {
                    name: "shelves",
                    show({ status }) {
                        return status == 1; // 0 禁用 1 启用
                    }
                }
            ],
            resourceslist: [],
            columns: [
                {
                    title: "", //序号
                    width: 130,
                    align: "center",
                    renderHeader: (h, params) => {
                        params.column.title = "序号 (共" + this.total + "条)";
                        return h("div", [h("div", params.column.title)]);
                    },
                    render: (h, params) => {
                        return h(
                            "span",
                            params.index +
                                (this.formValidate.queryString.pageNum - 1) *
                                    this.formValidate.queryString.pageSize +
                                1
                        );
                    }
                },
                {
                    title: "文件名称", // 文件名称
                    align: "center",
                    width: 150,
                    key: "enclosureName",
                    render: (h, params) => {
                        let txt = "";
                        if (params.row.enclosureName.length > 15) {
                            txt = `${params.row.enclosureName.substring(
                                0,
                                15
                            )}...`;
                        } else {
                            txt = params.row.enclosureName;
                        }
                        return h("span", {}, txt);
                    }
                },
                {
                    title: "文件大小", // 文件大小
                    align: "center",
                    width: 120,
                    key: "size"
                },
                {
                    title: "", // 时长
                    width: 120,
                    align: "center",
                    key: "length",
                    renderHeader: (h, params) => {
                        // if (this.Params.enclosureformat === '03') {
                        // params.column.title = '页数';
                        // } else {
                        params.column.title = "时长";
                        // }
                        return h("div", [h("div", params.column.title)]);
                    }
                },
                {
                    title: "分类", // 分类
                    width: 130,
                    align: "center",
                    key: "categoryName"
                },
                {
                    title: "转码状态", // 状态
                    width: 130,
                    align: "center",
                    key: "transcodingStatus",
                    render: (h, params) => {
                        let txt = "";
                        let txtColor = "";
                        if (params.row.transcodingStatus === 0) {
                            txt = "转码中";
                            txtColor = "#919191";
                        } else if (params.row.transcodingStatus === 1) {
                            txt = "转码成功";
                            txtColor = "#2F77F1";
                        } else if (params.row.transcodingStatus === 2) {
                            txt = "转码失败";
                            txtColor = "#919191";
                        }
                        return h(
                            "span",
                            {
                                props: {
                                    type: "text",
                                    size: "large"
                                },
                                style: {
                                    color: txtColor
                                }
                            },
                            txt
                        );
                    }
                },
                {
                    title: "状态", // 状态
                    width: 100,
                    align: "center",
                    key: "status",
                    render: (h, params) => {
                        let txt = "";
                        let txtColor = "";
                        if (params.row.status === 0) {
                            txt = "已下架";
                            txtColor = "#919191";
                        } else {
                            txt = "正常";
                        }
                        return h(
                            "span",
                            {
                                props: {
                                    type: "text",
                                    size: "large"
                                },
                                style: {
                                    color: txtColor
                                }
                            },
                            txt
                        );
                    }
                },
                {
                    title: "内容标签", // 内容标签
                    width: 120,
                    align: "center",
                    key: "contentLogo"
                },
                {
                    title: "是否加入课程", // 是否加入课程
                    align: "center",
                    width: 150,
                    key: "isJoin",
                    render: (h, params) => {
                        let txt = "";
                        let txtColor = "";
                        if (params.row.isJoin === 1) {
                            txt = "是";
                            txtColor = "#333333";
                        } else if (params.row.isJoin === 0) {
                            txt = "否";
                            txtColor = "#919191";
                        }
                        return h(
                            "span",
                            {
                                props: {
                                    type: "text",
                                    size: "large"
                                },
                                style: {
                                    color: txtColor
                                }
                            },
                            txt
                        );
                    }
                },
                {
                    title: "更新日期", // 文件名称
                    align: "center",
                    width: 200,
                    key: "updateTime"
                },
                {
                    title: "操作",
                    slot: "action",
                    width: "200",
                    fixed: "right",
                    align: "center"
                }
            ],
            isJoinlist: [
                {
                    value: "1",
                    label: "是"
                },
                {
                    value: "0",
                    label: "否"
                }
            ]
        };
    },

    mounted() {
        this.findByConditionWithPage();
    },

    methods: {
        resetbtn() {
            this.daterangetime = "";
            this.formValidate = {
                queryString: {
                    pageNum: 1,
                    pageSize: 10
                },
                name: "",
                resourceCategoyId: "",
                isJoin: "",
                fileType: 1,
                startDate: "",
                endDate: ""
            };
            this.$refs.coursetype.typrresetbtn();
            this.findByConditionWithPage();
        },
        getCourseList(page) {
            this.formValidate.queryString.pageNum = page;
            this.findByConditionWithPage();
        },
        handleTabRemove() {},
        handleAreaChange([courseType1, courseType2, courseType3, courseType4]) {
            console.log(
                "66",
                courseType1,
                courseType2,
                courseType3,
                courseType4
            );
            this.formValidate.resourceCategoyId = courseType4;
        },
        handleAction({ name }, row) {
            switch (name) {
                case "edit":
                    this.$router.push(`/resources/editvideo/${row.id}`);
                    break;
                case "preview":
                    console.log(row);
                    this.previewResource(row.mediaId);
                    break;
                case "shelves":
                    this.updateStatus(row.id);
                    break;
                default:
                    break;
            }
        },
        updateStatus(id) {
            return api.updateStatus({ id: id, status: 0 }).then(res => {
                this.findByConditionWithPage();
                this.$Message.success("下架成功");
            });
        },
        previewResource(id) {
            return api.previewMedia({ videoId: id }).then(({ data: [url] }) => {
                this.videoResourceUrl = url;
                this.$refs.previewVideo.handleShow(this.videoResourceUrl);
            });
        },
        findByConditionWithPage(num) {
            if (num === 1) {
                this.formValidate.queryString.pageNum = num;
            }

            this.formValidate.startDate = new Date(
                this.formValidate.startDate
            ).getTime();
            this.formValidate.endDate = new Date(
                this.formValidate.endDate
            ).getTime();
            api.findByConditionWithPage(this.formValidate).then(
                ({ data: { list, total } }) => {
                    this.resourceslist = list;
                    this.total = total;
                    this.parseData(list);
                }
            );
        },
        parseData(list) {
            list.forEach(v => {
                v.enclosureName = v.name;
            });

            return list;
        }
    }
};
</script>
<style lang="less" scoped></style>
