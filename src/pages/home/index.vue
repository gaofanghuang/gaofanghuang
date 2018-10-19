<template>
  <div class="home-wrap">
    <Nav></Nav>
  </div>
</template>

<script>
import Nav from './modules/nav'
export default {
  components: {
    Nav
  }
}
</script>

<style lang="scss">
.home-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba($green, 0.75), rgba($primary, 0.75));
  color: #fff;
}
</style>
