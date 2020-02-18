<template>
  <div class="comments-wrap">
    <div class="comments-banner flex flex-x flex-y">
      comments
    </div>

    <div class="comment-container">
      <CommentInpBox @refresh="getList" />

      <div class="comment-list">
        评论列表
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';
import CommentInpBox from '@/components/CommentInpBox';

export default {
  data() {
    return {
      list: [],
    };
  },
  components: {
    CommentInpBox,
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      api.getComments().then(({ data }) => {
        this.list = data.data;
      });
    },
  },
};
</script>

<style lang="scss">
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
  margin-top: 20px;
}
</style>
