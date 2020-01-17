<template>
  <header class="header-wrap">
    header
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss">
.header-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background: rgba($color: $primary, $alpha: 0.68);
  color: #ffffff;
  transition: 0.2s;
  opacity: 0;
  &:hover {
    background: rgba($color: $primary, $alpha: 1);
  }
}
</style>
