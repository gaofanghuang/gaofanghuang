<template>
    <div class="blog-wrap">
        <Article v-for="item in list" :key="item.id" :info="item" card />
        <div class="blog-foot flex">
            <button class="btn" @click="goHome">← Back Home</button>
            <button class="btn" @click="goTop">To Top ↑</button>
        </div>
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
        created() {
            this.getList()
        },
        methods: {
            getList() {
                api.getList().then(({
                    data = []
                }) => {
                    data.sort((a, b) => {
                        return b.lasttime - a.lasttime
                    })
                    this.list = data
                    this.$store.commit("SaveList", this.list);
                })
            },
            goTop() {
                let distance = document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
                let step = distance / 50; //每步的距离
                (function jump() {
                    if (distance > 0) {
                        distance -= step;
                        window.scrollTo(0, distance);
                        setTimeout(jump, 10)
                    }
                })();
            },
            goHome() {
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="scss">
.blog-foot {
    padding-bottom: 40px;
    text-align: center;
    justify-content: space-between;
    margin-top: 40px;
    .btn {
        color: #999;
        cursor: pointer;
        transition: 0.2s;
        font-size: 24px;
        &:hover {
            color: $primary;
        }
    }
}
</style>
