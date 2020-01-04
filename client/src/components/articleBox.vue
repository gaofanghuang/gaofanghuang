<template>
  <div class="article-box-wrap">
    <div class="markdown-view" :class="{ show: more }" v-html="viewContent(content)"></div>
    <div class="article-box-more" @click="more = !more">{{ more ? '收起' : '阅读全文' }}</div>
  </div>
</template>

<script>
import md from '@/services/markdown';
export default {
  data() {
    return {
      more: false,
    };
  },
  props: ['content'],
  methods: {
    viewContent(content) {
      let _content = content;
      if (process.env.NODE_ENV === 'production') {
        _content = _content.replace(
          /http:\/\/localhost:9000/g,
          'https://raw.githubusercontent.com/gaofanghuang/gaofanghuang/master/serve/data'
        );
      }
      return _content ? md(_content) : '';
    },
  },
};
</script>

<style lang="scss">
.is-pc.ignore {
  .article-box-wrap {
    .markdown-view {
      padding: 0 20px;
      max-height: 350px;
      overflow: hidden;

      &.show {
        height: auto;
        max-height: auto;
      }
    }

    .article-box-more {
      height: 36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      position: relative;
      color: $light;

      &::before {
        position: absolute;
        top: -20px;
        left: 0;
        content: '';
        width: 100%;
        height: 20px;
        background: linear-gradient(0deg, rgba($white, 1) 0%, rgba($white, 0) 100%);
      }
    }
  }
}
.is-mobile {
  .article-box-wrap {
    .markdown-view {
      padding: 0 20px;
      height: 350px;
      overflow: hidden;

      &.show {
        height: auto;
      }
    }

    .article-box-more {
      height: 60px;
      line-height: 60px;
      text-align: center;
      cursor: pointer;
      position: relative;
      color: $light;
      font-size: 24px;

      &::before {
        position: absolute;
        top: -40px;
        left: 0;
        content: '';
        width: 100%;
        height: 40px;
        background: linear-gradient(0deg, rgba($white, 1) 0%, rgba($white, 0) 100%);
      }
    }
  }
}
.is-dark {
  .article-box-more {
    &::before {
      background: linear-gradient(0deg, rgba($black, 1) 0%, rgba($black, 0) 100%) !important;
    }
  }
}
</style>
