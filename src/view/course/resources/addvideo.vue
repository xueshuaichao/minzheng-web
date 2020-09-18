<template>
    <page-edit
        :title="title"
        :save-text="saveText"
        @on-save="submit"
        @on-tab="handleClickTab"
    >
        <div class="common-form flex-row">
            <i-form
                ref="formValidate"
                :label-width="100"
                :model="formValidate"
                :rules="ruleValidate"
            >
                <form-item
                    label="文件类型"
                    prop="fileType"
                >
                    <Radio v-model="single">
                        视频
                    </Radio>
                </form-item>
                <form-item
                    label="所属分类"
                    prop="resourceCategoyId"
                    class="addcoursetype"
                >
                    <i-coursetype
                        v-model="formValidate.resourceCategoyId"
                        :categoycode="code"
                        @on-change="handleAreaChange"
                    />
                </form-item>
                <form-item
                    label="标签"
                    prop="contentLogo"
                >
                    <i-input v-model="formValidate.contentLogo" />
                </form-item>
                <form-item label="选择文件">
                    <page-upload-video
                        ref="upload"
                        :disabled="resourcesList.length > 9"
                        @on-end="onUploadEnd"
                        @on-upload-status="handleChangeStatus"
                    />
                    <div class="add-resource-list">
                        <div
                            v-for="(item, index) in resourcesList"
                            :key="item.videoId"
                            class="item flex-row"
                        >
                            <p class="file-name">
                                <Icon
                                    type="ios-folder"
                                    color="#71777D"
                                />
                                {{ item.name }}
                            </p>
                            <a @click="previewResource(item.videoId)">预览</a>
                            <a @click="handleReUpload(index)">重新上传</a>
                            <a @click="handleDelResource(index)">删除资源</a>
                        </div>
                    </div>
                </form-item>
            </i-form>
        </div>
        <preview-video
            ref="previewVideo"
            v-model="videoResourceUrl"
        />
    </page-edit>
</template>

<script>
import api from '@api/course';
import PreviewVideo from '@component/video/index.vue';
import Coursetype from '../../components/coursetype/index.vue';

export default {
    components: {
        'i-coursetype': Coursetype,
        PreviewVideo,
    },
    data() {
        return {
            videoResourceUrl: '',
            uploadStatus: false,
            resourcesList: [],
            tabvalue: '',
            tablist: [],
            tablist1: [],
            clickonce: 1,
            tabxslist: [],
            Tagsxs: '0',
            title: '上传视频',
            saveText: '保存',
            single: true,
            code: {
                courseType1: '',
                courseType2: '',
                courseType3: '',
                courseType4: '',
            },
            formValidate: {
                id: '',
                fileType: '1',
                type: '',
                resourceCategoyId: '',
                resources: [],
                contentLogo: '',
            },
            ruleValidate: {
                fileType: {
                    required: true,
                    message: '请选择文件类型',
                    trigger: 'blur',
                },
                resourceCategoyId: {
                    required: true,
                    validator: (rule, value, cb) => {
                        if (
                            this.formValidate.resourceCategoyId !== ''
                            && this.formValidate.resourceCategoyId !== undefined
                        ) {
                            cb();
                        } else {
                            cb(Error('请选择所属分类'));
                        }
                    },
                    // trigger: 'change',
                },
                contentLogo: [
                    {
                        required: true,
                        message: '标签不能为空',
                        trigger: 'blur',
                    },
                    {
                        required: true,
                        max: 4,
                        message: '标签最多可输入4字',
                        trigger: 'blur',
                    },
                ],
                resources: {
                    required: false,
                    type: 'array',
                    min: 1,
                    validator: (rule, value, cb) => {
                        if (value.length >= 1) {
                            cb();
                        } else {
                            cb(Error('请上传至少一个视频'));
                        }
                    },
                    trigger: 'change',
                },
            },
        };
    },

    mounted() {
        const { id } = this.$route.params;
        if (id) {
            this.formValidate.id = id;
            this.findById();
        }
    },

    methods: {
        findById() {
            api.findById({ id: this.formValidate.id }).then((res) => {
                const param = {
                    videoId: res.data.mediaId,
                    name: res.data.name,
                };
                const param1 = {
                    mediaId: res.data.mediaId,
                    name: res.data.name,
                };
                this.formValidate.resources.push(param1);
                this.resourcesList.push(param);
                this.formValidate.type = res.data.type;
                this.formValidate.resourceCategoyId = res.data.resourceCategoyId;
                this.formValidate.contentLogo = res.data.contentLogo;
                this.code.courseType1 = res.data.categoryList[0].id;
                this.code.courseType2 = res.data.categoryList[1].id;
                this.code.courseType3 = res.data.categoryList[2].id;
                this.code.courseType4 = res.data.categoryList[3].id;
            });
        },
        onUploadEnd({ file: { name }, videoId }) {
            this.resourcesList.push({ name, videoId });
        },
        handleChangeStatus(key = false) {
            this.uploadStatus = key;
        },
        previewResource(id) {
            return api.previewMedia({ videoId: id }).then(({ data: [url] }) => {
                this.videoResourceUrl = url;
                this.$refs.previewVideo.handleShow(this.videoResourceUrl);
            });
        },
        handleReUpload(index) {
            if (!this.uploadStatus) {
                this.handleDelResource(index);
                this.$refs.upload.handleClick();
            } else {
                this.$Message.error('请稍候，资源正在上传');
            }
        },
        handleDelResource(index) {
            this.resourcesList.splice(index, 1);
        },
        handleAreaChange([courseType1, courseType2, courseType3, courseType4]) {
            console.log(courseType1, courseType2, courseType3);
            this.formValidate.type = courseType1;
            this.formValidate.resourceCategoyId = courseType4;
            this.$refs.formValidate.validateField('resourceCategoyId');
        },
        submit() {
            this.formValidate.resources = this.resourcesList.map(v => ({
                mediaId: v.videoId,
                name: v.name,
            }));
            const formValidate = JSON.parse(JSON.stringify(this.formValidate));

            formValidate.type = +formValidate.type;
            formValidate.fileType = +formValidate.fileType;

            this.$refs.formValidate.validate((res) => {
                if (res && this.validate()) {
                    if (this.formValidate.id !== '') {
                        this.updataResource(formValidate);
                    } else {
                        this.saveResource(formValidate);
                    }
                }
            });
        },
        validate() {
            if (!this.resourcesList.length) {
                this.$Message.error('请至少上传一个资源');
                return false;
            }
            return true;
        },
        updataResource(formValidate) {
            api.updateResource(formValidate).then(() => {
                this.$Message.success('编辑成功');
                this.$router.go(-1);
            });
        },
        saveResource(formValidate) {
            api.saveResource(formValidate).then(() => {
                this.$Message.success('创建成功');
                this.$router.go(-1);
            });
        },
        handleClickTab() {},
    },
};
</script>
<style lang="less">
.addcoursetype {
    .common-Type .ivu-select {
        width: 200px !important;
    }
}
.add-resource-list {
    a {
        margin-left: 15px;
    }
}
</style>
<style lang="less" scoped></style>
