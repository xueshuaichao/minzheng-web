<template>
    <div class="classificationbox _clear">
        <div class="classificationbox-left">
            <Tree
                :data="ontheleftlist"
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
                        <form-item label="课程分类名称">
                            <i-input
                                v-model="formValidate.name"
                                placeholder="课程分类名称"
                            />
                        </form-item>
                        <form-item label="课程分类状态">
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
                            @click="findCategoryListByParentId(1)"
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
                        @click="$refs.addclassification.handleShow()"
                    >
                        {{
                            formValidate.parentId !== 0
                                ? "新建子级课程分类"
                                : "新建一级课程分类"
                        }}
                    </i-button>
                </template>
            </page-list>
        </div>
        <i-addclassification
            ref="addclassification"
            title="分类"
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
            ontheleftlist: [],
            typelist: [],
            columns: [
                {
                    title: "",
                    align: "center",
                    key: "name",
                    renderHeader: (h, params) => {
                        params.column.title = `课程分类名称 (共${this.total}条 )`;
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
                                        _this.openCategory(params.row);
                                    } else {
                                        // 禁用
                                        _this.closeCategory(params.row);
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
        this.getTree();
        this.findCategoryListByParentId();
    },

    methods: {
        getCourseList() {
            this.formValidate.pageNum = page;
            this.findCategoryListByParentId();
        },
        resetbtn() {
            this.formValidate.name = "";
            this.formValidate.status = "";
            this.formValidate.pageNum = 1;
            this.findCategoryListByParentId();
        },
        openCategory(row) {
            return api
                .openCategory({ queryString: { id: row.id } })
                .then(res => {
                    if (res.success) {
                        this.findCategoryListByParentId();
                        this.$Message.success("启用成功");
                    }
                });
        },
        closeCategory(row) {
            return api
                .closeCategory({ queryString: { id: row.id } })
                .then(res => {
                    if (res.success) {
                        this.findCategoryListByParentId();
                        this.$Message.success("禁用成功");
                    }
                });
        },
        categorydelete(id) {
            return api.categorydelete({ queryString: { id: id } }).then(() => {
                this.getTree();
                this.findCategoryListByParentId();
            });
        },
        getTree() {
            return api.getTree().then(res => {
                const { data } = res;
                if (res.success) {
                    this.ontheleftlist = this.datachang(data);
                }
            });
        },
        findCategoryListByParentId(num = 1) {
            if (num === 1) {
                this.formValidate.pageNum = num;
            }

            return api
                .findCategoryListByParentId(this.formValidate)
                .then(res => {
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
                    title: "课程分类",
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
                selfthis.loadOrgChildTree(childOrg, childitem);
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
                            this.categorydelete(res.id);
                        }
                    });
                    break;
                default:
                    break;
            }
        },

        getTreeSelected(item) {
            this.formValidate.parentId = item[0].id;
            this.findCategoryListByParentId();
        },
        handleSelectResource(categoryname) {
            if (categoryname !== "" && this.currentid === 0) {
                return api
                    .categoryadd({
                        parentId: this.formValidate.parentId,
                        name: categoryname
                    })
                    .then(() => {
                        this.currentid = 0;
                        this.getTree();
                        this.findCategoryListByParentId();
                    });
            } else if (categoryname !== "" && this.currentid !== 0) {
                return api
                    .categoryupdate({
                        id: this.currentid,
                        name: categoryname
                    })
                    .then(() => {
                        this.currentid = 0;
                        this.getTree();
                        this.findCategoryListByParentId();
                    });
            } else {
            }
        }
    }
};
</script>
<style lang="less">
@import "../index.less";
</style>
