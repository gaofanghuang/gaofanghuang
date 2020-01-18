<template>
  <div class="home-wrap" :style="bgStyle">
    <div class="home-banner"></div>
    <div class="home-container">
      ddd
    </div>
  </div>
</template>

<script>
import bg from '@/assets/bg/bg.jpg';

export default {
  name: 'home',
  data() {
    return {
      bgImg: bg,
      bgStyle: {},
    };
  },
  created() {
    this.bgStyle = {
      'background-image': `url(${this.bgImg})`,
    };
  },
  components: {},
};
</script>

<style lang="scss">
body {
  &::-webkit-scrollbar {
    width: 0;
  }
}
.home-wrap {
  width: 100%;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
}
.home-banner {
  width: 100%;
  height: 100vh;
}
.home-container {
  width: 100%;
  height: 2500px;
  background: #ffffff;
}
</style>
