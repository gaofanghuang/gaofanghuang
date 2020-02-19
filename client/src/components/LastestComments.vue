<template>
  <div class="latest-comments-wrap">
    latest-comments
  </div>
</template>

<script>
import * as api from '@/services/api';
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      api.getComments().then(({ data }) => {
        console.log(data);
      });
    },
  },
};
</script>

<style lang="scss">
.latest-comments-wrap {
  border: 1px solid $border-color;
  border-radius: 4px;
  padding: 20px;
}
</style>
