<template>
  <div class="log-item-wrap">
    <div class="log-item-title" v-if="item.title">{{ item.title }}</div>
    <!-- 图文 -->
    <div v-if="item.type === 1" class="log-item-content markdown-view" v-html="content"></div>
    <!-- 图集 -->
    <div v-if="item.type === 2" class="log-item-imgs">
      <Slide :list="item.images" />
    </div>
    <!-- 视频 -->
    <div v-if="item.type === 3" class="log-item-video">
      <iframe
        :src="`//player.bilibili.com/player.html?aid=${item.video}`"
        width="100%"
        height="500px"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
      >
      </iframe>
    </div>
    <div class="log-item-time">
      {{ item.version }} · {{ item.updated_time | formatDate('yyyy-MM-dd') }}
    </div>
  </div>
</template>

<script>
import md from '@/services/markdown';
import Slide from '@/components/Slide';

const TYPES = [
  {
    id: 1,
    name: '图文',
  },
  {
    id: 2,
    name: '图集',
  },
  {
    id: 3,
    name: '视频',
  },
];

export default {
  data() {
    return {
      id: this.$route.params.id,
      list: [],
    };
  },
  props: ['item'],
  computed: {
    content() {
      return this.item.content ? md(this.item.content) : '';
    },
  },
  filters: {
    typeMap(type) {
      const item = TYPES.find(item => item.id === type);
      return item ? item.name : '';
    },
  },
  components: {
    Slide,
  },
};
</script>

<style lang="scss">
.log-item-wrap {
  margin-bottom: 20px;
  padding: 20px;
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  .log-item-title {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 600;
  }
  .log-item-time {
    font-size: 12px;
    color: $light;
    margin-top: 20px;
  }
  .slide-wrap {
    width: 100%;
    height: 420px;
  }
}
</style>
