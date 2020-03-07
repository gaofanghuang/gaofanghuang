<template>
  <div class="data-count">
    <div class="data-count-totals">
      <div class="data-count-total">
        <div class="data-count-total-title">本月记录</div>
        <div class="data-count-total-number">29</div>
      </div>
      <div class="data-count-total">
        <div class="data-count-total-title">剩余需求</div>
        <div class="data-count-total-number">29</div>
      </div>
      <div class="data-count-total">
        <div class="data-count-total-title">项目总数</div>
        <div class="data-count-total-number">29</div>
      </div>
      <div class="data-count-total">
        <div class="data-count-total-title">记录总数</div>
        <div class="data-count-total-number">29</div>
      </div>
      <div class="data-count-total">
        <div class="data-count-total-title">标签总数</div>
        <div class="data-count-total-number">29</div>
      </div>
    </div>

    <div class="data-count-charts">
      <div class="data-count-chart">
        <div class="data-count-chart-canvas">
          <HotTag />
        </div>
        <div class="data-count-chart-title">热门标签排行</div>
      </div>

      <div class="data-count-chart">
        <div class="data-count-chart-canvas">
          <LogUpdate />
        </div>
        <div class="data-count-chart-title">记录更新环比</div>
      </div>

      <div class="data-count-chart">
        <div class="data-count-chart-canvas">
          <Demand />
        </div>
        <div class="data-count-chart-title">需求完成度</div>
      </div>

      <div class="data-count-chart">
        <div class="data-count-chart-canvas">
          <TagCloud />
        </div>
        <div class="data-count-chart-title">标签属性</div>
      </div>

      <div class="data-count-chart">
        <div class="data-count-chart-canvas">
          <Calendar />
        </div>
        <div class="data-count-chart-title">更新日历</div>
      </div>

      <div class="data-count-chart">
        <div class="data-count-chart-canvas">
          <Status />
        </div>
        <div class="data-count-chart-title">项目状态</div>
      </div>
    </div>
  </div>
</template>

<script>
import HotTag from './modules/HotTag';
import LogUpdate from './modules/LogUpdate';
import Demand from './modules/Demand';
import TagCloud from './modules/TagCloud';
import Calendar from './modules/Calendar';
import Status from './modules/Status';

export default {
  data() {
    return {};
  },
  components: {
    HotTag,
    LogUpdate,
    Demand,
    TagCloud,
    Calendar,
    Status,
  },
};
</script>

<style lang="scss">
.data-count {
  .data-count-totals {
    display: flex;
    justify-content: space-around;
  }
  .data-count-total {
    padding: 10px 68px;
    border: 1px solid #efefef;
    text-align: center;
    border-radius: 4px;
    font-size: 14px;
    color: #999999;
  }
  .data-count-total-number {
    font-size: 36px;
    margin-top: 10px;
    color: #666666;
  }
  .data-count-charts {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 40px;
  }

  .data-count-chart {
    text-align: center;
    border-radius: 4px;
    font-size: 14px;
    color: #999999;
    margin-bottom: 40px;
  }
  .data-count-chart-canvas {
    width: 320px;
    height: 240px;
    background: #f9f9f9;
    margin-bottom: 10px;
    & > div {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
