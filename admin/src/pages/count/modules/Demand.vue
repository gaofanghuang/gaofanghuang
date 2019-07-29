<template>
    <div id="Demand"></div>
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
                    series: {
                        name: '业务指标',
                        type: 'gauge',
                        detail: {
                            offsetCenter: [0, '90%'],
                            formatter:'{value}%'
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: [[0.2, '#DE5585'], [0.8, '#23BED5'], [1, '#23CCA9']],
                                width: 10
                            }
                        },
                        axisLabel: {
                            distance: -50
                        },
                        splitLine: {
                            show: false
                        },
                        splitNumber: 1,
                        data: [{
                            value: 50
                        }]
                    },
                    color: color
                }
                let Chart = echarts.init(document.getElementById("Demand"));
                Chart.setOption(option);
            }
        },
    }
</script>