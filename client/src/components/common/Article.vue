<template>
    <transition name="fadeIn">
        <div class="article-wrap" v-if="!isDelete">
            <div v-if="cover" @click="handleDetail" class="article-cover">
                <img :src="cover" alt="cover">
            </div>
            <h1 class="article-title" @click="handleDetail" v-if="title">{{ title }}</h1>
            <div class="article-summary" v-if="summary">
                {{ summary }}
            </div>
            <ul class="article-tags" v-if="tags.length > 0">
                <li class="article-tag article-tag-icon">
                    <Icon type="biaoqian" />
                </li>
                <li class="article-tag" @click="handleTag(item)" v-for="(item, index) in tags" :key="`tags-${id}-${item}-${index}`">
                    {{ item }}
                </li>
            </ul>
            <div class="article-more" @click="handleMore">
                <Icon type="gengduo1" />
            </div>
        </div>
    </transition>
</template>

<script>
    import bus from "@/bus.js";
    import * as api from "@/util/api";

    export default {
        name: "Article",
        data() {
            return {
                isDelete: false
            }
        },
        props: {
            info: {}
        },
        computed: {
            cover() {
                let _cover = this.info.cover
                if (process.env.NODE_ENV === 'production') {
                    _cover = _content.replace(/http:\/\/localhost:9000/g,
                        "https://raw.githubusercontent.com/gaofanghuang/gaofanghuang/master/serve/public"
                    );
                }
                return _cover
            },
            title() {
                return this.info.title
            },
            id() {
                return this.info.id
            },
            content() {
                return this.info.content
            },
            tags() {
                return this.info.tags
            },
            summary() {
                return this.info.summary
            }
        },
        methods: {
            handleMore() {
                const actions = [{
                    text: "查看",
                    method: () => {
                        console.log("查看这篇文章", this.id)
                        this.$router.push(`/detail/${this.id}`)
                    }
                }];
                if (process.env.NODE_ENV === "development") {
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
                                let path = this.$route.path
                                if (path.includes('detail')) {
                                    this.$router.push("/home")
                                } else {
                                    this.isDelete = true
                                }
                            })
                        }
                    });
                }

                bus.$emit("actionSheet", actions, "取消");
            },
            handleTag(item) {
                this.$router.push(`/tag/${item}`)
            },
            handleDetail() {
                this.$router.push(`/detail/${this.id}`)
            }
        }
    }
</script>

<style lang="scss">
    .article-wrap {
        background: #ffffff;
        position: relative;
        box-shadow: 0 6px 12px rgba(#000, 0.08);

        .article-more {
            position: absolute;
            bottom: 20px;
            right: 10px;
            color: $gray2;
            cursor: pointer;

            &:hover {
                color: $black;
            }
        }

        &+.article-wrap {
            margin-top: 24px;
        }

        .article-cover {
            height: 320px;
            overflow: hidden;
            background: $light;
            text-align: center;
            background: #e9e9e9;
            cursor: pointer;
        }

        .article-title {
            padding: 20px 20px 0 20px;
            font-size: 36px;
            cursor: pointer;
            transition: 0.2s;

            &:hover {
                color: $primary;
            }
        }

        .article-summary {
            padding: 20px;
            font-size: 28px;
            color: $gray2;
        }

        .article-tags {
            padding: 10px 20px 20px 20px;
            color: #999;
            font-size: 24px;

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

        .article-tag-icon {
            .icon {
                font-size: 30px;
            }
        }
    }
</style>