<template>
  <div class="score-wrap">
    <Icon name="star" v-for="item in score" :key="item" />
  </div>
</template>

<script>
export default {
  props: ['score'],
};
</script>

<style lang="scss">
.score-wrap {
  color: $light;
  .icon {
    margin-right: 2px;
    color: #eaeaea;
  }
}
</style>
