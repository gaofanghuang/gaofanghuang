<template>
  <div id="Status"></div>
</template>

<script>
import echarts from 'echarts';
import color from './color.json';
export default {
  data() {
    return {
      tags: ['a', 'b', 'c', 'a', 'c', 'c', 'a', 'c', 'b', 'a', 'a', 'c'],
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '3%',
          top: '3%',
          bottom: '3%',
          containLabel: true,
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {
                value: 335,
                name: '未开发',
              },
              {
                value: 310,
                name: '开发中',
              },
              {
                value: 274,
                name: '已完成',
              },
            ],
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(0, 0, 0, 0.3)',
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(0, 0, 0, 0.3)',
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function() {
              return Math.random() * 200;
            },
          },
        ],
        color: color,
      };
      let Chart = echarts.init(document.getElementById('Status'));
      Chart.setOption(option);
    },
  },
};
</script>
