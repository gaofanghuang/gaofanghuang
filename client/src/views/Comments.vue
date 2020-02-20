<template>
  <div class="comments-wrap">
    <div class="comments-banner flex flex-x flex-y">
      comments
    </div>

    <div class="comment-container">
      <CommentInpBox v-if="canComment" @refresh="onRefresh()" />

      <div class="comment-list">
        <div class="comment-list-title">Lastest Comments</div>
        <LoadMore @onRefresh="onRefresh" @onLoadMore="onLoadMore">
          <transition-group name="fadeIn">
            <CommentItem v-for="item in list" :item="item" :key="item._id" />
          </transition-group>
        </LoadMore>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';
import CommentInpBox from '@/components/CommentInpBox';
import CommentItem from '@/components/CommentItem';
import LoadMore from '@/components/LoadMore';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      list: [],
      page: 1,
      showSize: 10,
    };
  },
  components: {
    CommentInpBox,
    CommentItem,
    LoadMore,
  },
  computed: {
    ...mapGetters(['canComment']),
  },
  methods: {
    onRefresh(callback = () => {}) {
      const params = {
        page: 1,
        showSize: this.showSize,
      };
      api.getComments(params).then(({ data }) => {
        if (data.code) {
          const dataTemp = data.data;
          this.list = dataTemp;
          this.lastId = dataTemp[dataTemp.length - 1]._id;
          callback(dataTemp.length, this.showSize);
        }
      });
    },
    onLoadMore(callback = () => {}) {
      const params = {
        page: this.page + 1,
        showSize: this.showSize,
      };
      api.getComments(params).then(({ data }) => {
        if (data.code) {
          this.page = this.page + 1;
          const dataTemp = data.data;
          this.list = [...this.list, ...dataTemp];
          this.lastId = dataTemp[dataTemp.length - 1]._id;
          callback(dataTemp.length, this.showSize);
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
