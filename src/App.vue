<template>
  <div id="app">
    <div class="layout-wrap">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
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
