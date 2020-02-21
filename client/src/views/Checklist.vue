<template>
  <div class="checklist-wrap">
    <div class="checklist-banner flex flex-x flex-y">Checklist</div>
    <div class="checklist-container">
      <LoadMore @onRefresh="onRefresh" @onLoadMore="onLoadMore">
        <transition-group tag="div" class="checklist-list" name="fadeIn">
          <ChecklistItem v-for="item in list" :item="item" :key="item._id" />
        </transition-group>
      </LoadMore>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';
import LoadMore from '@/components/LoadMore';
import ChecklistItem from '@/components/ChecklistItem';

export default {
  data() {
    return {
      page: 1,
      showSize: 10,
      list: [],
    };
  },
  components: {
    LoadMore,
    ChecklistItem,
  },
  methods: {
    onRefresh(callback = () => {}) {
      const params = {
        page: 1,
        showSize: this.showSize,
      };
      api.getChecklist(params).then(({ data }) => {
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
      api.getChecklist(params).then(({ data }) => {
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

<style lang="scss">
.checklist-wrap {
  .checklist-banner {
    width: 100%;
    height: 320px;
    background: #f2f2f2;
    color: #dddddd;
    font-family: 'moon-light';
    letter-spacing: 3px;
    font-size: 48px;
  }
  .checklist-container {
    width: 100%;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
    padding: 40px 0;
  }
  .checklist-list {
    display: flex;
    flex-wrap: wrap;
  }
  .checklist-item-wrap {
    width: calc((100% - 40px) / 3);
    margin-bottom: 20px;
    margin-right: 20px;
    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
}
</style>
