<template>
    <div class="htzkcoursePreviewbox _clear">
        <div class="studycontent-left">
            <Sider
                ref="side1"
                hide-trigger
                collapsible
                :collapsed-width="0"
                :style="{
                    height: '700px',
                    maxWidth: '300px',
                    width: '300px',
                    minWidth: '300px'
                }"
            >
                <div class="studyLeft">
                    <div class="study-con">
                        <div class="study-tabCon">
                            <!-- 左侧树形结构 -->
                            <Tree
                                :data="data5"
                                :render="renderContent"
                                class="demo-tree-render courseTree"
                            />
                        </div>
                    </div>
                </div>
            </Sider>
        </div>
        <div class="studycontent-right">
            <preview-video
                ref="previewVideo"
                v-model="videoResourceUrl"
            />
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import api from "@api/course";
import PreviewVideo from "@component/video/index1.vue";
export default {
    components: {
        PreviewVideo
    },
    data() {
        return {
            data5: [],
            periodIdArr: [],
            videoResourceUrl: ""
        };
    },

    mounted() {
        this.findCourseItemInfo(this.$route.params.id);
    },

    methods: {
        findById(resourceId) {
            api.findById({ id: resourceId }).then(res => {
                const param = {
                    videoId: res.data.mediaId,
                    name: res.data.name
                };
                const param1 = {
                    mediaId: res.data.mediaId,
                    name: res.data.name
                };
                this.previewResource(res.data.mediaId);
            });
        },
        previewResource(id) {
            return api.previewMedia({ videoId: id }).then(({ data: [url] }) => {
                this.videoResourceUrl = url;
                this.$refs.previewVideo.handleShow(this.videoResourceUrl);
            });
        },
        findCourseItemInfo(id) {
            api.findCourseItemInfo({ courseId: id }).then(({ data }) => {
                console.log(data);
                this.data5 = this.getTreeData(data);
                this.findById(this.data5[0].children[0].resourceId);
            });
        },
        getTreeData(muluList) {
            const org = [];
            let obj1 = {};
            muluList.forEach(item => {
                obj1 = {
                    title: item.title, // 目录名
                    expand: true,
                    id: item.id,
                    courseId: item.courseId,
                    resourceId: item.resourceId,
                    children: [],
                    type: "1"
                };
                this.getChildren(item, obj1);
                org.push(obj1);
            });
            return org;
        },
        getChildren(parent, childrenArr) {
            let child = {};
            if (parent.lessonList === undefined) {
                return false;
            }
            const i = 0;
            parent.lessonList.forEach(item => {
                child = {
                    title: item.title, // 目录名
                    expand: true,
                    id: item.id,
                    courseId: item.courseId,
                    resourceId: item.resourceId,
                    children: [],
                    type: "1"
                };
                if (item.periodType !== "07") {
                    childrenArr.children.push(child);
                }
                this.getChildren(item, child);
                if (child.type === "1") {
                    this.periodIdArr.push(child);
                }
            });
        },
        renderContent(h, { root, node, data }) {
            return h(
                "span",
                {
                    style: {
                        display: "inline-block",
                        cursor: "pointer",
                        width: "80%",
                        lineHeight: "28px",
                        overflow: "hidden",
                        "text-overflow": "ellipsis",
                        "white-space": "nowrap"
                    },
                    on: {
                        click: () => {
                            if (
                                data.resourceId != "" &&
                                data.resourceId !== undefined
                            ) {
                                this.$refs.previewVideo.handleVisibleChange();
                                this.findById(data.resourceId);
                            }
                        }
                    }
                },
                [
                    data.type === "1" &&
                        h("span", [
                            data.periodType === "05" &&
                                !data.isNowLearning &&
                                h(
                                    "span",
                                    {
                                        style: {
                                            border: "1px solid #ccc",
                                            padding: "3px",
                                            borderRadius: "5px",
                                            marginRight: "8px"
                                        }
                                    },
                                    "视频"
                                ),
                            data.periodType === "02" &&
                                !data.isNowLearning &&
                                h(
                                    "span",
                                    {
                                        style: {
                                            border: "1px solid #ccc",
                                            borderRadius: "5px",
                                            padding: "3px",
                                            marginRight: "8px"
                                        }
                                    },
                                    "音频"
                                ),
                            data.periodType === "03" &&
                                !data.isNowLearning &&
                                h(
                                    "span",
                                    {
                                        style: {
                                            border: "1px solid #ccc",
                                            padding: "3px",
                                            borderRadius: "5px",
                                            marginRight: "8px"
                                        }
                                    },
                                    "文档"
                                ),
                            data.isNowLearning &&
                                h("Icon", {
                                    props: {
                                        type: "ios-checkmark-empty"
                                    },
                                    style: {
                                        marginRight: "8px",
                                        fontWeight: "700",
                                        color: "#4471C9",
                                        fontSize: "28px"
                                    }
                                }),
                            h(
                                "span",
                                {
                                    style: {
                                        verticalAlign: "top"
                                    }
                                },
                                data.title
                            )
                        ]),
                    data.type === "0" &&
                        data.periodType !== "07" &&
                        h("span", [
                            h("Icon", {
                                props: {
                                    type: "record"
                                },
                                style: {
                                    marginRight: "8px"
                                }
                            }),
                            h("span", data.title)
                        ])
                ]
            );
        }
    }
};
</script>
<style lang="less" scoped></style>
<style lang="less">
._clear:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
}
.studycontent-left {
    width: 20%;
    float: left;
}
.studycontent-right {
    float: left;
    width: 75%;
}
.htzkcoursePreviewbox {
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    .courseTree {
        .ivu-icon-arrow-right-b:before {
            content: "";
        }
    }
    .ivu-tree-title {
        width: 90%;
        color: #fff;
    }

    .ivu-tree-title-selected,
    .ivu-tree-title:hover {
        color: #448aff;
        background-color: #24313c;
    }
    .wenku-toolsbar-nav {
        display: block !important;
    }
    .hp-pl0 {
        padding-left: 10px;
    }
    .hp-font12 {
        font-size: 12px;
    }
    #J_prismPlayer {
        margin: 0 auto !important;
    }
    .layout-breadcrumb {
        padding: 10px 15px 0;
    }
    .layout-content {
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main {
        padding: 10px;
    }
    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left {
        background: #464c5b;
    }
    .layout-header {
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    }
    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a {
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text {
        display: none;
    }
    .ivu-col {
        transition: width 0.2s ease-in-out;
    }
    .courseName {
        height: 110px;
        position: relative;
        padding-left: 40px;
        padding: 20px 0 20px 40px;
        line-height: 30px;
        margin-left: 30px;
    }
    .studyLeft {
        color: #fff;
        font-size: 16px;
    }
    .study-con {
        border-top: 1px solid #1c262f;
        background: #24313c;
        padding: 20px;
        padding-top: 30px;
        .study-tab {
            background: #495060;
            li {
                display: inline-block;
                width: 38%;
                margin: 0 5%;
                padding: 20px 0;
                text-align: center;
                cursor: pointer;
            }
            .curActive {
                color: royalblue;
            }
        }
    }
    .study-tabCon {
        height: 700px;
        overflow: auto;
        .hp-plTitle {
            font-size: 12px;
            line-height: 30px;
        }
        .comment-con {
            background: #2e3d49;
            padding-top: 15px;
            padding: 15px 20px 15px 10px;
            .hp-pf {
                font-size: 14px;
            }
            .ivu-btn[disabled] {
                background: #b4b4b4;
                color: #fff;
                border-color: #b4b4b4;
            }
        }
    }
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #555;
    }
    .courseName .studyBack {
        position: absolute;
        left: 0;
        top: 25px;
        cursor: pointer;
    }
    .studyMenu {
        padding-left: 20px;
        .catalogName {
            display: inline-block;
            width: 78%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
        }
        .resourceIcon {
            padding: 3px;
            border: 1px solid #fff;
            color: #fff;
            font-size: 16px;
            display: inline-block;
            border-radius: 5px;
            line-height: 20px;
            position: relative;
            left: -10px;
        }
        .studyProgress {
            display: inline-block;
            float: right;
            margin-top: 3px;
        }
    }
    .studyMenu li {
        padding-left: 32px;
        padding: 10px 0 10px 10px;
        line-height: 30px;
        cursor: pointer;
        position: relative;
        width: 90%;
        li {
            width: 100%;
        }
    }
    .studyMenu li .ivu-icon {
        margin-right: 15px;
    }
    .studyTop {
        height: 90px;
        line-height: 90px;
        background: #1a232b;
        text-align: center;
        color: #fff;
        font-size: 20px;
    }
    .studyToggle {
        float: left;
        margin-top: 15px;
    }
    .studyNext {
        height: 100px;
        background: #f7fbff;
        float: right;
        /*position: fixed;*/
        padding-top: 30px;
        bottom: 0;
        z-index: 999;
        width: 100%;
    }
    .nextItem {
        width: 122px;
        height: 36px;
        background: #4471c9;
        border-radius: 3px;
        font-size: 18px;
        color: #fff;
        border: none;
        float: right;
    }
    .playCon {
        margin-top: 90px;
        height: auto;
    }
    .jw-icon-cc:before {
        content: "字幕";
    }
    .jw-icon-barlogo-new:before {
        content: "";
    }
    .iconNav {
        margin-top: 20px;
    }
    .playLayout {
        width: 100%;
        transition: all 0.5;
    }
    /*评论*/
    .hp-pfStar .ivu-rate-star-content:before,
    .hp-pfStar .ivu-rate-star:before {
        /*background:;*/
        // content: url(../../../../../static/images/star_edit.png);
    }
    .hp-pfStar .ivu-rate-star-full:before,
    .hp-pfStar.ivu-rate-star-half .ivu-rate-star-content:before {
        // content: url(../../../../../static/images/star_active.png);
    }
    .hp-pfStar {
        padding: 5px 0;
    }
    .comment-text textarea.ivu-input {
        color: #888;
        font-size: 12px;
    }
    .hp-commentBtn {
        text-align: center;
        padding-top: 10px;
        .ivu-btn {
            margin: 0 15px;
        }
        .cancleBtn {
            background: #dbdbdb;
            color: #888;
        }
    }
    .hp-commentList {
        li {
            padding: 20px 10px;
            border-top: 1px solid #1c262f;
            .hp-userHead {
                width: 32px;
                height: 32px;
                overflow: hidden;
                border-radius: 50%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .hp-commentCon {
                width: calc(~"100% - 43px");
                padding-left: 15px;
                .ivu-rate-disabled {
                    margin: 3px 25px 0 0;
                }
                .ivu-rate-text {
                    margin: -14px 0 0 0;
                }
                .ivu-rate-star {
                    margin-right: 3px;
                    vertical-align: top;
                }
                .ivu-rate-star-content:before,
                .ivu-rate-star:before {
                    color: #fff;
                    font-size: 13px;
                }
                .ivu-rate-star-full:before,
                .ivu-rate-star-full .ivu-rate-star-content:before {
                    color: #3e7fff;
                }
                .hp-laud {
                    text-align: right;
                    font-size: 16px;
                    color: #bfbfbf;
                    margin-top: 10px;
                    transition: all 0.2s;
                    img {
                        vertical-align: bottom;
                    }
                }
                .hp-pjContent {
                    word-wrap: break-word; /* 以上三个浏览器均支持 */
                }
            }
        }
    }
    .studyLeft .studyBack.ivu-icon-ios-arrow-left:before {
        content: "\F3D2" !important;
    }
}
</style>
