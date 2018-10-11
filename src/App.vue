<template>
  <div id="app">
    <div class="layout-wrap">
      <Home></Home>
    </div>
  </div>
</template>

<script>
//import CV from '@/pages/cv'
import Home from '@/pages/home'
export default {
  name: 'App',
  components: {
    //CV
    Home
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100vh;
}
.layout-wrap {
  width: 100%;
  height: 100%;
  font-weight: 100;
  letter-spacing: 1px;
}
</style>
