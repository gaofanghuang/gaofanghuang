<template>
  <div class="comment-item-wrap">
    <div class="comment-item-info">
      <div class="comment-item-user">
        <div class="comment-item-user-name">{{ item.userName }}</div>
        <div class="comment-item-user-site" v-if="item.userUrl">
          <a :href="item.userUrl" target="_blank">{{ item.userSite || item.userName }}</a>
        </div>
      </div>
      <div class="comment-item-time">{{ item.updated_time | time2tips }}</div>
    </div>
    <div class="comment-item-content markdown-view" v-html="content"></div>
    <div class="comment-item-reply" v-if="item.reply">
      <div class="comment-reply-user">Gaofang 回复于 {{ item.reply_time | time2tips }}:</div>
      <div class="comment-item-reply-content markdown-view" v-html="reply"></div>
    </div>
  </div>
</template>

<script>
import md from '@/services/markdown';

export default {
  computed: {
    content() {
      return this.item && this.item.content ? md(this.item.content) : '';
    },
    reply() {
      return this.item && this.item.reply ? md(this.item.reply) : '';
    },
  },
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.comment-item-wrap {
  margin-bottom: 20px;
  border: 1px solid $border-color;
  border-radius: 8px;
  overflow: hidden;

  .comment-item-info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: #fcfcfc;
    border-bottom: 1px solid #f8f8f8;
  }
  .comment-item-time {
    font-size: 12px;
    color: #999999;
  }
  .comment-item-user {
    display: flex;
    align-items: center;
  }
  .comment-item-user-site {
    margin-left: 20px;
    a {
      color: $primary;
    }
  }
  .comment-item-content {
    padding: 20px;
    background: #ffffff;
    position: relative;
    &::before {
      position: absolute;
      top: -7px;
      left: 25px;
      content: '';
      border: 7px solid transparent;
      border-bottom-color: #efefef;
      border-top-width: 0;
      z-index: 1;
    }
    &::after {
      position: absolute;
      top: -6px;
      left: 26px;
      content: '';
      border: 6px solid transparent;
      border-bottom-color: #ffffff;
      border-top-width: 0;
      z-index: 2;
    }
  }
  .comment-item-reply {
    padding: 20px;
    background: #ffffff;
    position: relative;
    &::before {
      position: absolute;
      top: 0;
      left: 20px;
      content: '';
      width: calc(100% - 40px);
      height: 1px;
      border-top: 1px solid #f8f8f8;
    }
    .comment-reply-user {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: $light;
      margin-bottom: 10px;
    }
    .reply-user-name {
      color: $primary;
    }
  }
}
</style>
