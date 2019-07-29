<template>
    <div class="upload-wrap" :class="{'type-cover': !btn , 'type-btn': btn}">
        <img v-if="path && !btn" :src="path | getImg" class="upload-img">
        <i v-if="!path && !btn" class="el-icon-plus upload-icon"></i>
        <el-button v-if="btn" size="medium" type="primary">上传图片</el-button>
        <input type="file" :multiple="multiple" class="upload-inp" ref="uploadFile" @change="getFile">
    </div>
</template>

<script>
    import * as api from "@/utils/api"
    export default {
        props: {
            path: {
                type: String,
                default: ''
            },
            btn: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        model: {
            prop: "path",
            event: "change"
        },
        methods: {
            beforeCoverUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGIF = file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG && !isGIF) {
                    this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            getFile(file) {
                let files = file.target.files
                let self = this;
                for (let item of files) {
                    this.beforeCoverUpload(item)
                    let reader = new FileReader();
                    reader.readAsDataURL(item);
                    reader.onload = () => {
                        api.uploadImg({
                            base64: reader.result
                        }).then(({
                            data
                        }) => {
                            self.$emit('change', {
                                id: data.id,
                                path: data.path
                            })
                        })
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .upload-wrap {
        cursor: pointer;
        position: relative;
        overflow: hidden;
        display: flex;

        align-content: center;
        position: relative;

        &.type-cover {
            justify-content: center;
            width: 285px;
            height: 200px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;


            &:hover {
                border-color: #409EFF;
            }

            .upload-icon {
                font-size: 28px;
                color: #8c939d;
                width: 28px;
                height: 28px;
                line-height: 28px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .upload-img {
                width: 100%;
                height: 100%;
                display: block;
                object-fit: cover;
            }

        }

        &.type-btn {
            justify-content: end;
            justify-content: flex-end;
        }

        .upload-inp {
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }
</style>