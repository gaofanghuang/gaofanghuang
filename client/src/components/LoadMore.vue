<template>
  <div class="loadmore-wrap">
    <div class="loadmore-content">
      <div v-loading="refresh"></div>
      <slot />
    </div>
    <div class="loadmore-footer" v-if="showFooter">
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
      refresh: false,
      showFooter: false,
      noMore: false,
      loading: false,
    };
  },
  created() {
    this.refreshData();
  },
  methods: {
    refreshData() {
      this.refresh = true;
      this.$emit(
        'onRefresh',
        (length, limit) => {
          this.noMore = length < limit;
          this.showFooter = true;
          this.refresh = false;
        },
        true
      );
    },
    loadMore() {
      if (!this.noMore) {
        this.loading = true;
        this.$emit('onLoadMore', (length, limit) => {
          this.loading = false;
          setTimeout(() => {
            this.noMore = length < limit;
          }, 300);
        });
      }
    },
  },
};
</script>

<style lang="scss">
.loading-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  .loading-box {
    display: flex;
    align-items: center;
  }
  .icon {
    animation-name: circle;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}

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
