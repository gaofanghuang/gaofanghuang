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
        <!-- 文章菜单 -->
        <transition name="leftSwipe">
            <div class="detail-menu" v-dom-portal="`.app-content`" v-if="menuToggle">
                <p>目录</p>
                <ul>
                    <li class="detail-menu-item" :class="`menu-${item.level}`" v-for="(item, index) in menu" :key="`menu-${item.text}-${index}`">
                        <a :href="item.anchorName">
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
    import Hljs from 'highlight.js';
    import marked from 'marked';
    import pinyin from 'pinyin';
    import * as api from "@/util/api";
    import bus from "@/bus.js";
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
                menuToggle: false
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
            }
        },
        watch: {
            $route() {
                this.onRefresh()
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
            if (!this.browser.isMobile) {
                this.menuToggle = true
            } else {
                this.menuToggle = false
            }
            // 来必力评论
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
                    this.content = data.content
                    this.tags = data.tags
                    this.lasttime = data.lasttime
                    document.title = this.title;
                    callback(true);
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
        }
    }
</script>

<style lang="scss">
    .detail-view {
        min-height: 100vh;
        background: #fff;
        padding: 20px;
    }

    .is-pc {
        .detail-menu {
            position: fixed;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            width: 300px;
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
    }
</style>