<template>
    <div class="classificationbox _clear">
        <div class="classificationbox-left">
            <Tree
                :data="taggetTreelist"
                @on-select-change="getTreeSelected"
            />
        </div>
        <div class="classificationbox-right">
            <page-list
                :columns="columns"
                :data="typelist"
                :btn-list="btnList"
                :page-params="{
                    total: total,
                    page_num: formValidate.pageNum
                }"
                :hide-header-btn="false"
                @btn-click="handleAction"
                @page-change="getCourseList"
            >
                <template slot="header-search-bar">
                    <i-form :label-width="110">
                        <form-item
                            :label="level == 2 ? '标签名称' : '标签分类名称'"
                        >
                            <i-input
                                v-model="formValidate.name"
                                :placeholder="
                                    level == 2 ? '标签名称' : '标签分类名称'
                                "
                            />
                        </form-item>
                        <form-item
                            :label="
                                level == 2 ? '课程标签状态' : '课程分类状态：'
                            "
                        >
                            <Select v-model="formValidate.status">
                                <Option
                                    v-for="(item, index) in statuslist"
                                    :key="index"
                                    :value="item.status"
                                >
                                    {{ item.tag }}
                                </Option>
                            </Select>
                        </form-item>
                        <i-button
                            type="primary"
                            @click="findListByParentId(1)"
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
                        @click="handleShow"
                    >
                        {{ level == 2 ? "添加标签" : "添加分类" }}
                    </i-button>
                </template>
            </page-list>
        </div>
        <i-addclassification
            ref="addclassification"
            :title="level == 2 ? '标签' : '标签分类'"
            :categoryname="categoryname"
            @on-save="handleSelectResource"
        />
    </div>
</template>

<script>
/* eslint-disable */
import api from "@api/course";
import addclassification from "../../components/course/addclassification.vue";

export default {
    components: {
        "i-addclassification": addclassification
    },
    data() {
        return {
            currentid: 0,
            categoryname: "",
            total: 0,
            level: 0,
            formValidate: {
                parentId: 0,
                name: "",
                status: "",
                pageNum: 1,
                pageSize: 10
            },
            btnList: [
                {
                    name: "revise"
                },
                {
                    name: "delete"
                }
            ],
            taggetTreelist: [],
            typelist: [],
            columns: [
                {
                    title: "",
                    align: "center",
                    key: "name",
                    renderHeader: (h, params) => {
                        if (this.level == 2) {
                            params.column.title = `标签名称 (共${this.total}条 )`;
                        } else {
                            params.column.title = `标签分类名称 (共${this.total}条 )`;
                        }

                        return h("div", [h("div", params.column.title)]);
                    }
                },
                {
                    title: "状态",
                    key: "status",
                    align: "center",
                    render: (h, params) => {
                        const _this = this;
                        return h("i-switch", {
                            props: {
                                value: params.row.status == "1"
                            },
                            on: {
                                input(event) {
                                    if (event) {
                                        params.row.status = true;
                                    } else {
                                        params.row.status = false;
                                    }
                                },
                                "on-change": function() {
                                    if (params.row.status) {
                                        // 启用
                                        _this.tagopenTag(params.row);
                                    } else {
                                        // 禁用
                                        _this.tagcloseTag(params.row);
                                    }
                                }
                            },
                            scopedSlots: {
                                open: () => h("span", "开"),
                                close: () => h("span", "关")
                            }
                        });
                    }
                },
                {
                    title: "更新日期",
                    align: "center",
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
            statuslist: [
                {
                    tag: "正常",
                    status: "1"
                },
                {
                    tag: "禁用",
                    status: "0"
                }
            ]
        };
    },

    mounted() {
        this.taggetTree();
        this.findListByParentId();
    },

    methods: {
        handleShow() {
            this.currentid = 0;
            this.$refs.addclassification.handleShow();
        },

        resetbtn() {
            this.formValidate.name = "";
            this.formValidate.status = "";
            this.formValidate.pageNum = 1;
            this.findListByParentId();
        },
        getCourseList(page) {
            this.formValidate.pageNum = page;
            this.findListByParentId();
        },
        tagopenTag(row) {
            return api.tagopenTag({ queryString: { id: row.id } }).then(res => {
                if (res.success) {
                    this.findListByParentId();
                    this.$Message.success("启用成功");
                }
            });
        },
        tagcloseTag(row) {
            return api
                .tagcloseTag({ queryString: { id: row.id } })
                .then(res => {
                    if (res.success) {
                        this.findListByParentId();
                        this.$Message.success("禁用成功");
                    }
                });
        },
        tagdelete(id) {
            return api.tagdelete({ queryString: { id: id } }).then(() => {
                this.taggetTree();
                this.findListByParentId();
            });
        },
        taggetTree() {
            return api.taggetTree().then(res => {
                const { data } = res;
                if (res.success) {
                    this.taggetTreelist = this.datachang(data);
                }
            });
        },
        findListByParentId(num) {
            if (num === 1) {
                this.formValidate.pageNum = num;
            }

            return api.findListByParentId(this.formValidate).then(res => {
                const { data } = res;
                if (res.success) {
                    this.typelist = data.list;
                    this.total = data.total;
                }
            });
        },
        datachang(list) {
            const selfthis = this;
            const returnData = [
                {
                    title: "标签分类",
                    id: 0,
                    children: [],
                    expand: true,
                    level: 1
                }
            ];
            list.forEach(val => {
                const child = {};
                child.title = val.name;
                child.id = val.id;
                child.orgCode = val.code;
                child.parentId = val.parentId;
                child.children = [];
                child.level = 1;
                child.expand = true;
                selfthis.loadOrgChildTree(val, child);
                returnData[0].children.push(child);
            });
            return returnData;
        },
        // 加载组织机构的子树
        loadOrgChildTree(org, obj) {
            const selfthis = this;
            if (!org.children) {
                org.children = [];
            }
            org.children.forEach(childOrg => {
                if (!childOrg.children) {
                    childOrg.children = [];
                }
                const childitem = {};
                childitem.title = childOrg.name;
                childitem.id = childOrg.id;
                childitem.orgCode = childOrg.code;
                childitem.parentId = childOrg.parentId;
                childitem.expand = true;
                childitem.level = obj.level + 1;
                if (!obj.children) {
                    obj.children = [];
                }
                obj.children.push(childitem);
                // selfthis.loadOrgChildTree(childOrg, childitem);
            });
        },
        handleAction({ name }, res) {
            switch (name) {
                case "revise":
                    this.currentid = res.id;
                    this.$refs.addclassification.handleShow(res.name);
                    break;
                case "delete":
                    this.$Modal.confirm({
                        title: "删除后无法恢复，确定是否要删除？",
                        onOk: () => {
                            this.tagdelete(res.id);
                        }
                    });
                    break;
                default:
                    break;
            }
        },

        getTreeSelected(item) {
            this.level = item[0].level;
            this.formValidate.parentId = item[0].id;
            this.findListByParentId();
        },
        handleSelectResource(categoryname) {
            if (categoryname !== "" && this.currentid === 0) {
                return api
                    .tagadd({
                        parentId: this.formValidate.parentId,
                        name: categoryname
                    })
                    .then(() => {
                        this.currentid = 0;
                        this.taggetTree();
                        this.findListByParentId();
                    });
            } else if (categoryname !== "" && this.currentid !== 0) {
                return api
                    .tagupdate({
                        id: this.currentid,
                        name: categoryname
                    })
                    .then(() => {
                        this.currentid = 0;
                        this.taggetTree();
                        this.findListByParentId();
                    });
            } else {
                this.currentid = 0;
            }
        }
    }
};
</script>
<style lang="less">
@import "../index.less";
</style>
