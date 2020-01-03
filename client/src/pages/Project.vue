<template>
  <div class="list-wrap">
    <div class="list-banner flex flex-x flex-bottom">
      <div class="list-banner-title">已发布项目{{ list.length }}个</div>
    </div>
    <div class="list-container">
      <div class="list-filter flex">
        <div class="list-filter-title">标签：</div>
        <div class="list-filter-tags flex" :class="{ show: tagShow }">
          <div
            class="list-filter-tag"
            @click="filterTag('all')"
            :class="{ active: tag.length === 0 }"
          >
            全部
          </div>
          <div
            class="list-filter-tag"
            :class="{ active: hasTag(item.id) }"
            @click="filterTag(item.id)"
            v-for="item in tags"
            :key="`tag-${item.id}`"
          >
            {{ item.name }}
          </div>
          <div class="list-filter-more" @click="tagShow = !tagShow">
            {{ tagShow ? '收起' : '展开' }}
          </div>
        </div>
      </div>
      <div class="list-filter mt20 flex">
        <div class="list-filter-title">排序：</div>
        <div class="list-filter-sorts flex">
          <div
            class="list-filter-sort"
            :class="{ active: sort === 'first' }"
            @click="sortList('first')"
          >
            发布时间
          </div>
          <div
            class="list-filter-sort"
            :class="{ active: sort === 'last' }"
            @click="sortList('last')"
          >
            更新时间
          </div>
        </div>
      </div>
      <div class="list-content mt10 flex">
        <router-link
          tag="div"
          class="list-item"
          v-for="item in filterList"
          :key="`item-${item.id}`"
          :to="`/project/${item.id}`"
        >
          <div class="list-item-cover">
            <img v-if="item.cover" :src="item.cover.path | getImg" :alt="item.name" />
          </div>
          <div class="list-item-word">
            <div class="list-item-name">{{ item.name }}</div>
            <div class="list-item-tags">
              <span
                class="list-item-tag"
                v-for="tag in item.tag.slice(0, 3)"
                :key="`item-${item.id}-tag-${tag}`"
                v-text="mapTag(tag)"
              ></span>
            </div>
            <div class="list-item-time">
              <Icon name="time-circle" />
              <span v-if="sort === 'first'">{{ item.id | formatDate('yyyy-MM-dd') }}</span>
              <span v-if="sort === 'last'">{{ item.lasttime | formatDate('yyyy-MM-dd') }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';

import { mapState } from 'vuex';

export default {
  data() {
    return {
      list: [],
      filterList: [],
      tags: [],
      tagShow: false,
      sort: 'first',
      tag: [],
    };
  },
  computed: {
    ...mapState({
      projectList: state => state.list || [],
      projectTags: state => state.tags || [],
    }),
  },
  created() {
    if (this.projectList.length === 0) {
      this.getList();
    } else {
      this.list = [...this.projectList];
      this.filterList = [...this.projectList];
    }
    if (this.projectTags.length === 0) {
      this.getTags();
    } else {
      this.tags = [...this.projectTags];
    }
  },
  methods: {
    mapTag(id) {
      let tag = '';
      if (this.tags.length > 0) {
        tag = this.tags.filter(item => {
          return item.id == id;
        });
        tag = tag[0].name;
      }
      return tag;
    },
    getList() {
      api.getList().then(({ data }) => {
        data.sort((a, b) => {
          return b.lasttime - a.lasttime;
        });
        this.list = data;
        this.filterList = data;
        this.$store.commit('SaveList', this.list);
      });
    },
    filterTag(id) {
      if (id === 'all') {
        this.tag = [];
        this.filterList = [...this.list];
      } else {
        let hasItem = this.tag.findIndex(item => {
          return item == id;
        });
        if (hasItem > -1) {
          this.tag = this.tag.filter(item => {
            return item != id;
          });
        } else {
          this.tag.push(id);
        }
        if (this.tag.length === 0) {
          this.filterList = [...this.list];
        } else {
          let _list = [];
          for (let item of this.list) {
            let tags = item.tag.join(',').toLowerCase();
            let hasItem = false;
            for (let tag of this.tag) {
              if (tags.indexOf(tag) > -1) {
                hasItem = true;
              }
            }
            if (hasItem) {
              _list.push(item);
            }
          }
          this.filterList = _list;
        }
      }
    },
    hasTag(id) {
      let hasItem = this.tag.findIndex(item => {
        return item == id;
      });
      return hasItem > -1;
    },
    getTags() {
      api.getTags().then(({ data }) => {
        let _data = [];
        for (let item of data) {
          if (item.tags && item.tags.length > 0) {
            for (let tag of item.tags) {
              _data.push({
                pid: item.id,
                ...tag,
              });
            }
          }
        }
        this.tags = _data;
        this.$store.commit('SaveTags', _data);
      });
    },
    sortList(sort) {
      this.sort = sort;
      if (sort == 'first') {
        let _list = this.list.sort((a, b) => {
          return b.id - a.id;
        });
        this.list = _list;
      } else {
        let _list = this.list.sort((a, b) => {
          return b.lasttime - a.lasttime;
        });
        this.list = _list;
      }
    },
  },
};
</script>

<style lang="scss">
// 公用
.list-wrap {
  .list-banner {
    background: darken($color: $background-color, $amount: 2%);
    color: $light;
  }
  .list-content {
    flex-wrap: wrap;
  }
  .list-filter-tags {
    position: relative;
    flex-wrap: wrap;
    overflow: hidden;
    line-height: 1.4;

    .list-filter-more {
      position: absolute;
      top: 0;
      right: 0;
      color: $light;
    }
    &.show {
      overflow: unset;
      height: auto !important;
    }
  }
  .list-filter-tag {
    display: inline-block;
    color: $gray;
    cursor: pointer;
    transition: 0.2s;
    &.active {
      background: #eaeaef;
    }
  }
  .list-filter-title {
    flex-shrink: 0;
  }
  .list-item {
    overflow: hidden;
  }
  .list-item-cover {
    width: 100%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .list-item-word {
    width: 100%;
    position: relative;
    background: $white;
  }
  .list-item-tags {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .list-item-tag {
    display: inline-block;
    color: $light;
    cursor: pointer;
    transition: 0.2s;
    background: #f9f9f9;
  }

  .list-item-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
  }

  .list-item-time {
    color: $light;
    padding-top: 0;
    display: flex;
    align-items: center;
  }
  .list-filter-sorts {
    position: relative;
    overflow: hidden;
    color: $gray;

    &::after {
      position: absolute;
      top: 0;
      left: 49.7%;
      content: '';
      width: 0.6%;
      height: 100%;
      background: #eaeaef;
    }
  }
  .list-filter-sort {
    width: 50%;
    height: 100%;

    &.active {
      background: #eaeaef;
    }
  }
}
// pc端
.is-pc.ignore {
  .list-wrap {
    .list-banner {
      margin-top: -90px;
      height: 350px;
      padding-bottom: 10px;
    }

    .list-container {
      width: 900px;
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
    }

    .list-filter-tags {
      height: 26px;
      padding-right: 40px;

      .list-filter-more {
        padding: 3px 10px;
        font-size: 12px;
        cursor: pointer;

        &:hover {
          color: $primary;
        }
      }
    }

    .list-filter-tag {
      padding: 3px 10px;
      margin-right: 6px;
      margin-bottom: 6px;
      border-radius: 4px;
      font-size: 12px;
      &:hover {
        background: #eaeaef;
      }
    }

    .list-item {
      cursor: pointer;
      width: 210px;
      border-radius: 4px;
      margin-bottom: 20px;
      margin-right: 20px;
      &:nth-of-type(4n) {
        margin-right: 0;
      }
      &:hover img {
        filter: none;
      }
    }

    .list-item-cover {
      height: 180px;
    }

    .list-item-tags {
      padding: 10px;
    }

    .list-item-tag {
      font-size: 12px;
      padding: 4px 6px;
      border-radius: 4px;
      margin-right: 10px;
    }

    .list-item-name {
      padding-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 18px;
    }

    .list-item-time {
      font-size: 12px;
      padding: 10px;
      .icon {
        font-size: 15px;
        margin-right: 5px;
      }
    }

    .list-filter-sorts {
      top: -3px;
      height: 28px;
      line-height: 26px;
      border-radius: 14px;
      font-size: 12px;
      cursor: pointer;
    }

    .list-filter-sort {
      padding: 0 10px;
    }
  }
}
// 移动端
.is-mobile {
  .list-wrap {
    .list-banner {
      height: 350px;
      padding-bottom: 10px;
    }
    .list-container {
      padding: 20px;
      margin-top: 20px;
      padding: 20px;
    }

    .list-filter-tags {
      height: 48px;
      overflow-x: auto;
      flex-wrap: nowrap;
      .list-filter-tag {
        flex-shrink: 0;
        padding: 3px 10px;
        margin-right: 6px;
        margin-bottom: 6px;
        border-radius: 8px;
        font-size: 24px;
      }
      .list-filter-more {
        display: none;
      }
    }

    .list-filter-title {
      font-size: 24px;
      display: flex;
      align-self: flex-start;
    }

    .list-item {
      width: 325px;
      border-radius: 8px;
      margin-bottom: 20px;
      margin-right: 20px;

      &:nth-of-type(2n) {
        margin-right: 0;
      }
    }

    .list-item-cover {
      height: 300px;
    }

    .list-item-tags {
      padding: 10px;
    }

    .list-item-tag {
      font-size: 24px;
      padding: 4px 6px;
      border-radius: 4px;
      margin-right: 10px;
    }

    .list-filter-sorts {
      top: -8px;
      height: 48px;
      line-height: 48px;
      border-radius: 24px;
      font-size: 24px;
    }

    .list-item-name {
      padding-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 18px;
    }

    .list-item-time {
      font-size: 12px;
      padding: 10px;
      .icon {
        font-size: 15px;
        margin-right: 5px;
      }
    }

    .list-filter-sort {
      padding: 0 14px;
    }
  }
}
.is-dark {
  .list-wrap {
    .list-banner {
      background: darken($color: $black, $amount: 3%);
    }
    .list-filter-sorts {
      background: darken($color: $black, $amount: 3%);
    }
    .list-filter-tag {
      &.active {
        background: $gray;
        color: $light;
      }
    }
    .list-filter-sort {
      &.active {
        background: $gray;
        color: $light;
      }
    }
    .list-item-word {
      background: darken($color: $black, $amount: 3%);
      color: $light;
    }
    .list-item-tag {
      background: $black;
      color: $gray;
    }
  }
  &.is-pc {
    .list-filter-tag {
      &:hover {
        background: $gray !important;
        color: $light;
      }
    }
  }
}
</style>
