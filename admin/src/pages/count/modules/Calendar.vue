<template>
    <canvas id="Calendar"></canvas>
</template>

<script>
    import echarts from "echarts";
    import color from "./color.json"
    export default {
        data() {
            return {
                days: [],
                dotR: 0,
                itemW: 0,
                itemAxis: {
                    x: 0,
                    y: 0
                }
            }
        },
        mounted() {
            this.days = this.getVirtulData()
            this.initChart()
        },
        methods: {
            getVirtulData(year) {
                year = year || '2019';
                var date = +echarts.number.parseDate(year + '-01-01');
                var end = +echarts.number.parseDate(year + '-12-31');
                var dayTime = 3600 * 24 * 1000;
                var data = [];
                for (var time = date; time <= end; time += dayTime) {
                    data.push([
                        echarts.format.formatTime('yyyy-MM-dd', time),
                        Math.floor(Math.random() * 10000)
                    ]);
                }
                return data;
            },
            initChart() {
                let Canvas = document.getElementById("Calendar")
                Canvas.width = 320 - 20
                Canvas.height = 240 - 20
                this.ctx = Canvas.getContext('2d')
                let Cw = Canvas.width
                let Ch = Canvas.height
                this.ctx.fillStyle = color[0]
                this.itemW = Cw / 25
                this.itemH = Ch / 15
                this.dotR = this.itemH / 4
                for (let i = 0; i < 15; i++) {
                    this.itemAxis = {
                        x: this.itemW / 2,
                        y: this.itemH / 2 + this.itemH * i
                    }
                    this.ctx.moveTo(this.itemAxis.x, this.itemAxis.y)
                    for (let j = 0; j < 25; j++) {
                        this.itemAxis.x = this.dotR + this.itemW * j + this.dotR / 2;
                        this.ctx.globalAlpha = 0.1;
                        let theDay = (i + 1) * (j + 1)
                        if (theDay <= this.days.length) {
                            if (this.days[theDay][1] > 3000) {
                                this.ctx.globalAlpha = 0.4;
                            }
                            if (this.days[theDay][1] > 6000) {
                                this.ctx.globalAlpha = 0.8;
                            }
                            if (this.days[theDay][1] > 9000) {
                                this.ctx.fillStyle = color[1]
                            }
                        }
                        this.ctx.beginPath();
                        this.ctx.arc(this.itemAxis.x, this.itemAxis.y, this.dotR, 0, 2 * Math.PI);
                        this.ctx.closePath();
                        this.ctx.fill();
                    }
                }

            }
        },
    }
</script>

<style lang="scss">
#Calendar {
    margin-top: 10px;
}
</style>
