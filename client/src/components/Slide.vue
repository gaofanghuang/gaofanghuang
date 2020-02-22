<template>
  <div class="slide-wrap">
    <transition-group name="fadeIn" tag="div" class="slide-list">
      <div
        class="slide-item flex flex-x flex-y"
        v-for="(item, index) in list"
        :key="item._id"
        v-show="cIndex === index"
      >
        <img :src="item.path | getImg" />
      </div>
    </transition-group>
    <div class="slide-btns">
      <div class="slide-btn-prev flex flex-x flex-y" @click="toNext()">
        <Icon name="left" />
      </div>
      <div class="slide-btn-next flex flex-x flex-y" @click="toPrev()">
        <Icon name="right" />
      </div>
    </div>
    <div class="slide-page">{{ cIndex + 1 }} / {{ list.length }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cIndex: 0,
    };
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.cIndex = this.index;
  },
  methods: {
    toPrev() {
      this.cIndex += 1;
      if (this.cIndex > this.list.length - 1) {
        this.cIndex = 0;
      }
    },
    toNext() {
      this.cIndex -= 1;
      if (this.cIndex < 0) {
        this.cIndex = this.list.length - 1;
      }
    },
  },
};
</script>

<style lang="scss">
.slide-wrap {
  width: 100%;
  height: 320px;
  position: relative;
  overflow: hidden;
  .slide-list {
    width: 100%;
    height: 100%;
  }
  .slide-item {
    width: 100%;
    height: 100%;
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }
  .slide-btns {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
  .slide-btn-next,
  .slide-btn-prev {
    position: absolute;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    text-align: center;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      background: #f2f2f2;
    }
  }
  .slide-btn-prev {
    left: 0;
  }
  .slide-btn-next {
    right: 0;
  }
  .slide-page {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: $light;
  }
}
</style>
