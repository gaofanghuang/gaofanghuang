<template>
    <div class="home-wrap">
        <LoadMore ref="loadmore" class="article-list" @onRefresh="onRefresh">
            <Article v-for="item in list" :key="item.id" :info="item" card />
        </LoadMore>
    </div>
</template>

<script>
    import * as api from "@/util/api"
    export default {
        data() {
            return {
                list: []
            }
        },
        methods: {
            onRefresh(callback) {
                api.getList().then(({
                    data = []
                }) => {
                    data.sort((a, b) => {
                        return b.lasttime - a.lasttime
                    })
                    this.list = data
                    this.$store.commit("SaveList", this.list);
                    callback(true)
                })
            }
        }
    }
</script>