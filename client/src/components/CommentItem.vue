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
    <div class="comment-item-content">
      {{ item.content }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss">
.comment-item-wrap {
  margin-bottom: 20px;
  background: #ffffff;
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 20px;
  .comment-item-info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    margin-top: 20px;
  }
}
</style>
