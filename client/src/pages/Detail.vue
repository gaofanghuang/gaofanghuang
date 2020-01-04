<template>
  <div class="detail-wrap">
    <div class="detail-banner">
      <div class="detail-container flex">
        <div class="detail-cover">
          <img v-if="detail.cover" :src="detail.cover.path | getImg" :alt="detail.name" />
        </div>
        <div class="detail-info">
          <div class="detail-name">{{ detail.name }}</div>
          <div class="detail-describe">{{ detail.describe }}</div>
          <div class="detail-tags">
            <Icon name="tags" class="mr5" />
            <span
              class="detail-tag"
              v-for="tag in detail.tag"
              :key="`tag-${tag}`"
              v-text="mapTag(tag)"
            ></span>
          </div>
          <div class="detail-time">
            <Icon name="time-circle" class="mr5" />
            {{ detail.lasttime | formatDate('yyyy-MM-dd') }}
          </div>
          <div class="detail-urls">
            <div class="detail-qrcode" v-if="detail.qrcode && !isMobile">
              <Icon name="qrcode" />
              <div class="detail-qrcode-drop">
                <canvas id="qrcode"></canvas>
              </div>
            </div>
            <div class="detail-site ml10" v-if="detail.url">
              <a :href="detail.url"><Icon name="chrome-fill"/></a>
            </div>
            <div class="detail-github ml10" v-if="detail.github">
              <a :href="detail.github"><Icon name="github-fill"/></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-content">
      <div class="detail-container">
        <div class="detail-logs">
          <div class="detail-logs-item" v-for="item in logs" :key="`logs-${item.id}`">
            <div class="detail-logs-date">
              <span class="year">{{ item.lasttime | formatDate('yyyy') }}</span>
              <span>{{ item.lasttime | formatDate('MM/dd') }}</span>
            </div>
            <div class="detail-logs-content">
              <span
                class="detail-logs-version"
                :class="{ 'is-new-version': showVersion(item.version) }"
                >v{{ item.version }}</span
              >

              <template v-if="item.type == 1">
                <div class="detail-log-box">
                  <div class="detail-log-title" v-if="item.title">{{ item.title }}</div>
                  <div class="detail-log-todo-list">
                    <div
                      class="detail-log-todo-item flex flex-y"
                      v-for="(todo, index) in item.todo"
                      :key="`todo-${todo.id}`"
                    >
                      <span class="detail-log-todo-sort">{{ index + 1 }}.</span>
                      <span
                        class="detail-log-todo-content"
                        :class="{ 'is-checked': todo.checked }"
                        >{{ todo.content }}</span
                      >
                      <span class="detail-log-todo-status"
                        ><Icon name="check" v-if="todo.checked"
                      /></span>
                    </div>
                  </div>
                </div>
              </template>

              <template v-if="item.type == 2">
                <div class="detail-log-box">
                  <div class="detail-log-title" v-if="item.title">{{ item.title }}</div>
                  <div class="detail-log-article">
                    <articleBox :content="item.content" />
                  </div>
                </div>
              </template>

              <template v-if="item.type == 3">
                <div class="detail-log-box">
                  <div class="detail-log-title" v-if="item.title">{{ item.title }}</div>
                  <div class="detail-log-imglist">
                    <imgList :list="item.imgs" />
                  </div>
                </div>
              </template>

              <template v-if="item.type == 4">
                <div class="detail-log-box">
                  <div class="detail-log-title" v-if="item.title">{{ item.title }}</div>
                  <iframe
                    :src="`//player.bilibili.com/player.html?aid=${item.video}`"
                    width="100%"
                    height="500px"
                    scrolling="no"
                    border="0"
                    frameborder="no"
                    framespacing="0"
                    allowfullscreen="true"
                  >
                  </iframe>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';
import QRCode from 'qrcode';
import imgList from '@/components/imgList';
import articleBox from '@/components/articleBox';
import { clientOS } from '@/services/utils';

import { mapState } from 'vuex';

export default {
  data() {
    return {
      id: this.$route.params.id,
      isMobile: clientOS().isMobile,
      logs: [],
    };
  },
  computed: {
    ...mapState({
      projectList: state => state.list || [],
      tags: state => state.tags || [],
    }),
    detail() {
      return this.projectList.length > 0 ? this.projectList.find(item => item.id == this.id) : {};
    },
  },
  created() {
    this.getLogs();
  },
  mounted() {
    if (this.detail.qrcode) {
      const canvas = document.getElementById('qrcode');
      const qrcodeUrl = this.detail.qrcode;
      QRCode.toCanvas(canvas, qrcodeUrl, {
        width: this.isMobile ? 80 : 120,
      });
    }
  },
  components: {
    imgList,
    articleBox,
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
    getLogs() {
      let params = {
        id: this.id,
      };
      api.getLogs(params).then(({ data }) => {
        if (data.length > 0) {
          data.sort((a, b) => {
            return b.lasttime - a.lasttime;
          });
        }
        this.logs = data;
      });
    },
    showVersion(v) {
      let res = false;
      if (v.split('.')[2] == 0) {
        res = true;
      }
      return res;
    },
  },
};
</script>

<style lang="scss">
// 公用
.detail-wrap {
  .detail-banner {
    background: darken($color: $background-color, $amount: 2%);
    color: $light;
  }
  .detail-name {
    width: 100%;
    color: $black;
  }
  .detail-cover {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .detail-describe {
    width: 100%;
  }
  .detail-tags {
    width: 100%;
  }
  .detail-tag {
    display: inline-block;
    background: #e9e9e9;
  }
  .detail-urls {
    display: flex;
  }
}
// pc端
.is-pc.ignore {
  .detail-wrap {
    .detail-banner {
      margin-top: -90px;
      height: 350px;
      padding-bottom: 20px;
      display: flex;
    }
    .detail-container {
      width: 900px;
      margin-left: auto;
      margin-right: auto;
      align-self: flex-end;
    }
    .detail-cover {
      width: 200px;
      height: 200px;
    }
    .detail-info {
      position: relative;
      width: calc(100% - 220px);
      padding-left: 20px;
      display: flex;
      flex-wrap: wrap;
    }
    .detail-name {
      font-size: 24px;
    }
    .detail-describe {
      font-size: 14px;
      margin-top: 20px;
      margin-bottom: 20px;
      height: 60px;
    }
    .detail-tag {
      padding: 4px 10px;
      margin-right: 10px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background: #e2e2e2;
      }
    }
    .detail-time {
      font-size: 12px;
      align-self: flex-end;
    }
    .detail-urls {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 20px;
      .icon {
        cursor: pointer;
        &:hover {
          color: $black;
        }
      }
    }
    .detail-qrcode {
      position: relative;
      cursor: pointer;

      .icon:hover + .detail-qrcode-drop {
        opacity: 1;
      }
    }

    .detail-qrcode-drop {
      position: absolute;
      top: 34px;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 120px;
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0 3px 9px rgba(#000000, 0.08);
      opacity: 0;
      transition: 0.2s;
      z-index: 9;

      &::before {
        position: absolute;
        content: '';
        top: -9px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 0 9px 9px;
        border-style: solid;
        border-color: transparent transparent #ffffff;
      }

      canvas {
        width: 120px;
        height: 120px;
      }
    }
    .detail-content {
      padding-top: 40px;
    }
    .detail-logs {
      padding-left: 40px;
    }
    .detail-logs-item {
      position: relative;
      margin-bottom: 40px;
    }
    .detail-logs-content {
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding-top: 40px;
      background: #ffffff;
      border-radius: 12px;
    }
    .detail-log-title {
      margin-bottom: 40px;
      font-size: 18px;
      text-align: center;
      font-weight: 600;
    }
    .detail-logs-date {
      position: absolute;
      left: -100px;
      top: 0;
      font-size: 18px;
      text-align: right;
      width: 100px;
      padding-right: 10px;
      font-weight: 200;
      color: $light;
      .year {
        display: block;
        font-size: 12px;
        font-weight: 600;
      }
    }
    .detail-logs-version {
      position: absolute;
      top: 0;
      left: 0;
      background: $primary;
      color: #ffffff;
      padding: 4px;
      border-top-left-radius: 12px;
      border-bottom-right-radius: 12px;
      font-size: 14px;
    }
    .detail-log-todo-list {
      padding: 0 20px;
      .detail-log-todo-item {
        font-size: 14px;
        height: 20px;
        margin-bottom: 20px;

        .is-checked {
          color: $light;
          text-decoration: line-through;
        }
      }

      .detail-log-todo-status {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        color: $light;

        em {
          display: inline-block;
          position: relative;
          width: 20px;
          height: 20px;

          &::before {
            position: absolute;
            top: 10px;
            left: 6px;
            content: '';
            width: 1px;
            height: 8px;
            background: $light;
            transform: rotate(-45deg);
          }

          &::after {
            position: absolute;
            top: 4px;
            left: 14px;
            content: '';
            width: 1px;
            height: 14px;
            background: $light;
            transform: rotate(45deg);
          }
        }
      }

      .detail-log-todo-sort {
        width: 20px;
        color: $light;
      }
    }
  }
}
// 移动端
.is-mobile {
  .detail-wrap {
    .detail-banner {
      padding: 20px;
      min-height: 350px;
      display: flex;
      text-align: center;
    }
    .detail-container {
      width: 100%;
      align-self: flex-end;
      flex-wrap: wrap;
    }
    .detail-cover {
      width: 240px;
      height: 240px;
      margin-left: auto;
      margin-right: auto;
    }
    .detail-info {
      width: 100%;
    }
    .detail-name {
      font-size: 48px;
      margin-top: 20px;
    }
    .detail-describe {
      font-size: 14px;
      margin-top: 20px;
      margin-bottom: 20px;
      height: 60px;
    }
    .detail-tag {
      padding: 4px 10px;
      margin-right: 10px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background: #e2e2e2;
      }
    }
    .detail-time {
      font-size: 24px;
      margin-top: 20px;
    }
    .detail-urls {
      font-size: 40px;
      display: flex;
      justify-content: center;
      margin-top: 20px;
      .detail-site + .detail-github {
        margin-left: 20px;
      }
    }
    .detail-content {
      padding-top: 40px;
    }
    .detail-logs {
      padding-left: 100px;
      padding-right: 20px;
    }
    .detail-logs-item {
      position: relative;
      margin-bottom: 40px;
    }
    .detail-logs-content {
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding-top: 60px;
      background: #ffffff;
      border-radius: 12px;
    }
    .detail-log-title {
      margin-bottom: 40px;
      font-size: 32px;
      text-align: center;
      font-weight: 600;
    }
    .detail-logs-date {
      position: absolute;
      left: -100px;
      top: 0;
      font-size: 24px;
      text-align: right;
      width: 100px;
      padding-right: 20px;
      font-weight: 200;
      color: $light;
      .year {
        display: block;
        font-size: 18px;
        font-weight: 600;
      }
    }
    .detail-logs-version {
      position: absolute;
      top: 0;
      left: 0;
      background: $primary;
      color: #ffffff;
      padding: 4px;
      border-top-left-radius: 12px;
      border-bottom-right-radius: 12px;
      font-size: 14px;
    }
    .detail-log-todo-list {
      padding: 0 20px;
      .detail-log-todo-item {
        font-size: 24px;
        margin-bottom: 20px;
        align-items: flex-start;

        .is-checked {
          color: $light;
          text-decoration: line-through;
        }
      }

      .detail-log-todo-status {
        display: inline-block;
        width: 20px;
        height: 48px;
        margin-right: 10px;
        color: $light;
      }

      .detail-log-todo-sort {
        width: 40px;
        color: $light;
      }
    }
  }
}
.is-dark {
  .detail-banner {
    background: darken($color: $black, $amount: 3%);
    color: $gray;
  }
  .detail-tag {
    background: $black;
  }
  .detail-name {
    color: $gray;
  }
  .detail-logs-content {
    background: darken($color: $black, $amount: 3%) !important;
    color: $light;
  }
  .detail-log-todo-item {
    .is-checked {
      color: $gray !important;
    }
  }
  .detail-logs {
    padding-bottom: 40px;
  }
  .detail-logs-item {
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
