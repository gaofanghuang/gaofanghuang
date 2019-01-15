<template>
    <div class="edit-wrap">
        <!-- 编辑框 -->
        <transition-group name="fadeIn" tag="div" class="edit-content" :class="{'is-mobile': browser.isMobile}">
            <textarea class="edit-input" key="编辑框" v-show="!browser.isMobile || !isPreview" v-model="content"></textarea>
            <div class="edit-view markdown-view" key="预览框" v-show="isPreview" v-html="compiledMarkdown"></div>
        </transition-group>
        <!-- 底部栏 -->
        <div class="edit-footer">
            <div class="edit-upload-img">
                <Upload @file="insetImg" />
            </div>
            <div class="edit-tags">
                <ul class="edit-tags-list" v-if="tags.length > 0">
                    <li class="edit-tags-item" @click="deleteTag(index)" v-for="(item, index) in tags" :key="`${item}-${index}`">
                        {{ item }}
                    </li>
                </ul>
                <input class="edit-tags-input" @keyup.enter="addTag" type="text" placeholder="这里输入标签" v-model="tag">
            </div>
            <span class="edit-preview" v-if="browser.isMobile" @click="isPreview = !isPreview">{{ isPreview ?
                'MD' : 'View' }}</span>
        </div>
    </div>
</template>

<script>
    import Hljs from 'highlight.js';
    import marked from 'marked';
    import * as api from "@/util/api";
    import bus from "@/bus.js";
    import Upload from "@/components/Upload"

    export default {
        data() {
            return {
                content: "",
                tags: [],
                tag: "",
                isPreview: true,
                fetching: false
            }
        },
        computed: {
            compiledMarkdown() {
                marked.setOptions({
                    renderer: new marked.Renderer(),
                    gfm: true,
                    tables: true,
                    breaks: false,
                    pedantic: false,
                    sanitize: true,
                    smartLists: true,
                    smartypants: false,
                    highlight: function (code) {
                        return Hljs.highlightAuto(code).value
                    }
                })
                return marked(this.content, {
                    sanitize: true
                })
            },
            isEdit() {
                return this.$route.path.includes('edit')
            },
            id() {
                return this.$route.params.id;
            },
            isProgress() {
                return this.$store.state.isProgress
            },
            browser() {
                return this.$store.state.browser
            }
        },
        components: {
            Upload
        },
        watch: {
            $route(newPath) {
                if (newPath.path.includes("add")) {
                    this.content = ""
                    this.tags = []
                    this.tag = ""
                } else {
                    this.getInfo()
                }
            }
        },
        mounted() {
            if (this.isEdit) {
                this.getInfo()
            }

            if (this.browser.isMobile) {
                this.isPreview = false
            }
            bus.$on("saveInfo", () => {
                this.doSave()
            })
        },
        destroyed() {
            bus.$off('changeTitle')
            bus.$off('saveInfo')
        },
        methods: {
            getInfo() {
                api.getInfo({
                    id: this.id
                }).then(({
                    data
                }) => {
                    this.content = data.content
                    this.tags = data.tags
                })
            },
            addTag() {
                console.log('添加标签');
                if (!this.tag) {
                    return;
                }
                this.tags.push(this.tag);
                this.tag = '';
            },
            deleteTag(i) {
                console.log('删除标签');
                this.tags.splice(i, 1);
            },
            insetImg(i) {
                let imgPath = ''
                if (process.env.NODE_ENV === "production") {
                    imgPath = `https://github.com/gaofanghuang/gaofanghuang/raw/master/server/public/uploads/${i}`
                } else {
                    imgPath = `${api.baseURL}/uploads/${i}`
                }
                let mdCode = `![${i}](${imgPath})`
                this.content += mdCode
            },
            doSave() {
                console.log('保存文章');
                if (!this.content || this.fetching) {
                    return
                }
                this.fetching = true
                this.$store.commit("ToggleProgress", true);
                let dateTime = new Date().getTime();

                // 标题取自第一个 # 
                let reg = /(#+)[^\n]*?\n/g;
                let title = this.content.match(reg) !== null ? this.content.match(reg)[0] : '';
                if (title) {
                    title = title.substring(2).substring(-1)
                }

                // 简介取自第一个 >
                let reg2 = /(>+)[^\n]*?\n/g;
                let summary = this.content.match(reg2) !== null ? this.content.match(reg2)[0] : '';
                if (summary) {
                    summary = summary.substring(2).substring(-1)
                }

                let params = {
                    id: this.isEdit ? this.id : dateTime,
                    title,
                    summary,
                    tags: this.tags,
                    content: this.content,
                    lasttime: dateTime
                }
                api.saveItem(params).then(({
                    data
                }) => {
                    setTimeout(() => {
                        // Tips: 实际上不需要延迟，但是服务端也在本地的话响应速度太快，加600m才能看到进度条动画
                        this.$store.commit("ToggleProgress", false);
                        this.fetching = false
                    }, 600);
                    if (!this.isEdit) {
                        this.$router.replace(`/edit/${data.id}`)
                    }
                    console.log(data)
                }).catch(()=> {
                    this.fetching = false
                })
            }
        }
    }
</script>


<style lang="scss">
    .edit-wrap {
        // .edit-header {
        //     position: fixed;
        //     top: 0;
        //     left: 0;
        //     width: 100%;
        //     height: 90px;
        //     display: flex;
        //     align-items: center;
        //     justify-content: space-between;
        //     border-bottom: 1px solid #eeeeee;
        //     background: #ffffff;
        //     padding: 0 20px;
        //     box-shadow: 0 0 12px rgba($black, 0.18);
        // }

        // .edit-title {
        //     width: 50%;
        //     height: 100%;

        //     input {
        //         color: #666;
        //         font-size: 30px;
        //         font-weight: 600;
        //         letter-spacing: 4px;

        //         &::-webkit-input-placeholder {
        //             color: #d2d2d2;
        //         }
        //     }
        // }

        // .edit-save {
        //     display: inline-block;
        //     padding: 1Px;
        //     width: 120px;
        //     height: 60px;
        //     border-radius: 30px;
        //     cursor: pointer;
        //     transition: 0.2s ease-out;
        //     font-size: 24;
        //     font-weight: 100;
        //     display: flex;
        //     align-items: center;
        //     justify-content: center;
        //     background: $white;
        //     color: $primary;
        //     border: 1Px solid $primary;
        //     box-shadow: 0 6px 12px rgba($primary, 0.18);

        //     &:hover {
        //         background: linear-gradient(90deg, $primary, $green);
        //         color: $white;
        //         box-shadow: none;
        //     }
        // }

        .edit-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 68px;
            background: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            border-top: 1Px solid #eee;

            .icon {
                font-size: 36px;
            }

            .edit-upload-img {
                cursor: pointer;
            }

            .edit-preview {
                width: 50px;
                font-size: 24px;
                color: $gray2;
            }
        }


        .edit-tags {
            display: flex;
            height: 100%;
            flex-wrap: nowrap;
            align-items: center;
        }

        .edit-tags-list {
            max-width: 1200px;
            white-space: nowrap;
            overflow-x: auto;
            @include scroll-bar($active);
        }

        .edit-tags-input {
            background: none;
            width: 200px;
            padding-left: 20px;
            font-size: 24px;

            &::-webkit-input-placeholder {
                color: #d2d2d2;
            }
        }

        .edit-tags-item {
            display: inline-block;
            font-size: 24px;
            color: #999;
            background: #fff;
            border-left: 3px solid rgba($primary, 0.38);
            margin-right: 20px;
            padding: 3px 12px;
            border-radius: 4px;
            cursor: pointer;
            transition: 0.2s;

            &:hover {
                border-left: 3px solid rgba($active, 0.48);
            }
        }

        .edit-content {
            width: 100%;
            height: 100vh;
            padding: 0 0 68px 0;
            display: flex;

            &.is-mobile {
                display: block;

                .edit-view,
                .edit-input {
                    width: 100%;
                }
            }
        }

        .edit-view {
            width: 50%;
            height: 100%;
            background: #fff;
            padding: 20px 40px;
            overflow-y: auto;
            @include scroll-bar($active);
        }

        .edit-input {
            display: block;
            width: 50%;
            height: 100%;
            background: #f9f9f9;
            border-right: 1Px solid #eee;
            padding: 20px 40px;
            font-size: 30px;
            color: #666;
            resize: none;
            letter-spacing: 1px;
            @include scroll-bar($active);
        }
    }

    .is-mobile {
        .edit-tags-list {
            width: 300px;
        }
    }
</style>