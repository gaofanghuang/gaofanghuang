<template>
  <div class="entry-item-wrap">
    <div class="entry-item-time">
      <span class="entry-item-time_month">{{ item.updated_time | formatDate('MM-dd') }}</span>
      <span class="entry-item-time_year">{{ item.updated_time | formatDate('yyyy') }}</span>
    </div>
    <div class="entry-item-score" v-if="item.score">
      <Score :score="item.score" />
    </div>
    <div class="entry-item-title" v-if="item.title">{{ item.title }}</div>
    <div class="entry-item-url" v-if="item.url">
      <a href="item.url" target="_blank">{{ item.url }}</a>
    </div>
    <!-- 图文 -->
    <div v-if="item.type === 1" class="entry-item-content markdown-view" v-html="content"></div>
    <!-- 图集 -->
    <div v-if="item.type === 2" class="entry-item-imgs">
      <Slide :list="item.images" />
    </div>
    <!-- 视频 -->
    <div v-if="item.type === 3" class="entry-item-video">
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
  </div>
</template>

<script>
import md from '@/services/markdown';
import Slide from '@/components/Slide';
import Score from '@/components/Score';

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
    Score,
  },
};
</script>

<style lang="scss">
.entry-item-wrap {
  margin-bottom: 20px;
  padding: 20px;
  background: #ffffff;
  border-radius: 4px;
  position: relative;
  .entry-item-title {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 600;
  }
  .entry-item-time {
    font-size: 12px;
    color: $light;
    margin-bottom: 20px;
  }
  .entry-item-score {
    margin-bottom: 20px;
  }
  .slide-wrap {
    width: 100%;
    height: 420px;
  }
  .entry-item-url {
    margin-bottom: 20px;
    a {
      color: $primary;
      &:hover {
        color: $active;
      }
    }
  }
  .entry-item-time_year {
    display: block;
    font-size: 24px;
    font-family: 'moon-light';
    color: #eaeaea;
  }
  .entry-item-time_month {
    font-family: 'moon-regular';
    letter-spacing: 2px;
  }
}
</style>
