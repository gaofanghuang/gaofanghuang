<template>
  <div class="checklist-detail-wrap">
    <div class="checklist-detail-banner flex flex-x flex-y">
      <div class="checklist-detail-container checklist-detail-info" v-if="info">
        <div class="checklist-detail-cover">
          <img v-if="info.cover" :src="info.cover.path | getImg" />
          <span class="checklist-detail-type">{{ info.type | typeMap }}</span>
        </div>
        <div class="checklist-detail-word">
          <div class="checklist-detail-name flex flex-y">
            {{ info.name }}
          </div>
          <div class="checklist-detail-describe">{{ info.describe }}</div>
          <div class="checklist-detail-sth flex flex-bottom flex-both">
            <div class="checklist-detail-tags" v-if="info.tag && info.tag.length > 0">
              <TagMap :list="info.tag" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="checklist-detail-container">
      <LoadMore @onRefresh="onRefresh" @onLoadMore="onLoadMore">
        <transition-group tag="div" class="checklist-entry-list" name="fadeIn">
          <EntryItem v-for="item in list" :item="item" :key="item._id" />
        </transition-group>
      </LoadMore>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';
import LoadMore from '@/components/LoadMore';
import EntryItem from '@/components/EntryItem';

const TYPES = [
  {
    id: 0,
    name: '综合',
  },
  {
    id: 1,
    name: '读书',
  },
  {
    id: 2,
    name: '影音',
  },
  {
    id: 3,
    name: '绘画',
  },
  {
    id: 4,
    name: '游戏',
  },
  {
    id: 5,
    name: '旅行',
  },
  {
    id: 6,
    name: '美食',
  },
  {
    id: 7,
    name: '宠物',
  },
];

export default {
  data() {
    return {
      id: this.$route.params.id,
      info: null,
      page: 1,
      showSize: 10,
      list: [],
    };
  },
  filters: {
    typeMap(type) {
      const item = TYPES.find(item => item.id === type);
      return item ? item.name : '';
    },
  },
  components: {
    EntryItem,
    LoadMore,
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      api.getCheckDetail(this.id).then(({ data }) => {
        if (data.code) {
          const dataTemp = data.data;
          this.info = dataTemp;
        }
      });
    },
    onRefresh(callback = () => {}) {
      const params = {
        page: 1,
        showSize: this.showSize,
      };
      api.getEntries(this.id, params).then(({ data }) => {
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
      api.getEntries(this.id, params).then(({ data }) => {
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
.checklist-detail-wrap {
  .checklist-detail-banner {
    width: 100%;
    height: 320px;
    background: #f2f2f2;
  }
  .checklist-detail-container {
    width: 100%;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
    padding: 40px 0;
  }
  .checklist-detail-info {
    display: flex;
  }
  .checklist-detail-cover {
    width: 180px;
    height: 180px;
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .checklist-detail-type {
    position: absolute;
    right: 0;
    top: 20px;
    padding: 2px 4px;
    background: #ffffff;
    color: $light;
    font-size: 12px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    box-shadow: -3px 3px 3px rgba($color: #000000, $alpha: 0.08);
  }
  .checklist-detail-word {
    padding-left: 20px;
    display: flex;
    flex-wrap: wrap;
    width: calc(100% -140px);
  }
  .checklist-detail-name {
    width: 100%;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .checklist-detail-describe {
    width: 100%;
    font-size: 14px;
    color: $light;
    margin-bottom: 20px;
    word-break: break-all;
  }
  .checklist-detail-sth {
    width: 100%;
  }
  .checklist-entry-list {
    border-left: 1px solid $border-color;
    padding-left: 20px;
    margin-left: 100px;
  }
  .entry-item-wrap {
    position: relative;
  }
  .entry-item-time {
    position: absolute;
    left: -100px;
    top: 0;
    text-align: right;
  }
  .entry-item-score {
    position: absolute;
    left: -120px;
    top: 60px;
    width: 80px;
    text-align: right;
  }
}
</style>
