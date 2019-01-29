<template>
    <div class="skill-wrap">
        <canvas id="canvas" class="skill-canvas"></canvas>
    </div>
</template>

<script>
    import * as api from "@/util/api"
    let canvas;
    let ctx;
    export default {
        data() {
            return {
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
                // console.log("初始化canvas")
                canvas = document.getElementById('canvas');
                ctx = canvas.getContext('2d');
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight
                this.draw()
            },
            draw() {
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 3; j++) {
                        ctx.beginPath();
                        var x = 25 + j * 50; // x 坐标值
                        var y = 25 + i * 50; // y 坐标值
                        var radius = 20; // 圆弧半径
                        var startAngle = 0; // 开始点
                        var endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
                        var anticlockwise = i % 2 == 0 ? false : true; // 顺时针或逆时针

                        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

                        if (i > 1) {
                            ctx.fill();
                        } else {
                            ctx.stroke();
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .app-content.is-fullpage {
        width: 100%;
    }

    .skill-wrap {
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .skill-canvas {
        background: #333;
    }
</style>