<template>
  <div class="loadmore-wrap">
    <div class="loadmore-content">
      <slot />
    </div>
    <div class="loadmore-footer">
      <div class="no-more" v-if="noMore">没有更多了</div>
      <div class="loadmore-btn" @click="loadMore()" v-if="!noMore" v-loading="loading">
        <span>加载更多</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canLoad: true,
      noMore: false,
      loading: false,
    };
  },
  created() {
    this.refreshData();
  },
  methods: {
    refreshData() {
      this.$emit('onRefresh', (length, limit) => {
        this.noMore = length < limit;
        this.canLoad = !this.noMore;
      });
    },
    loadMore() {
      if (this.canLoad && !this.noMore) {
        this.canLoad = false;
        this.loading = true;
        this.$emit('onLoadMore', (length, limit) => {
          this.loading = false;
          setTimeout(() => {
            this.noMore = length < limit;
            this.canLoad = !this.noMore;
          }, 300);
        });
      }
    },
  },
};
</script>

<style lang="scss">
.loadmore-footer {
  text-align: center;
  .loadmore-btn {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #f5f5f5;
    transition: 0.2s ease-in;
    border-radius: 4px;
    &:hover {
      background: #f1f1f1;
    }
  }
  .no-more {
    color: #999999;
  }
}
</style>
