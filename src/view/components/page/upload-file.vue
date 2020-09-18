<template>
    <div class="upload-img-wrapper flex-row">
        <template v-if="img">
            <div
                class="upload-btn mar-r-20"
                @click="handleClick"
            >
                <Icon
                    type="md-camera"
                    color="#DCDFE6"
                    size="40"
                />
                <div class="label">
                    点击上传
                </div>
                <loading v-model="loading" />
            </div>
            <div class="preview-img upload-btn">
                <img
                    v-if="imgSrc != ''"
                    :src="imgSrc"
                    alt=""
                >
                <div class="label">
                    示例图
                </div>
            </div>
            <p
                class="mar-l-20"
                style="color: #71777d"
            >
                请上传JPG或PNG格式图片，大小不超过200M
            </p>
        </template>
        <template v-if="file">
            <i-button
                class="upload-file"
                :loading="loading"
                @click="handleClick"
            >
                上传文件
            </i-button>
        </template>
        <input
            v-show="false"
            ref="file"
            type="file"
            :accept="accept"
            @change="change"
        >
    </div>
</template>

<script>
import { clientUpload } from '@libs/upload.js';
import Loading from './loading.vue';

export default {
    name: 'UploadImg',

    components: {
        Loading,
    },

    model: {
        prop: 'imgSrc',
    },

    props: {
        img: {
            type: Boolean,
            default: false,
        },

        file: {
            type: Boolean,
            default: false,
        },

        imgSrc: {
            type: String,
            default: '',
        },

        accept: {
            type: String,
            default: 'image/*',
        },

        onBeforeUpload: {
            type: Function, // Function | Promise
            default() {
                return {
                    file: '', // file Object
                    resourceType: 1, // 资源类别：1.课程资源，2.政策解读，3.公告分类，4.政策法规，5.网站banner
                    uploadType: 1, // 上传类型：1.上传，2.重传
                    fileType: 2, // 文件格式类型：1.视频，2.图片，3.音频，4.文档
                };
            },
        },
    },

    data() {
        return {
            loading: false,
        };
    },

    methods: {
        handleClick() {
            this.$refs.file.click();
        },

        change(e) {
            const { onBeforeUpload } = this;
            const file = Array.prototype.slice.call(e.target.files)[0];
            const filePath = file.name;
            const fileType = filePath
                .substr(filePath.lastIndexOf('.') + 1)
                .toLowerCase();
            if (fileType === 'pdf') {
                if (file.size > 500 * 1024 * 1024) {
                    this.$Message.info('不超过500M');
                    return;
                }
            }

            if (this.img && fileType !== 'jpg' && fileType !== 'png') {
                this.$Message.error('请上传JPG或PNG格式图片，大小不超过200M');
                return;
            }

            const beforeUpload = onBeforeUpload && onBeforeUpload(file);

            if (beforeUpload.then) {
                onBeforeUpload.then((res) => {
                    this.upload(res);
                });
            } else {
                this.upload(beforeUpload);
            }
            this.$refs.file.value = null;
        },
        cancelupload() {
            this.loading = false;
        },
        upload(data) {
            this.loading = true;
            clientUpload
                .upload(data)
                .then(({ data }) => {
                    this.loading = false;
                    this.$emit('on-end', data);
                    this.$emit('input', data.fileUrl);
                    this.$refs.file.value = null;
                })
                .catch(() => {
                    this.loading = false;
                    // this.$Message.error(`${message}`);
                });
        },
    },
};
</script>

<style lang="less">
.upload-img-wrapper {
    & > div {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 4px;
        border: 1px solid rgba(220, 223, 230, 1);
    }

    .upload-btn {
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: center;
        text-align: center;
        .label {
            position: absolute;
            bottom: 0;
            display: none;
            width: 100%;
            height: 27px;
            line-height: 27px;
            text-align: center;
            font-size: 12px;
            color: #71777d;
            background: rgba(243, 243, 243, 1);
            border-radius: 3px;
        }

        &:hover {
            .label {
                display: block;
                cursor: pointer;
            }
        }
    }

    .preview-img {
        padding: 4px;
        img {
            width: 90px;
            height: 90px;
        }
        .label {
            background: none;
        }
    }

    .upload-file {
        color: #2b333b;
        border: 1px solid rgba(220, 223, 230, 1);
    }
}
</style>
