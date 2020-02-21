<template>
  <div class="tags-rank-wrap">
    <div class="tags-rank-title">Tags Rank</div>
    <div class="tags-rank-list">
      <span class="tags-rank-item" v-for="item in tags" :key="`${item._id}`">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
    };
  },
  created() {
    this.getTags();
  },
  methods: {
    getTags() {
      const tags = this.$store.state.tags;
      // TODO: 标签使用次数排序
      this.tags = tags;
    },
  },
};
</script>

<style lang="scss">
.tags-rank-wrap {
  border: 1px solid $border-color;
  border-radius: 4px;
  padding: 30px 20px 20px 20px;
  position: relative;
  .tags-rank-title {
    position: absolute;
    top: -9px;
    left: 50%;
    transform: translateX(-50%);
    background: #ffffff;
    padding: 0 10px;
    white-space: nowrap;
    font-family: 'moon-regular';
    letter-spacing: 1px;
  }
  .tags-rank-item {
    display: inline-block;
    font-size: 12px;
    background: #fcfcfc;
    color: #999999;
    border-radius: 4px;
    padding: 2px 8px;
    border: 1px solid #faf4f1;
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>
