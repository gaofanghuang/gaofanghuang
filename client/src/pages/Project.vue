<template>
    <div class="project-wrap">

        <div class="project-banner">
            <h1>GaoFang Huang's Project</h1>
        </div>

        <ul class="project-list">
            <li class="project-item" v-for="(item, key) in list" :key="`project-${key}`">
                <div class="project-item-cover">
                    <img :src="item.cover" alt="cover">
                    <span class="qrcode-box"></span>
                </div>
                <div class="project-item-info">
                    <p class="project-item-name">{{ item.name }}</p>
                    <p class="project-item-describe">{{ item.describe }}</p>
                    <time class="project-item-time">{{ item.update }}</time>
                    <ul class="project-item-tags">
                        <li v-for="(tag, key2) in item.tags" :key="`project-tag-${key2}`">{{ tag }}</li>
                    </ul>
                    <ul class="project-item-platform">
                        <li v-if="item.ios"><span class="platform-name">ios</span></li>
                        <li v-if="item.android"><span class="platform-name">android</span></li>
                        <li v-if="item.wxapp"><span class="platform-name">微信小程序</span></li>
                        <li v-if="item.web"><span class="platform-name">web</span></li>
                    </ul>
                </div>
            </li>
        </ul>

        <button class="project-add" @click="addProject" v-if="dev">+</button>

        <transition name="fadeIn">
            <div v-if="showModal">
                <div class="modal-mask"></div>
                <div class="modal-box">
                    <div class="modal-title">添加项目</div>
                    <div class="modal-body">
                        <div class="form-entry">
                            <span class="form-label">项目封面</span>
                            <span class="form-input">
                                <input type="file" @change="getFile" />
                            </span>
                        </div>
                        <div class="form-entry">
                            <span class="form-label">项目名称</span>
                            <span class="form-input">
                                <input type="text" v-model="curItem.name" />
                            </span>
                        </div>
                        <div class="form-entry">
                            <span class="form-label">项目名称</span>
                            <span class="form-input">
                                <textarea v-model="curItem.describe" cols="30" rows="3"></textarea>
                            </span>
                        </div>
                        <div class="form-entry">
                            <span class="form-label">项目标签</span>
                            <span class="form-input">
                                <input type="text" v-model="curItem.tags" />
                            </span>
                        </div>
                        <div class="form-entry">
                            <span class="form-label">IOS</span>
                            <span class="form-input">
                                <input type="text" v-model="curItem.ios" />
                            </span>
                        </div>
                        <div class="form-entry">
                            <span class="form-label">Android</span>
                            <span class="form-input">
                                <input type="text" v-model="curItem.android" />
                            </span>
                        </div>
                        <div class="form-entry">
                            <span class="form-label">微信小程序</span>
                            <span class="form-input">
                                <input type="text" v-model="curItem.wxapp" />
                            </span>
                        </div>
                        <div class="form-entry">
                            <span class="form-label">Web</span>
                            <span class="form-input">
                                <input type="text" v-model="curItem.web" />
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-btn btn-cancel" @click="showModal = false">取消</button>
                        <button class="modal-btn btn-confirm" @click="saveProject">确定</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import * as api from "@/util/api";
    export default {
        data() {
            return {
                list: [],
                curItem: {
                    cover: "",
                    name: "",
                    describe: "",
                    tags: "",
                    ios: "",
                    android: "",
                    wxapp: "",
                    web: ""
                },
                showModal: false,
                dev: process.env.NODE_ENV !== "production"
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            addProject() {
                this.curItem = {
                    cover: "",
                    name: "",
                    describe: "",
                    tags: "",
                    ios: "",
                    android: "",
                    wxapp: "",
                    web: ""
                }
                this.showModal = true
            },
            getFile(file) {
                let _file = file.target.files[0]
                //判断是否是图片类型
                if (!/image\/\w+/.test(_file.type)) {
                    alert("只能选择图片");
                    return false;
                }
                let self = this;
                let reader = new FileReader();
                reader.readAsDataURL(_file);
                reader.onload = function (e) {
                    api.upload({
                        base64: this.result
                    }).then(({
                        data
                    }) => {
                        self.curItem.cover = `${api.baseURL}/uploads/${data.id}`
                    })
                }
            },
            saveProject() {
                let params = this.curItem
                let dateTime = new Date().getTime();
                if (!this.curItem.id) {
                    params.id = dateTime
                }
                params.lasttime = dateTime
                api.saveProject(params).then(({
                    data
                }) => {
                    console.log(data)
                    this.showModal = false
                })
            },
            getList() {
                api.getProject().then(({
                    data
                }) => {
                    data.map((item) => {
                        item.tags = item.tags.split(",")
                    })
                    this.list = data
                })
            }
        }
    }
</script>


<style lang="scss">

    .app-content.is-pc {
        width: 100%;
    }
    .project-banner {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 240px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        background: linear-gradient(0deg, #23cca9, #23bed5);
        z-index: 1;
    }

    .project-add {
        width: 80px;
        height: 80px;
        background: linear-gradient(0deg, #23cca9, #23bed5);
        color: #fff;
        border-radius: 50%;
        position: fixed;
        right: 20px;
        bottom: 100px;
        z-index: 3;
        font-size: 48px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
        transition: 0.4s ease-in;
        cursor: pointer;
    }

    .project-add:hover {
        transform: rotate(180deg);
        box-shadow: none;
    }

    .project-banner h1 {
        display: block;
    }

    .project-list {
        position: relative;
        z-index: 2;
        width: 100%;
        min-height: calc(100vh - 240px);
        margin-top: 240px;
        background: #f5f5f5;
        color: #666;
        column-count: 6;
        column-gap: 30px;
        padding: 10px;
    }

    .is-mobile .project-list {
        column-count: 2;
    }

    .project-item {
        padding: 10px;
        background: #fff;
        border: 1px solid #fff;
        border-radius: 4px;
        margin-bottom: 20px;
        font-size: 20px;
        color: #999;
        break-inside: avoid;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
        transition: 0.2s ease-in;
        cursor: pointer;
        position: relative;
    }

    .project-item:hover {
        border: 1px solid #eee;
        box-shadow: none;
    }

    @media screen and (max-width: 1920px) {
        .project-item {
            margin-bottom: 40px;
        }
    }

    @media screen and (max-width: 1440px) {
        .project-item {
            margin-bottom: 20px;
        }
    }

    .project-item-cover {
        margin-bottom: 10px;
        position: relative;
    }

    .project-item-info {
        position: relative;
    }

    .project-item-name {
        font-size: 30px;
        color: #666;
    }

    .project-item-time {
        position: absolute;
        top: 0;
        right: 0;
    }

    .project-item-describe {
        word-wrap: break-word;
        margin-top: 10px;
    }

    .project-item-tags {
        margin-top: 10px;
    }

    .project-item-tags>li {
        display: inline-block;
        padding: 8px 20px;
        border: 1px solid #eee;
        border-radius: 8px;
        margin-right: 4px;
        transition: 0.2s ease-in;
        margin-bottom: 10px;
    }

    .project-item-tags>li:hover {
        border: 1px solid #d2d2d2;
    }

    .project-item-platform {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        padding-bottom: 10px;
    }

    .project-item-platform>li {
        display: block;
        text-align: center;
    }

    .qrcode-box {
        display: none;
        width: 200px;
        height: 200px;
        background: #e2e2e2;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .modal-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.48);
        z-index: 4;
    }

    .modal-box {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 4;
        width: 1000px;
        height: 1120px;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
        padding: 32px;
    }

    .modal-footer {
        text-align: center;
    }

    .modal-btn {
        border: none;
        border-radius: 8px;
        padding: 16px 32px;
        cursor: pointer;
        transition: 0.2s ease-in;
    }

    .modal-btn+.modal-btn {
        margin-left: 20px;
    }

    .btn-cancel {
        background: #e9e9e9;
        color: #666;
    }

    .btn-cancel:hover {
        background: #d9d9d9;
    }

    .btn-confirm {
        background: #23bed5;
        color: #fff;
    }

    .btn-confirm:hover {
        background: #30adbf;
    }

    .modal-title {
        padding-bottom: 20px;
        text-align: center;
        font-size: 28px;
    }

    .form-entry {
        display: flex;
        margin-bottom: 40px;
    }

    .form-label {
        display: block;
        width: 180px;
        font-size: 16px;
        height: 72px;
        line-height: 72px;
    }

    .form-input {
        display: block;
        width: 100%;
        border-radius: 8px;
        min-height: 72px;
        border: 1px solid #d2d2d2;
        overflow: hidden;
    }

    .form-input input,
    .form-input textarea {
        padding: 12px;
    }
</style>