<template>
  <div id="hotTag"></div>
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
          right: '10%',
          top: '10%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          splitNumber: 2,
          axisLabel: {
            showMaxLabel: false,
          },
        },
        yAxis: {
          type: 'category',
          data: ['Vue', 'Node', 'Flutter', 'Android', 'Photoshop', 'Vlog'],
        },
        series: {
          type: 'bar',
          data: [18203, 23489, 29034, 104970, 131744, 630230],
        },
        color: color,
      };
      let Chart = echarts.init(document.getElementById('hotTag'));
      Chart.setOption(option);
    },
  },
};
</script>
