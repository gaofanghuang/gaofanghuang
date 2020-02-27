<template>
  <div class="music-bar-wrap">
    <div class="music-bar-box">
      <div class="music-bar-play" @click="togglePlay()">
        <Icon :name="play ? 'poweroff-circle-fill' : 'caret-right'" />
      </div>
      <div class="music-bar-next" @click="nextMusic()">
        <Icon name="step-forward" />
      </div>
      <div class="music-bar-title" v-if="curItem" :title="curItem.title">{{ curItem.title }}</div>
      <transition name="fadeIn">
        <div class="music-bar-wave" v-if="play">
          <i v-for="item in wave" :key="item"></i>
        </div>
      </transition>
    </div>
    <div class="music-bar-iframe" v-if="play">
      <iframe
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        width="280"
        height="52"
        :src="`//music.163.com/outchain/player?type=2&id=${curItem.id}&auto=1&height=32`"
      ></iframe>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';

export default {
  data() {
    return {
      play: true,
      list: [],
      curIndex: 0,
      curItem: {},
      wave: 30,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    togglePlay() {
      this.play = !this.play;
    },
    nextMusic() {
      this.curIndex += 1;
      if (this.curIndex > this.list.length - 1) {
        this.curIndex = 0;
      }
      this.curItem = this.list[this.curIndex];
    },
    getList() {
      api.getMusic().then(({ data }) => {
        if (data.code) {
          this.list = data.data;
          this.curItem = this.list.length ? this.list[0] : null;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.music-bar-wrap {
  border: 1px solid $border-color;
  border-radius: 4px;
  padding: 20px;
  height: 120px;
  overflow: hidden;
  .music-bar-box {
    background: #fcfcfc;
    height: 80px;
    border-radius: 8px;
    position: relative;
  }
  .music-bar-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    color: #999999;
    white-space: nowrap;
    max-width: 120px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .music-bar-next,
  .music-bar-play {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 32px;
    color: #999999;
    opacity: 0.1;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .music-bar-play {
    left: 10px;
  }
  .music-bar-next {
    right: 10px;
  }
  .music-bar-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 18px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    i {
      width: 5px;
      height: 18px;
      background: #999999;
      opacity: 0.1;
    }
    @for $i from 1 through 30 {
      i:nth-of-type(#{$i}) {
        animation: wave random(6) + s ease-in-out infinite;
        animation-delay: random() s;
      }
    }
  }
  .music-bar-iframe {
    opacity: 0;
  }
}
</style>
