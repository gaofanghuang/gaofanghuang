<template>
  <div id="app">
    <Header />
    <div class="main-wrap">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  data() {
    return {};
  },
  created() {
    // 每天自动清一次缓存
    const cacheTime = this.$store.state.cacheTime;
    const curTime = new Date().getTime();
    if (cacheTime) {
      if (cacheTime < curTime - 1 * 24 * 60 * 60 * 1000) {
        this.$db.clearData();
      }
    } else {
      this.$db.setData('cacheTime', curTime);
    }
    if (this.$store.state.tags.length === 0) {
      this.$store.dispatch('GetTags');
    }
  },
  mounted() {
    const body = document.querySelector('body');
    const loadingApp = document.querySelector('#loadingApp');
    body.removeChild(loadingApp);
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  width: 100vw;
  min-height: 100vh;
  flex-wrap: wrap;
}
.main-wrap {
  width: 100%;
  padding-top: 48px;
}
</style>
