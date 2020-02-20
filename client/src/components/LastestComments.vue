<template>
  <div class="latest-comments-wrap">
    <div class="latest-comments-title">Latest Comments</div>
    <div class="latest-comment-item" v-for="item in list" :key="item._id">
      <div class="latest-comment-user">
        {{ item.userName }} 于 {{ item.updated_time | time2tips }} 留言：
      </div>
      <div class="latest-comment-content">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';
import fix from '@/services/fix';

export default {
  data() {
    return {
      list: [],
      lastId: '',
      showSize: 10,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const params = {
        lastId: this.lastId,
        showSize: this.showSize,
      };
      api.getComments(params).then(({ data }) => {
        if (data.code) {
          let _data = [];
          if (data.data.length > 0) {
            _data = fix.sort(data.data, 'updated_time', 'des');
          }
          this.list = _data;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.latest-comments-wrap {
  border: 1px solid $border-color;
  border-radius: 4px;
  padding: 30px 20px 20px 20px;
  position: relative;
  .latest-comments-title {
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
  .latest-comment-item {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f8f8f8;
    &:last-of-type {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
  .latest-comment-user {
    font-size: 12px;
    margin-bottom: 10px;
  }
  .latest-comment-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    max-height: 40px;
  }
}
</style>
