<template>
  <div id="app">
    <div class="layout-wrap">
      <CV></CV>
    </div>
  </div>
</template>

<script>
import CV from '@/pages/cv'
export default {
  name: 'App',
  components: {
    CV
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
