<template>
  <div class="pc-wrap">
    <div class="pc-screen">
      <div class="pc-scrren-bg" :style="`background-image: url(${this.bgImg})`"></div>
      <div class="pc-gamebox">sss</div>
    </div>
  </div>
</template>

<script>
import bgImg from '@/assets/bg.jpg';

export default {
  data() {
    return {
      bgImg: bgImg,
    };
  },
};
</script>

<style lang="scss">
.is-pc.ignore {
  .pc-wrap {
    .pc-screen {
      margin-top: -90px;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
    .pc-scrren-bg {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: bottom center;
      transform: scale(1.05);
      opacity: 0.1;
      filter: blur(8px);
      overflow: hidden;
      transition: 6s;
      &:hover {
        filter: none;
      }
    }
  }
}
</style>
