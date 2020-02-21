<template>
  <div class="log-pane-wrap">
    <LoadMore @onRefresh="onRefresh" @onLoadMore="onLoadMore">
      <transition-group name="fadeIn">
        <LogItem v-for="item in list" :item="item" :key="item._id" />
      </transition-group>
    </LoadMore>
  </div>
</template>

<script>
import * as api from '@/services/api';
import LogItem from '@/components/LogItem';
import LoadMore from '@/components/LoadMore';

export default {
  data() {
    return {
      id: this.$route.params.id,
      list: [],
      page: 1,
      showSize: 10,
    };
  },
  components: {
    LogItem,
    LoadMore,
  },
  methods: {
    onRefresh(callback = () => {}) {
      const params = {
        page: 1,
        showSize: this.showSize,
      };
      api.getLogs(this.id, params).then(({ data }) => {
        if (data.code) {
          const dataTemp = data.data;
          this.list = dataTemp;
          callback(dataTemp.length, this.showSize);
        }
      });
    },
    onLoadMore(callback = () => {}) {
      const params = {
        page: this.page + 1,
        showSize: this.showSize,
      };
      api.getLogs(this.id, params).then(({ data }) => {
        if (data.code) {
          this.page = this.page + 1;
          const dataTemp = data.data;
          this.list = [...this.list, ...dataTemp];
          callback(dataTemp.length, this.showSize);
        }
      });
    },
  },
};
</script>
