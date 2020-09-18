<template>
    <page-edit
        :title="title"
        :save-text="saveText"
        @on-save="submit"
        @on-tab="handleClickTab"
    >
        <div class="common-form flex-row">
            <i-form
                v-show="!currentPage"
                ref="form"
                :label-width="120"
                :model="form"
                :rules="rules"
            >
                <form-item
                    label="课程名称"
                    prop="name"
                >
                    <i-input
                        v-model="form.name"
                        :maxlength="20"
                        placeholder="课程名称"
                    />
                </form-item>
                <form-item
                    label="课程封面"
                    prop="icon"
                >
                    <page-upload-file
                        v-model="form.icon"
                        img
                        :on-before-upload="onBeforeUpload"
                        @on-end="uploadEnd"
                    />
                </form-item>
                <form-item
                    label="课程分类"
                    prop="category"
                    class="addcoursetype"
                >
                    <i-coursetype
                        v-model="form.category"
                        :categoycode="code"
                        @on-change="handleAreaChange"
                    />
                </form-item>
                <form-item
                    label="课程难度"
                    prop="difficulty"
                >
                    <Select
                        v-model="form.difficulty"
                        placeholder="课程难度"
                    >
                        <Option
                            v-for="(item,
                                    index) in courseListStaticInfo.difficulty"
                            :key="index"
                            :value="index"
                        >
                            {{ item }}
                        </Option>
                    </Select>
                </form-item>
                <form-item
                    label="出品方"
                    prop="producer"
                >
                    <i-input
                        v-model="form.producer"
                        :maxlength="20"
                        placeholder="出品方"
                    />
                </form-item>
                <form-item
                    label="描述:"
                    prop="description"
                >
                    <i-input
                        v-model="form.description"
                        type="textarea"
                        placeholder="请输入0-200字"
                    />
                </form-item>
                <form-item
                    label="学分"
                    prop="credit"
                >
                    <Input v-model="form.credit" />分
                </form-item>
                <form-item
                    label="是否公开"
                    prop="publicType"
                >
                    <RadioGroup v-model="form.publicType">
                        <Radio label="1">
                            <span>是</span>
                        </Radio>
                        <Radio label="0">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </form-item>
                <form-item
                    label="是否推荐"
                    prop="recommend"
                >
                    <RadioGroup v-model="form.recommend">
                        <Radio label="1">
                            <span>是</span>
                        </Radio>
                        <Radio label="0">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </form-item>

                <form-item
                    label="课程标签"
                    prop="courseDifficulty"
                >
                    <div
                        class="tagtjbq"
                        @click="getMoreTag"
                    >
                        +添加标签
                    </div>
                    <ul class="hp-newCourse-tagList">
                        <li
                            v-for="(item, index) in tagList"
                            :id="item[0]"
                            :key="index"
                        >
                            {{ item[1] }}
                            <img
                                src="../../../../assets/images/course/deleteBtn.png"
                                alt
                                class="hp-deleteBtn"
                                @click="removeTag(index)"
                            >
                        </li>
                    </ul>
                </form-item>
            </i-form>
            <i-form
                v-show="currentPage"
                ref="chapter"
                class="course-info"
                :rules="rules"
                :model="params"
                :label-width="140"
            >
                <p class="title">
                    课时信息
                    <i-button
                        type="primary"
                        class="mar-l-20"
                        @click="handleAddChapter"
                    >
                        <Icon
                            type="ios-add-circle-outline"
                            size="20"
                        />
                        添加章节
                    </i-button>
                </p>
                <div
                    v-for="(item, index) in params.addList"
                    :key="index"
                    class="chapter"
                >
                    <form-item :label="`第${index + 1}章 章节标题`">
                        <i-input
                            v-model="item.title"
                            placeholder="请输入章节标题"
                            :maxlength="20"
                        />
                        <div
                            class="add flex-row"
                            @click.self="handleAddLession(index)"
                        >
                            <Icon
                                type="ios-add-circle-outline"
                                size="17"
                            />
                            添加节

                            <a
                                style="padding-left: 16px"
                                @click="handleDelCourseResource(index, item.id)"
                            >
                                删除</a>
                        </div>
                    </form-item>
                    <template v-for="(it, i) in item.lessonList">
                        <div :key="i">
                            <form-item :label="`第${i + 1}节 节标题`">
                                <i-input
                                    v-model="it.title"
                                    placeholder="请输入节标题"
                                    :maxlength="20"
                                />
                                <i-input
                                    v-model="it.period"
                                    type="number"
                                    :maxlength="3"
                                    class="small mar-l-20"
                                />
                                <p class="text">
                                    学时
                                    <a
                                        @click="
                                            handleDelCourseResource(
                                                index,
                                                it.id,
                                                i
                                            )
                                        "
                                    >
                                        删除</a>
                                </p>
                            </form-item>
                            <form-item
                                label="选择资源"
                                class="add-resource"
                            >
                                <div
                                    class="add flex-row mar-r-20"
                                    @click="$refs.resource.handleShow(index, i)"
                                >
                                    <Icon
                                        type="ios-add-circle-outline"
                                        size="17"
                                    />
                                    添加资源
                                </div>
                                <p>{{ it.resourceName }}</p>
                            </form-item>
                        </div>
                    </template>
                </div>
            </i-form>
        </div>
        <resource
            ref="resource"
            type="1"
            @on-save="handleSelectResource"
        />
        <i-courselabel
            ref="courselabel"
            @on-save="handleCourselabel"
        />
    </page-edit>
</template>

<script>
import api from '@api/course';
import { courseMixins } from '@/mixins';
// import { courseMixins, resourceMixins } from '@/mixins';
import { extend } from '@libs/utils';
import Resource from '../../../components/resource/index.vue';
import Coursetype from '../../../components/coursetype/index.vue';
import Courselabel from '../../../components/courselabel/index.vue';

export default {
    name: 'AddCourse',
    components: {
        Resource,
        'i-coursetype': Coursetype,
        'i-courselabel': Courselabel,
    },
    mixins: [courseMixins],
    data() {
        return {
            tagList: [],
            code: {
                courseType1: '',
                courseType2: '',
                courseType3: '',
                courseType4: '',
            },
            id: '',
            form: {
                id: '',
                name: '',
                icon: '',
                category: '',
                difficulty: '',
                producer: '',
                description: '',
                credit: '',
                publicType: '1',
                recommend: '1',
                tagIdList: [],
            },
            level: null,
            saveText: '保存课程',
            currentPage: false, // 0 课程 1 章节
            params: {
                courseId: '',
                addList: [
                    // {
                    //     id: null,
                    //     lessonList: [
                    //         {
                    //             duration: 100,
                    //             period: 10,
                    //             resourceId: 22,
                    //             title: '测试第一节',
                    //         },
                    //         {
                    //             duration: 100,
                    //             period: 100,
                    //             resourceId: 22,
                    //             title: '测试第一节',
                    //         },
                    //     ],
                    //     title: '',
                    // },
                ],
                updateList: [],
                deleteIdList: [],
            },
            // courseCategory: '',
            // courseCategoryTree: '',
            title: ['创建课程', '创建章节'],
            options3: {
                disabledDate(date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                },
            },
            rules: {
                credit: {
                    required: true,
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        const reg = /^(?:0|[1-9][0-9]?|100)$/;
                        if (!value) {
                            callback(new Error('学分不能为空'));
                        } else if (!reg.test(value)) {
                            callback(
                                new Error('学分必须输入小于等于100的整数'),
                            );
                        } else {
                            callback();
                        }
                    },
                },
                description: [
                    {
                        required: true,
                        message: '描述不能为空',
                        trigger: 'blur',
                    },
                    {
                        required: true,
                        max: 200,
                        message: '描述最多可输入200字',
                        trigger: 'blur',
                    },
                ],
                producer: [
                    {
                        required: true,
                        message: '出品方不能为空',
                        trigger: 'blur',
                    },
                    {
                        required: true,
                        max: 10,
                        message: '出品方最多可输入10字',
                        trigger: 'blur',
                    },
                ],
                name: [
                    {
                        required: true,
                        message: '课程名称不能为空',
                        trigger: 'blur',
                    },
                    {
                        required: true,
                        max: 20,
                        message: '课程名称最多可输入20字',
                        trigger: 'blur',
                    },
                ],
                icon: {
                    required: true,
                    validator: (rule, value, cb) => {
                        if (
                            this.form.icon !== ''
                            && this.form.icon !== undefined
                        ) {
                            cb();
                        } else {
                            cb(Error('请选择图片'));
                        }
                    },
                },
                category: {
                    required: true,
                    validator: (rule, value, cb) => {
                        if (
                            this.form.category !== ''
                            && this.form.category !== undefined
                        ) {
                            cb();
                        } else {
                            cb(Error('请选择课程分类'));
                        }
                    },
                },
                difficulty: {
                    required: true,
                    message: '请选择难度',
                    trigger: 'change',
                },
            },
        };
    },
    async created() {
        const { id } = this.$route.params;
        this.id = id;
        this.form.id = id;
        this.params.courseId = id;

        if (id) {
            this.title = ['编辑课程', '编辑章节'];
        } else {
            this.title = '创建课程';
        }

        // await this.getCategoryOfCourse().then((res) => {
        //     this.courseCategoryTree = res;
        // });

        if (id) {
            this.getCourseDetail(id);
            this.getCourseItemDetail(id);
        }
    },
    methods: {
        handleCourselabel(chooseTag) {
            chooseTag.forEach((val, index) => {
                chooseTag[index] = val.split('&');
            });
            this.tagList = chooseTag;
            console.log('this.tagList', this.tagList);
        },
        onBeforeUpload(file) {
            return {
                file,
                resourceType: 1,
                uploadType: 1,
                fileType: 2,
            };
        },
        uploadEnd(data) {
            this.form.icon = data.icon;
            this.$refs.form.validateField('icon');
        },
        handleAreaChange([courseType1, courseType2, courseType3, courseType4]) {
            console.log(courseType1, courseType2, courseType3);
            this.form.category = courseType4;
            this.$refs.form.validateField('category');
        },
        getMoreTag() {
            this.$refs.courselabel.handleShow();
        },

        getCourseDetail(id) {
            const that = this;
            api.getCourseDetail({ id }).then(({ data }) => {
                this.form = this.parseData(extend(this.form, data));
                this.form.difficulty = `${this.form.difficulty}`;
                this.form.publicType = `${this.form.publicType}`;
                this.form.recommend = `${this.form.recommend}`;

                this.code.courseType1 = data.categoryList[0].id;
                this.code.courseType2 = data.categoryList[1].id;
                this.code.courseType3 = data.categoryList[2].id;
                this.code.courseType4 = data.categoryList[3].id;
                const { tagList } = data;
                tagList.forEach((val) => {
                    const tagobj = [val.tagId, val.tagName];
                    that.tagList.push(tagobj);
                });
            });
            this.$forceUpdate();
        },

        getCourseItemDetail(id) {
            api.getCourseItemDetail({ courseId: id }).then(({ data }) => {
                const oldData = this.filterData(data);
                this.oldCourseItem = JSON.parse(JSON.stringify(oldData));
                this.params.addList = oldData;
            });
        },

        filterData(data) {
            const defaultData = {
                id: '',
                duration: '',
                period: '',
                resourceId: '',
                title: '',
                resourceName: '',
            };

            return data.map(v => ({
                id: v.id,
                title: v.title,
                lessonList: v.lessonList.map(item => extend(defaultData, item)),
            }));
        },

        parseData(data) {
            data.courseType = String(data.courseType);
            data.payway = String(data.payway);

            // this.level = this.courseCategoryTree.findIndex(
            //     v => v.id === +data.parentCourseCategoryId,
            // );

            // this.handleChangeCourseCategory(Math.max(0, this.level));
            return data;
        },

        submit() {
            const { currentPage } = this;
            this.$refs[currentPage ? 'chapter' : 'form'].validate((res) => {
                if (res) {
                    if (this.id) {
                        this[
                            this.currentPage ? 'saveCourseItem' : 'updateCourse'
                        ]();
                    } else {
                        this[
                            this.currentPage ? 'saveCourseItem' : 'addCourse'
                        ]();
                    }
                }
            });
        },

        updateCourse() {
            const that = this;
            this.tagList.forEach((val) => {
                that.form.tagIdList.push(Number(val[0]));
            });
            const param = {
                id: this.form.id,
                name: this.form.name,
                icon: this.form.icon,
                category: Number(this.form.category),
                difficulty: Number(this.form.difficulty),
                producer: this.form.producer,
                description: this.form.description,
                credit: Number(this.form.credit),
                publicType: Number(this.form.publicType),
                recommend: Number(this.form.recommend),
                tagIdList: this.form.tagIdList,
            };
            api.courseupdate(param).then(() => {
                this.$Message.success('更新课程成功');
                this.$router.go(-1);
            });
        },

        addCourse() {
            const that = this;
            this.tagList.forEach((val) => {
                that.form.tagIdList.push(Number(val[0]));
            });
            const param = {
                id: this.form.id,
                name: this.form.name,
                icon: this.form.icon,
                category: Number(this.form.category),
                difficulty: Number(this.form.difficulty) + 1,
                producer: this.form.producer,
                description: this.form.description,
                credit: Number(this.form.credit),
                publicType: Number(this.form.publicType),
                recommend: Number(this.form.recommend),
                tagIdList: this.form.tagIdList,
            };
            api.courseadd(param).then(({ data }) => {
                this.$Message.success('创建课程成功');
                this.currentPage = true;
                this.params.courseId = data;
                this.saveText = '保存章节';
            });
        },

        saveCourseItem() {
            if (this.id) {
                // edit
                this.comparisonParams();
            }

            if (!this.validate()) return;
            api.saveCourseItem(this.params).then(() => {
                this.$Message.success('保存章节成功');
                this.$router.go(-1);
            });
        },

        comparisonParams() {
            const oldAddList = this.oldCourseItem;
            const newAddList = this.params.addList;

            const res = [];

            function screen(oldVal, newVal) {
                if (oldVal.title !== newVal.title) {
                    res.push({ id: oldVal.id, title: newVal.title });
                }

                const { lessonList: oldLessonList } = oldVal;
                const { lessonList: newLessonList } = newVal;

                newLessonList.forEach((v) => {
                    if (!v.id) return;
                    const old = oldLessonList.find(i => i.id === v.id);
                    const data = {};

                    ['period', 'resourceId', 'title', 'duration'].forEach((i) => {
                        if (v[i] !== old[i]) {
                            data[i] = v[i];
                            data.title = v.title;
                        }
                    });

                    if (Object.keys(data).length) {
                        res.push({ id: v.id, ...data });
                    }
                });
            }

            newAddList.forEach((v) => {
                if (v.id) {
                    screen(
                        oldAddList.find(i => i.id === v.id),
                        v,
                    );
                }
            });

            this.params.updateList = res;
        },

        validate() {
            const { addList } = this.params;

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < addList.length; i++) {
                if (!addList[i].title) {
                    this.$Message.error(`第${i + 1}章的章节标题为空`);
                    return false;
                }

                const { lessonList } = addList[i];

                // eslint-disable-next-line no-plusplus
                for (let j = 0; j < lessonList.length; j++) {
                    if (!lessonList[j].title) {
                        this.$Message.error(
                            `第${i + 1}章下第${j + 1}节的节标题为空`,
                        );
                        return false;
                    }
                    if (!lessonList[j].resourceId) {
                        this.$Message.error(
                            `第${i + 1}章下第${j + 1}节未选择资源`,
                        );
                        return false;
                    }
                    if (!lessonList[j].period) {
                        this.$Message.error(
                            `第${i + 1}章下第${j + 1}节未填写课时`,
                        );
                        return false;
                    }
                }
            }

            return true;
        },

        // onBeforeUpload(file) {
        //     return {
        //         file,
        //         resourceType: 1,
        //         uploadType: 1,
        //         fileType: 2,
        //     };
        // },

        // uploadEnd({ fileUrl }) {
        //     this.form.courseCoverUrl = fileUrl;
        //     this.$Message.success('上传成功');
        // },

        handleClickTab(name, index) {
            if (this.id) {
                this.currentPage = index;
                console.log(this.currentPage, '333');
            }
        },

        // handleChangeCourseCategory(value) {
        //     const { courseCategoryTree } = this;

        //     this.courseCategory = courseCategoryTree[value].children;
        // },

        handleAddChapter() {
            this.params.addList.push({
                id: null,
                title: '',
                lessonList: [],
            });
        },

        handleAddLession(index) {
            this.params.addList[index].lessonList.push({
                id: null,
                duration: '',
                period: '',
                resourceId: '',
                title: '',
                resourceName: '',
            });
        },

        handleSelectResource(data, { index, i }) {
            const info = this.params.addList[index].lessonList[i];

            this.$set(this.params.addList[index].lessonList, i, {
                ...info,
                resourceId: data.id,
                duration: data.length,
                resourceName: data.name,
                period: data.period,
            });
        },

        handleDelCourseResource(index, id, i) {
            if (!this.id || !id) {
                if (i === 0 || i) {
                    // 删除节
                    this.params.addList[index].lessonList.splice(i, 1);
                } else {
                    this.params.addList.splice(index, 1);
                }
                return;
            }
            // api.checkBeforeDelete({ id }).then(() => {
            if (i === 0 || i) {
                // 删除节
                this.params.addList[index].lessonList.splice(i, 1);
                if (this.id) {
                    this.params.deleteIdList.push(id);
                }
            } else {
                const data = this.params.addList.splice(index, 1);
                if (this.id) {
                    this.params.deleteIdList.push(
                        id,
                        ...data[0].lessonList.map(v => v.id),
                    );
                }
            }
            // });
        },
    },
};
</script>
<style lang="less">
.addcoursetype {
    .common-Type .ivu-select {
        width: 200px !important;
    }
}
.tagtjbq {
    color: #0088ff;
    display: inline-block;
    cursor: pointer;
}
.hp-newCourse-tagList li {
    position: relative;
    float: left;
    margin-right: 30px;
    height: 40px;
    line-height: 40px;
    padding: 0 5px;
    color: white;
    text-align: center;
    font-size: 14px;
    margin-top: 27px;
    cursor: pointer;
}
.hp-deleteBtn {
    position: absolute;
    top: -9px;
    right: -7px;
    cursor: pointer;
}
.hp-newCourse-tagList .tagActive {
    background-color: rgba(242, 242, 242, 1) !important;
    color: black !important;
}

.hp-newCourse-tagList li:nth-child(5n + 1) {
    background-color: #0088ff;
}

.hp-newCourse-tagList li:nth-child(5n + 2) {
    background-color: #845cee;
}

.hp-newCourse-tagList li:nth-child(5n + 3) {
    background-color: #ff4858;
}
.hp-newCourse-tagList li:nth-child(5n + 4) {
    background-color: #714c4c;
}
.hp-newCourse-tagList li:nth-child(5n) {
    background-color: #ffba00;
}
.flex-row() {
    display: flex;
    flex-flow: row;
    align-items: center;
}
.course-info {
    align-self: flex-start;

    .ivu-form-item:not(.add-resource) .ivu-form-item-label {
        color: #2b333b;
    }

    .ivu-form-item-content {
        .flex-row();
        .small {
            width: 120px;
        }
    }

    .add-resource .add {
        margin-left: 0;
    }

    .add {
        flex-shrink: 0;
        margin-left: 20px;
        color: #448aff;

        &:hover {
            cursor: pointer;
        }

        .ivu-icon {
            padding-right: 4px;
        }
    }

    .text {
        flex-shrink: 0;
        padding-left: 5px;
        font-size: 14px;
        color: #448aff;
    }
}
</style>
