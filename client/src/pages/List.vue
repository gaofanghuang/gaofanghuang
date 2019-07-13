<template>
    <div class="list-wrap">
        <div class="list-search">
            <Icon type="sousuo" />
            <input type="text" v-model="keyword" @keyup.enter="handleSearch" placeholder="输入文章标题或标签名称搜索">
        </div>
        <!-- 当前状态 -->
        <div class="search-status" v-if="keyword">search for <span>{{ keyword }}</span>, {{ searchList.length }}
            result.</div>
        <!-- 文章列表 -->
        <template v-if="!keyword">
            <Article v-for="item in list" :key="item.id" :info="item" />
        </template>
        <template v-else>
            <Article v-for="item in searchList" :key="item.id" :info="item" />
        </template>
    </div>
</template>

<script>
    import * as api from "@/util/api"
    import bus from "@/bus.js"
    export default {
        data() {
            return {
                keyword: "",
                list: [],
                canSearch: true,
                searchList: []
            }
        },
        watch: {
            tag() {
                if (this.tag !== undefined) {
                    this.keyword = this.tag
                }
            },
            $route(newPath) {
                if (newPath.path.includes("list")) {
                    this.keyword = ""
                }
            },
            keyword() {
                if (this.keyword && this.list.length > 0) {
                    this.handleSearch()
                }
            }
        },
        computed: {
            tag() {
                return this.$route.params.tag
            }
        },
        created() {
            this.getList()
        },
        mounted() {
            if (this.$store.state.list.length > 0) {
                this.list = this.$store.state.list
            }
            if (this.tag !== undefined) {
                this.keyword = this.tag
                setTimeout(() => {
                    this.handleSearch()
                }, 300);
            }

            bus.$on("handleMore", () => {
                this.showMore()
            })
        },
        destroyed() {
            bus.$off('handleMore')
        },
        methods: {
            getList() {
                if (this.list.length > 0) {
                    return
                }
                api.getList().then(({
                    data
                }) => {
                    data.sort((a, b) => {
                        return b.lasttime - a.lasttime
                    })
                    this.list = data
                    this.$store.commit("SaveList", this.list);
                })
            },
            handleSearch() {
                if (!this.canSearch) {
                    return
                }
                this.canSearch = false
                let key = this.keyword.toLowerCase()
                let list = this.list
                this.searchList = []
                for (let i in list) {
                    let tags = list[i].tags.join(",").toLowerCase()
                    let title = list[i].title.toLowerCase()
                    if (tags.indexOf(key) > -1 || title.indexOf(key) > -1) {
                        this.searchList.push(list[i])
                    }
                }
                setTimeout(() => {
                    this.canSearch = true
                }, 1000);
            },
            showMore() {
                const actions = [];
                actions.push({
                    text: "回到首页",
                    method: () => {
                        this.$router.push(`/`)
                    }
                });

                bus.$emit("actionSheet", actions, "取消");
            }
        }
    }
</script>

<style lang="scss">
    .list-wrap {

        .list-search {
            padding: 20px 10px;
            position: relative;
            background: $white;
            margin-bottom: 20px;

            input {
                height: 64px;
                border-radius: 16px;
                padding-left: 80px;

                &::-webkit-input-placeholder {
                    color: $gray2;
                }
            }

            .icon-wrap {
                position: absolute;
                top: 25px;
                left: 20px;

            }
        }

        .search-status {
            padding: 0 20px 20px 20px;
            font-size: 24px;
        }
    }
</style>