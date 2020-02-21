<template>
  <div class="todo-pane-wrap">
    <LoadMore @onRefresh="onRefresh" @onLoadMore="onLoadMore">
      <transition-group name="fadeIn">
        <TodoItem v-for="item in list" :item="item" :key="item._id" />
      </transition-group>
    </LoadMore>
  </div>
</template>

<script>
import * as api from '@/services/api';
import TodoItem from '@/components/TodoItem';
import LoadMore from '@/components/LoadMore';
import fix from '@/services/fix.js';

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
    TodoItem,
    LoadMore,
  },
  methods: {
    onRefresh(callback = () => {}) {
      const params = {
        page: 1,
        showSize: this.showSize,
      };
      api.getTODO(this.id, params).then(({ data }) => {
        if (data.code) {
          const dataTemp = data.data;
          this.list = fix.sort(dataTemp, 'status');
          callback(dataTemp.length, this.showSize);
        }
      });
    },
    onLoadMore(callback = () => {}) {
      const params = {
        page: this.page + 1,
        showSize: this.showSize,
      };
      api.getTODO(this.id, params).then(({ data }) => {
        if (data.code) {
          this.page = this.page + 1;
          const dataTemp = data.data;
          const list = [...this.list, ...dataTemp];
          this.list = fix.sort(list, 'status');
          callback(dataTemp.length, this.showSize);
        }
      });
    },
  },
};
</script>
