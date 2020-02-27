<template>
  <div class="tags-rank-wrap">
    <div class="tags-rank-title">Hot Tags</div>
    <div class="tags-rank-list">
      <span class="tags-rank-item" v-for="item in tags" :key="`${item._id}`">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import fix from '@/services/fix.js';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      tags: [],
    };
  },
  created() {
    this.getTags();
  },
  computed: {
    ...mapState({
      projects: state => state.projects || [],
      checklist: state => state.checklist || [],
    }),
  },
  methods: {
    getTags() {
      let tags = this.$store.state.tags;
      let projectTags = [];
      this.projects.map(item => {
        projectTags = [...projectTags, ...item.tag];
      });
      let checklistTags = [];
      this.checklist.map(item => {
        checklistTags = [...checklistTags, ...item.tag];
      });
      const allUseTags = [...projectTags, ...checklistTags];
      tags.forEach((tag, index) => {
        tags[index].count = 0;
        for (let item of allUseTags) {
          if (item === tag._id) {
            tags[index].count += 1;
          }
        }
      });
      this.tags = fix.sort(tags, 'count', 'des').slice(0, 20);
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
