<template>
  <div class="comments-wrap">
    <div class="comments-banner flex flex-x flex-y">
      comments
    </div>

    <div class="comment-container">
      <CommentInpBox @refresh="getList" />

      <div class="comment-list">
        <div class="comment-list-title">Lastest Comments</div>
        <CommentItem v-for="item in list" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';
import CommentInpBox from '@/components/CommentInpBox';
import CommentItem from '@/components/CommentItem';
import fix from '@/services/fix';

export default {
  data() {
    return {
      list: [],
      lastId: 0,
      showSize: 20,
    };
  },
  components: {
    CommentInpBox,
    CommentItem,
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      // TODO: 分页加载
      api.getComments().then(({ data }) => {
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
.comments-wrap {
  .comments-banner {
    width: 100%;
    height: 320px;
    background: #f2f2f2;
    color: #dddddd;
    font-family: 'moon-light';
    letter-spacing: 3px;
    font-size: 48px;
  }
  .comment-container {
    width: 100%;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
    padding: 40px 0;
  }
  .comment-list {
    margin-top: 60px;
  }
  .comment-list-title {
    font-size: 16px;
    font-family: 'moon-bold';
    margin-bottom: 20px;
    letter-spacing: 1px;
    padding-bottom: 10px;
    border-bottom: 1px solid #efefef;
  }
}
</style>
