<template>
  <div class="todo-item-wrap" :class="`todo-state-${item.status}`">
    <div class="todo-item-info">
      <span class="todo-sort-tips" :class="item.status === 1 && `todo-sort-${item.sort}`">{{
        item.sort | sortMap
      }}</span>
      <span class="todo-state-tips">{{ item.status | statusMap }}</span>
      <span class="todo-item-version">{{ item.version }} · {{ item.updated_time | formatDate('yyyy-MM-dd') }}</span>
    </div>
    <div class="todo-item-cotent">
      {{ item.content }}
    </div>
    <div class="todo-state-icon" v-if="item.status === 2 || item.status === 3">
      <Icon :name="item.status === 2 ? 'check' : 'close'" />
    </div>
  </div>
</template>

<script>
const STATES = [
  {
    id: 1,
    name: '开发中',
  },
  {
    id: 2,
    name: '已完成',
  },
  {
    id: 3,
    name: '已废弃',
  },
];

const SORTS = [
  {
    id: 1,
    name: '无关紧要',
  },
  {
    id: 2,
    name: '低',
  },
  {
    id: 3,
    name: '中',
  },
  {
    id: 4,
    name: '高',
  },
  {
    id: 5,
    name: '紧急',
  },
];

export default {
  data() {
    return {};
  },
  props: ['item'],
  filters: {
    statusMap(status) {
      return STATES.find(item => item.id === status).name;
    },
    sortMap(sort) {
      return SORTS.find(item => item.id === sort).name;
    },
  },
};
</script>

<style lang="scss">
.todo-item-wrap {
  margin-bottom: 20px;
  padding: 20px;
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  .todo-item-info {
    margin-bottom: 20px;
    font-size: 12px;
    color: $light;
  }
  .todo-state-tips {
    display: inline-block;
    margin-right: 10px;
    border: 1px solid $border-color;
    color: $light;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
  }
  .todo-sort-tips {
    display: inline-block;
    margin-right: 10px;
    background: #f2f2f2;
    color: $light;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
  }
  &.todo-state-3,
  &.todo-state-2 {
    opacity: 0.5;
  }
  .todo-state-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 32px;
    color: $light;
    opacity: 0.2;
  }
  .todo-sort-5 {
    background: $error;
    color: #ffffff;
  }
  .todo-sort-4 {
    background: $warning;
    color: #ffffff;
  }
  .todo-sort-3 {
    background: $primary;
    color: #ffffff;
  }
  .todo-item-version {
    display: inline-block;
    margin-right: 10px;
    color: #d1d1d1;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
  }
}
</style>
