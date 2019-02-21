<template>
    <div class="skill-wrap">
        <canvas id="canvas" class="skill-canvas"></canvas>
    </div>
</template>

<script>
    import * as api from "@/util/api"
    import draw from "@/util/draw"

    export default {
        data() {
            return {
                x: 100,
                y: 100,
                list: []
            }
        },
        computed: {
            tags() {
                let _tags = []
                if (this.list.length > 0) {
                    let allTags = this.list.map((item) => {
                        return item.tags
                    })
                    allTags = [].concat.apply([], allTags)
                    let tagCate = {}
                    for (let item of allTags) {
                        let name = item.toLowerCase()
                        tagCate[name] = tagCate[name] || []
                        tagCate[name].push(name)
                    }
                    for (let i in tagCate) {
                        _tags.push({
                            name: i,
                            count: tagCate[i].length
                        })
                    }
                }
                return _tags
            }
        },
        mounted() {
            if (this.$store.state.list.length > 0) {
                this.list = this.$store.state.list
            } else {
                this.getList()
            }
            this.initCanvas()
            window.onresize = () => {
                this.initCanvas()
            }
        },
        methods: {
            getList() {
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
            initCanvas() {
                draw.init()
            }
        }
    }
</script>

<style lang="scss">
    .skill-wrap {
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .skill-canvas {
        background: #333;
    }
</style>