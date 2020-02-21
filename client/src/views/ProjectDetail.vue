<template>
  <div class="project-detail-wrap">
    <div class="project-detail-banner flex flex-x flex-y">
      <div class="project-detail-container project-detail-info" v-if="info">
        <div class="project-detail-cover">
          <img v-if="info.cover" :src="info.cover.path | getImg" />
        </div>
        <div class="project-detail-word">
          <div class="project-detail-name flex flex-y">
            {{ info.name }}
            <span class="project-detail-version" v-if="info.version">
              {{ info.version }}
            </span>
          </div>
          <div class="project-detail-describe">{{ info.describe }}</div>
          <div class="project-detail-sth flex flex-bottom flex-both">
            <div class="project-detail-tags" v-if="info.tag && info.tag.length > 0">
              <TagMap :list="info.tag" />
            </div>

            <div class="project-detail-url">
              <a v-if="info.url" :href="info.url" :title="info.url" target="_blank">
                <Icon name="chrome-fill" />
              </a>
              <a v-if="info.github" :href="info.github" :title="info.github" target="_blank">
                <Icon name="github-fill" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="project-detail-container">
      <div class="type-navigation">
        <div class="type-navigation-btns">
          <span
            class="type-navigation-item"
            @click="type = 'todo'"
            :class="{ active: type === 'todo' }"
          >
            待办
          </span>
          <span
            class="type-navigation-item"
            @click="type = 'log'"
            :class="{ active: type === 'log' }"
          >
            记录
          </span>
        </div>
      </div>
      <TodoPane v-show="type === 'todo'" />
      <LogPane v-show="type === 'log'" />
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';
import LogPane from '@/components/LogPane';
import TodoPane from '@/components/TodoPane';

export default {
  data() {
    return {
      id: this.$route.params.id,
      info: null,
      page: 1,
      showSize: 10,
      list: [],
      type: 'todo',
    };
  },
  components: {
    LogPane,
    TodoPane,
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      api.getProjectInfo(this.id).then(({ data }) => {
        if (data.code) {
          const dataTemp = data.data;
          this.info = dataTemp;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.project-detail-wrap {
  .project-detail-banner {
    width: 100%;
    height: 320px;
    background: #f2f2f2;
  }
  .project-detail-container {
    width: 100%;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
    padding: 40px 0;
  }
  .project-detail-info {
    display: flex;
  }
  .project-detail-cover {
    width: 180px;
    height: 180px;
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .project-detail-word {
    padding-left: 20px;
    display: flex;
    flex-wrap: wrap;
    width: calc(100% -140px);
  }
  .project-detail-name {
    width: 100%;
    font-size: 18px;
    margin-bottom: 10px;
    .project-detail-version {
      display: inline-block;
      margin-left: 10px;
      background: #eaeaea;
      color: $light;
      font-size: 12px;
      padding: 2px 6px;
      border-radius: 4px;
    }
  }
  .project-detail-describe {
    width: 100%;
    font-size: 14px;
    color: $light;
    margin-bottom: 20px;
    word-break: break-all;
  }
  .project-detail-sth {
    width: 100%;
  }
  .project-detail-url {
    a {
      display: inline-block;
      margin-left: 20px;
      color: $light;
      font-size: 24px;
      transition: 0.2s;
      &:hover {
        color: $primary;
      }
    }
  }
  .type-navigation {
    position: relative;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #efefef;
    font-size: 12px;
    color: #666666;
    margin-top: 40px;
    margin-bottom: 60px;
  }
  .type-navigation-btns {
    position: absolute;
    top: -16px;
    user-select: none;
  }
  .type-navigation-item {
    display: inline-block;
    margin-right: 20px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    padding: 0 20px;
    border: 1px solid $border-color;
    background: #ffffff;
    cursor: pointer;
    &:hover:not(.active) {
      border: 1px solid darken($color: $border-color, $amount: 5%);
    }
    &.active {
      border: 1px solid $primary;
      background: $primary;
      color: #ffffff;
    }
  }
}
</style>
