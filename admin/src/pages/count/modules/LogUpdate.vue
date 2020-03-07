<template>
  <div id="logUpdate"></div>
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
        series: {
          type: 'pie',
          radius: ['0', '80%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
            },
            emphasis: {
              show: true,
              textStyle: {
                color: '#ffffff',
                fontSize: '24',
                fontWeight: 'bold',
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              value: 335,
              name: '本月更新',
            },
            {
              value: 310,
              name: '上月更新',
            },
          ],
        },
        color: color,
      };
      let Chart = echarts.init(document.getElementById('logUpdate'));
      Chart.setOption(option);
    },
  },
};
</script>
