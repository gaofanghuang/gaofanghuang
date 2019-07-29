<template>
    <div id="tagCloud"></div>
</template>

<script>
    import echarts from "echarts";
    import color from "./color.json"
    export default {
        data() {
            return {
                tags: ['a', 'b', 'c', 'a', 'c', 'c', 'a', 'c', 'b', 'a', 'a', 'c']
            }
        },
        mounted() {
            this.initChart()
        },
        methods: {
            initChart() {
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        top: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    radar: {
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#cfcfcf',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        splitNumber: 2,
                        splitArea: {
                            areaStyle: {
                                color: ['rgba(250,250,250,0.3)']
                            }
                        },
                        radius: '65%',
                        indicator: [{
                                name: 'Javascript',
                                max: 10000
                            },
                            {
                                name: 'Android',
                                max: 10000
                            },
                            {
                                name: 'IOS',
                                max: 10000
                            },
                            {
                                name: '服务端',
                                max: 10000
                            },
                            {
                                name: '视觉设计',
                                max: 10000
                            },
                            {
                                name: '视频编辑',
                                max: 10000
                            }
                        ]
                    },
                    series: [{
                        type: 'radar',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: '#23BED5' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#23CCA9' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        data: [{
                            value: [9300, 2000, 1000, 4000, 8000, 7000]
                        }]
                    }],
                    color: color
                }
                let Chart = echarts.init(document.getElementById("tagCloud"));
                Chart.setOption(option);
            }
        },
    }
</script>