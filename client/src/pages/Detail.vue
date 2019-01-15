<template>
    <LoadMore ref="loadmore" :showBottom="false" class="detail-wrap" @onRefresh="onRefresh">
        <article class="detail-view markdown-view" v-html="compiledMarkdown"></article>
        <!-- 更新日期 -->
        <time class="detail-update">
            <Icon type="shijian" />{{ lasttime | time2tips }}</time>
        <!-- 文章标签 -->
        <ul class="article-tags" v-if="tags.length > 0">
            <li class="article-tag article-tag-icon">
                <Icon type="biaoqian" />
            </li>
            <li class="article-tag" @click="handleTag(item)" v-for="(item, index) in tags" :key="`tags-${id}-${item}-${index}`">
                {{ item }}
            </li>
        </ul>
        <!-- 文章上下篇 -->
        <ul class="article-page">
            <li class="article-page-prev"><span v-if="hasPrev" @click="goPrev">上一篇</span></li>
            <li class="article-page-next"><span v-if="hasNext" @click="goNext">下一篇</span></li>
        </ul>
        <!-- 文章菜单 -->
        <transition name="leftSwipe">
            <div class="detail-menu" v-dom-portal="`.app-content`" v-if="menuToggle" @click="menuToggle = false">
                <p>目录</p>
                <ul>
                    <li class="detail-menu-item" :class="`menu-${item.level}`" v-for="(item, index) in menu" :key="`menu-${item.text}-${index}`">
                        <a :href="`${path}#${item.anchorName}`">
                            {{ item.text }}
                        </a>
                    </li>
                </ul>
            </div>
        </transition>
        <!-- 来必力评论 -->
        <div id="lv-container" data-id="city" data-uid="MTAyMC80MjAyMy8xODU3MA=="></div>
    </LoadMore>
</template>

<script>
    import Hljs from 'highlight.js'
    import marked from 'marked'
    import pinyin from 'pinyin'
    import * as api from "@/util/api"
    import bus from "@/bus.js"
    const noop = () => {};

    export default {
        data() {
            return {
                title: "",
                content: "",
                tags: [],
                menu: [],
                lasttime: "",
                fetching: false,
                menuToggle: false,
                path: this.$route.path,
                hasNext: true,
                hasPrev: true
            }
        },
        computed: {
            compiledMarkdown() {
                let self = this
                let renderer = new marked.Renderer()
                renderer.heading = function (text, level) {
                    if (level === 1) {
                        return `<h1>${text}</h1>`
                    } else if (level > 1) {
                        let anchorName = pinyin(text, {
                            style: pinyin.STYLE_NORMAL
                        }).join('')
                        anchorName = anchorName.replace(/\//g, '-')
                        let item = {
                            text,
                            anchorName,
                            level
                        }
                        self.menu.push(item)
                        let _h = `<h${level} id="${anchorName}"><a href="#${anchorName}">${text}</a></h${level}>`
                        return _h
                    }
                }
                marked.setOptions({
                    renderer: renderer,
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
            id() {
                return this.$route.params.id;
            },
            isProgress() {
                return this.$store.state.isProgress
            },
            browser() {
                return this.$store.state.browser
            },
            list() {
                return this.$store.state.list
            }
        },
        watch: {
            id() {
                this.onRefresh()
            },
            menuToggle() {
                if (this.menuToggle && this.browser.isMobile) {
                    document.querySelector('body').style = "overflow: hidden;"
                } else {
                    document.querySelector('body').style = ""
                }
            }
        },
        mounted() {

            bus.$on("handleMore", () => {
                this.showMore()
            })

            bus.$on("handleMenu", () => {
                this.showMenu()
            })

            this.onRefresh()

            // 来必力评论
            setTimeout(() => {
                (function (d, s) {
                    var j, e = d.getElementsByTagName(s)[0];

                    if (typeof LivereTower === 'function') {
                        return;
                    }

                    j = d.createElement(s);
                    j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
                    j.async = true;

                    e.parentNode.insertBefore(j, e);
                })(document, 'script');
            }, 600);
        },
        beforeDestroy() {
            if (this.menuToggle) {
                console.log("销毁Menu")
                let detailMenu = document.querySelector(".detail-menu")
                detailMenu.parentNode.removeChild(detailMenu)
            }
        },
        destroyed() {
            bus.$off('handleMore')
            bus.$off('handleMenu')
        },
        methods: {
            onRefresh(callback = noop) {
                if (this.fetching) {
                    return
                }
                this.fetching = true
                this.$store.commit("ToggleProgress", true);
                api.getInfo({
                    id: this.id
                }).then(({
                    data
                }) => {
                    setTimeout(() => {
                        // Tips: 实际上不需要延迟，但是服务端也在本地的话响应速度太快，加600m才能看到进度条动画
                        this.$store.commit("ToggleProgress", false);
                        this.fetching = false
                    }, 600);
                    this.title = data.title
                    let _content = data.content
                    if (process.env.NODE_ENV === 'production') {
                        _content = _content.replace(/http:\/\/localhost:9000/g,
                            "https://raw.githubusercontent.com/gaofanghuang/gaofanghuang/master/serve/public"
                        );
                    }
                    this.content = _content
                    this.tags = data.tags
                    this.lasttime = data.lasttime
                    document.title = this.title
                    callback(true);
                }).catch(() => {
                    this.$router.push(`/home`)
                })
            },
            showMore() {
                const actions = [];
                actions.push({
                    text: "回到首页",
                    method: () => {
                        this.$router.push(`/home`)
                    }
                });
                actions.push({
                    text: "编辑",
                    method: () => {
                        console.log("编辑这篇文章", this.id)
                        this.$router.push(`/edit/${this.id}`)
                    }
                });
                actions.push({
                    text: "删除",
                    method: () => {
                        console.log("删除这篇文章", this.id)
                        api.deleteItem({
                            id: this.id
                        }).then(({
                            data
                        }) => {
                            this.isDelete = true
                        })
                    }
                });

                bus.$emit("actionSheet", actions, "取消");
            },
            showMenu() {
                this.menuToggle = !this.menuToggle
            },
            handleTag(item) {
                this.$router.push(`/tag/${item}`)
            },
            goPrev() {
                console.log('打开上一篇')
                let prevId = ''
                for (let i in this.list) {
                    if (this.id === this.list[i].id) {
                        let n = Number(i) - Number(1)
                        if (n === 0) {
                            this.hasPrev = false
                        } else {
                            this.hasNext = true
                        }
                        prevId = this.list[n].id
                    }
                }
                this.$router.push(`/detail/${prevId}`)
            },
            goNext() {
                console.log('打开下一篇')
                let nextId = ''
                for (let i in this.list) {
                    if (this.id === this.list[i].id) {
                        let n = Number(i) + Number(1)
                        if (n === this.list.length - 1) {
                            this.hasNext = false
                        } else {
                            this.hasPrev = true
                        }
                        nextId = this.list[n] === undefined ? '' : this.list[n].id
                    }
                }
                this.$router.push(`/detail/${nextId}`)
            }
        }
    }
</script>

<style lang="scss">
    .detail-view {
        // min-height: 100vh;
        background: #fff;
        padding: 20px;
    }

    .is-pc {
        .detail-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 320px;
            height: 100%;
            background: $white;
            font-size: 24px;
            padding: 120px 20px 20px 20px;

            p {
                margin-bottom: 20px;
                font-weight: 600;
            }

            .detail-menu-item {
                margin-bottom: 20px;

                a {
                    transition: 0.2s;

                    &:hover {
                        color: $primary;
                    }
                }
            }

            .menu-3 {
                padding-left: 20px;
            }

            .menu-4 {
                padding-left: 40px;

                &+.menu-2 {
                    margin-top: 20px;
                }
            }
        }
    }

    .is-mobile {
        .detail-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: $white;
            font-size: 36px;
            padding: 120px 20px 20px 20px;

            p {
                margin-bottom: 20px;
                font-weight: 600;
            }

            .detail-menu-item {
                margin-bottom: 20px;

                a {
                    display: block;
                    padding: 20px 0;
                    transition: 0.2s;

                    &:hover {
                        color: $primary;
                    }
                }
            }

            .menu-3 {
                padding-left: 20px;
            }
            .menu-4 {
                padding-left: 40px;

                &+.menu-2 {
                    margin-top: 20px;
                }
            }
        }
    }

    .detail-wrap {
        .article-tags {
            margin-top: 80px;
            margin-bottom: 80px;
            color: #999;
            font-size: 24px;
            align-items: center;
            padding: 0 10px;

            .article-tag {
                display: inline-block;
                margin-right: 24px;
                cursor: pointer;
                transition: 0.2s;

                &:hover {
                    color: $primary;
                }
            }
        }

        .detail-update {
            margin-top: 80px;
            display: flex;
            align-items: center;
            color: #999;
            font-size: 24px;
            padding: 0 10px;

            .icon-wrap {
                margin-right: 24px;
            }
        }

        .article-page {
            margin: 120px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 24px;
        }

        .article-page-next,
        .article-page-prev {
            span {
                display: block;
                cursor: pointer;
                border: 1px solid #999;
                color: #666;
                padding: 10px 20px;
                border-radius: 30px;
                display: flex;
                align-items: center;

                &:hover {
                    border: 1px solid $primary;
                    color: $primary;
                }
            }
        }
    }
</style>