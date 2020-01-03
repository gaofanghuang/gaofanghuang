<template>
  <div class="imglist-wrap">
    <div class="imglist-list flex" :style="listStyle">
      <div
        class="imglist-item"
        @click="viewBig(img.path)"
        v-for="img in list"
        :key="`img-${img.id}`"
      >
        <img :src="img.path | getImg" />
      </div>
    </div>
    <div class="imglist-total">{{ curIndex + 1 }} / {{ list.length }}</div>
    <div class="imglist-prev" @click="prevItem">
      <Icon name="left" />
    </div>
    <div class="imglist-next" @click="nextItem">
      <Icon name="right" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curIndex: 0,
    };
  },
  computed: {
    itemW() {
      return document.querySelector('.imglist-wrap') ? document.querySelector('.imglist-wrap').clientWidth : 315;
    },
    allW() {
      return this.itemW * this.list.length;
    },
    listStyle() {
      return {
        width: this.allW + 'px',
        transform: `translateX(-${this.itemW * this.curIndex}px)`,
      };
    },
  },
  props: ['list'],
  methods: {
    nextItem() {
      this.curIndex += 1;
      if (this.curIndex > this.list.length - 1) {
        this.curIndex = 0;
      }
    },
    prevItem() {
      this.curIndex -= 1;
      if (this.curIndex < 0) {
        this.curIndex = this.list.length - 1;
      }
    },
    viewBig(path) {
      this.$store.commit('toggleBigImg', {
        showBigImg: true,
        bigPath: path,
      });
    },
  },
};
</script>

<style lang="scss">
.is-pc.ignore {
  .imglist-wrap {
    position: relative;
    height: 500px;
    overflow: hidden;
    user-select: none;

    .imglist-list {
      flex-shrink: 0;
      transition: 0.6s ease-in-out;
    }

    .imglist-total {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: $white;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      padding: 0 10px;
      background: rgba($color: #000000, $alpha: 0.12);
      font-size: 12px;
    }

    .imglist-item {
      width: 900px;
      img {
        margin-left: auto;
        margin-right: auto;
        display: block;
      }
    }

    .imglist-prev,
    .imglist-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
      color: $white;
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 30px;
      text-align: center;
      padding: 0 12px;
      background: rgba($color: #000000, $alpha: 0.24);
      opacity: 0.4;
      font-size: 20px;
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        opacity: 1;
      }
    }

    .imglist-next {
      left: auto;
      right: 10px;
    }
  }
}
.is-mobile {
  .imglist-wrap {
    position: relative;
    height: 350px;
    overflow: hidden;
    user-select: none;

    .imglist-list {
      flex-shrink: 0;
      transition: 0.6s ease-in-out;
    }

    .imglist-total {
      position: absolute;
      bottom: 10px;
      right: 10px;
      color: $white;
      height: 36px;
      line-height: 36px;
      border-radius: 18px;
      padding: 0 12px;
      background: rgba($color: #000000, $alpha: 0.12);
      font-size: 24px;
    }

    .imglist-item {
      width: 100%;
      img {
        margin-left: auto;
        margin-right: auto;
        display: block;
      }
    }

    .imglist-prev,
    .imglist-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
      color: $white;
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 30px;
      text-align: center;
      padding: 0 12px;
      background: rgba($color: #000000, $alpha: 0.24);
      opacity: 0.4;
      font-size: 20px;
      cursor: pointer;
      transition: 0.2s;

      &:hover {
        opacity: 1;
      }
    }

    .imglist-next {
      left: auto;
      right: 10px;
    }
  }
}
</style>
