<template>
    <Transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
        <div class="project-wrap">
            <div class="project-banner">
                <p>这里是banner</p>
                <!-- <img src="" alt=""> -->
                <div class="project-nav flex">
                    <button @click="goTo('/')">Home</button>
                    <button class="active" @click="goTo('/project')">Project</button>
                    <button @click="goTo('/blog')">Blog</button>
                    <button @click="goTo('/about')">About</button>
                </div>
            </div>
            <div class="project-content">
                <div class="project-category" v-for="(item, key) in project" :key="`project-${item.category}-${key}`">
                    <div class="project-category-name">{{ item.category }}</div>
                    <div class="project-list flex">
                        <template v-if="item.type === 'pc'">
                            <div class="project-item" v-for="(item2, key2) in item.list" :key="`project-item-${key2}`">
                                <a :href="item2.url">
                                    <div class="project-cover">
                                        <img :src="item2.cover" alt="">
                                        <time
                                            class="project-date">{{ item2.lasttime | formatDate('yyyy/MM/dd') }}</time>
                                    </div>
                                    <p class="project-name">{{ item2.name }}</p>
                                    <p class="project-descript">{{ item2.descript }}</p>
                                </a>
                            </div>
                        </template>
                        <template v-if="item.type === 'app'">
                            <div class="project-item project-item-type-app" v-for="(item2, key2) in item.list"
                                :key="`project-item-${key2}`">
                                <a :href="item2.url">
                                    <div class="project-cover">
                                        <img :src="item2.cover" alt="">
                                    </div>
                                    <p class="project-name">{{ item2.name }}</p>
                                    <p class="project-descript">{{ item2.descript }}</p>
                                    <div class="project-item-hover">
                                        <img src="" alt="">
                                    </div>
                                </a>
                            </div>
                        </template>
                    </div>
                </div>
            </div>

            <button class="project-add" @click="addProject" v-if="dev"></button>

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
                                <span class="form-label">项目简介</span>
                                <span class="form-input">
                                    <textarea v-model="curItem.describe" cols="30" rows="3"></textarea>
                                </span>
                            </div>
                            <div class="form-entry">
                                <span class="form-label">项目标签</span>
                                <span class="form-input form-input-tag">
                                    <ul class="edit-tags-list" v-if="curItem.tags.length > 0">
                                        <li class="edit-tags-item" @click="deleteTag(index)"
                                            v-for="(item, index) in curItem.tags" :key="`${item}-${index}`">
                                            {{ item }}
                                        </li>
                                    </ul>
                                    <input type="text" @keyup.enter="addTag" placeholder="这里输入标签" v-model="tag" />
                                </span>
                            </div>
                            <!-- <div class="form-entry">
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
                            </div> -->
                        </div>
                        <div class="modal-footer">
                            <button class="modal-btn btn-cancel" @click="showModal = false">取消</button>
                            <button class="modal-btn btn-confirm" @click="saveProject">确定</button>
                        </div>
                    </div>
                </div>
            </transition>

        </div>

    </Transition>
</template>

<script>
    import * as api from "@/util/api";
    import QRCode from "qrcode";
    export default {
        data() {
            return {
                project: [{
                    category: 'PC Web',
                    type: 'pc',
                    list: [{
                        cover: '111.png',
                        name: 'XXX',
                        url: 'http://www.huanggaofang.com',
                        descript: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
                        lasttime: 1546913540570
                    }]
                }, {
                    category: 'Mobile App',
                    type: 'app',
                    list: [{
                        cover: '111.png',
                        name: 'XXX',
                        platform: [{
                            client: 'h5',
                            path: 'http://www.huanggaofang.com'
                        }],
                        url: 'http://www.huanggaofang.com',
                        descript: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
                        lasttime: 1546913540570
                    }]
                }, {
                    category: 'Design',
                    type: 'image',
                    list: []
                }, {
                    category: 'Paint',
                    type: 'image',
                    list: []
                }, {
                    category: 'Vlog',
                    type: 'video',
                    list: []
                }],
                qrcodeUrl: "",
                tag: "",
                showModal: false,
                dev: process.env.NODE_ENV !== "production"
            }
        },
        mounted() {

        },
        methods: {
            goTo(path) {
                this.$router.push(path)
            },
            addProject() {
                this.curItem = {
                    cover: "",
                    name: "",
                    describe: "",
                    tags: [],
                    ios: "",
                    android: "",
                    wxapp: "",
                    web: ""
                }
                this.showModal = true
            },
            editProject(item) {
                this.curItem = item
                this.showModal = true
            },
            addTag() {
                console.log('添加标签');
                if (!this.tag) {
                    return;
                }
                this.curItem.tags.push(this.tag);
                this.tag = '';
            },
            deleteTag(i) {
                console.log('删除标签');
                this.curItem.tags.splice(i, 1);
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
                    this.list = data
                })
            },
            showQrcode(url) {
                this.qrcodeUrl = url
                setTimeout(() => {
                    this.useqrcode(url)
                }, 300);
            },
            hiddenQrcode() {
                this.qrcodeUrl = ""
            },
            useqrcode(url) {
                //生成的二维码内容，可以添加变量
                let canvas = document.getElementById("canvas");
                QRCode.toCanvas(canvas, url, {
                    width: 100
                }, function (error) {
                    if (error) {
                        console.error(error);
                    } else {
                        // console.log("success!");
                    }
                });
            },
            deleteProject(item) {
                let params = {
                    id: item.id
                }
                api.deleteProject(params).then(({
                    data
                }) => {
                    this.getList()
                })
            },
            goToTag(tag) {
                this.$router.push(`/tag/${tag}`)
            }
        }
    }
</script>


<style lang="scss">
    .project-wrap {
        .project-banner {
            min-height: 420px;
            background: #efefef;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999999;
            position: relative;
        }

        .project-nav {
            position: absolute;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0.68;

            button {
                color: #999999;
                cursor: pointer;
                padding: 6px 10px;
                border: 1Px solid #999999;
                border-radius: 9px;

                &:hover {
                    color: $primary;
                    border: 1Px solid $primary;
                }
            }

            button+button {
                margin-left: 60px;
            }

            .active {
                border: none;
                background: linear-gradient(45deg, $green, $primary);
                color: #ffffff;

                &:hover {
                    color: #ffffff;
                    border: none;
                }
            }
        }

        .project-content {
            padding: 20px 4vw;
        }

        .project-category {
            margin-top: 48px;
        }

        .project-list {
            flex-wrap: wrap;
        }

        .project-item {
            background: #ffffff;
            width: 400px;
            padding: 10px;
            margin-right: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 8px #f2f2f2, 0 3px 3px #d9d9d9;
            transition: 0.2s;
            cursor: pointer;

            &:hover {
                box-shadow: none;
            }
        }

        .project-category-name {
            margin-bottom: 20px;
            color: #999999;
            font-size: 32px;
            font-weight: 600;
        }

        .project-cover {
            width: 380px;
            height: 320px;
            background: #EFEFEF;
        }

        .project-name {
            font-size: 28px;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .project-descript {
            font-size: 24px;
            word-wrap: wrap;
            word-break: break-all;
        }

        .project-item-type-app {

            position: relative;

            .project-item-hover {
                display: none;
            }

            &:hover {
                .project-item-hover {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    width: 380px;
                    height: 320px;
                    background: rgba($color: #000000, $alpha: 0.2);
                    display: block;
                }
            }
        }

        .project-date {
            font-size: 24px;
        }

        .project-add {
            width: 80px;
            height: 80px;
            background: linear-gradient(45deg, $green, $primary);
            color: #fff;
            border-radius: 50%;
            position: fixed;
            right: 20px;
            bottom: 100px;
            z-index: 3;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
            transition: 0.4s ease-in;
            cursor: pointer;

            &::before {
                position: fixed;
                right: 40px;
                bottom: 138px;
                z-index: 3;
                content: "";
                width: 40px;
                height: 2Px;
                background: #ffffff;
            }

            &::after {
                position: fixed;
                right: 58px;
                bottom: 120px;
                z-index: 3;
                content: "";
                width: 2Px;
                height: 40px;
                background: #ffffff;
            }

            &:hover {
                background: linear-gradient(45deg, #fbc8e9, $primary);
                box-shadow: none;
            }
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
            height: 1000px;
            transform: translate(-50%, -50%);
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
            padding: 32px;
        }

        .modal-body {
            height: 720px;
            margin-bottom: 40px;
            overflow-y: auto;

            &::-webkit-scrollbar {
                display: none;
            }
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
            background: #f2f2f2;
            color: #666;
        }

        .btn-cancel:hover {
            background: #e9e9e9;
        }

        .btn-confirm {
            background: linear-gradient(45deg, $green, $primary);
            color: #fff;
        }

        .btn-confirm:hover {
            background: linear-gradient(45deg, #fbc8e9, $primary);
        }

        .modal-title {
            padding-bottom: 20px;
            text-align: center;
            font-size: 36px;
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

        .form-input-tag {
            display: flex;

            .edit-tags-list {
                display: flex;
                align-items: center;
                padding-left: 10px;
            }

            .edit-tags-item {
                display: inline-block;
                height: 48px;
                line-height: 48px;
                background: #f2f2f2;
                color: #666;
                padding: 0 10px;
                font-size: 24px;
                border-radius: 8px;
                cursor: pointer;

                &+.edit-tags-item {
                    margin-left: 12px;
                }
            }

            .edit-tags-item:hover {
                background: #e5e5e5;
            }

            input {
                width: 240px;
                font-size: 20px;
            }
        }
    }
</style>