<template>
  <div class="tag-map-list">
    <router-link
      class="tag-map-item"
      :to="`/tag/${item._id}`"
      v-for="item in tag"
      :key="`${item._id}`"
    >
      {{ item.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TagMap',
  props: ['list'],
  data() {
    return {
      tag: [],
      tags: [],
    };
  },
  created() {
    this.tags = this.$store.state.tags;
    this.getTags();
  },
  methods: {
    getTags() {
      let res = [];
      if (this.list.length > 0) {
        for (let item of this.list) {
          for (let item2 of this.tags) {
            if (item === item2._id) {
              res.push(item2);
            }
          }
        }
      }
      this.tag = res;
    },
  },
};
</script>

<style lang="scss">
.tag-map-list {
  .tag-map-item {
    display: inline-block;
    font-size: 12px;
    background: #fcfcfc;
    color: #999999;
    border-radius: 4px;
    padding: 2px 8px;
    border: 1px solid #faf4f1;
    margin-right: 5px;
  }
}
</style>
