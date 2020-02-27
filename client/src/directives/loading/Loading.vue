<template>
  <div v-show="visible" class="loading-wrap">
    <div class="loading-box">
      <Icon name="loading" />
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
};
</script>
<style lang="scss">
.loading-parent {
  position: relative;
  & > *:not(.loading-wrap) {
    display: none;
  }
  .loading-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    overflow: hidden;
  }
  .loading-box {
    display: flex;
    align-items: center;
  }
  .icon {
    animation-name: circle;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}
</style>
