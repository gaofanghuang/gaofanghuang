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
</style>
