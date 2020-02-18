<template>
  <transition :name="transitionName" @enter="handleEnter" @leave="handleLeave">
    <div :class="classes">
      <svg :class="[`${prefixCls}-icon`]">
        <use :xlink:href="`#${icon}`" xmlns:xlink="http://www.w3.org/1999/xlink" />
      </svg>
      <span class="ellipsis">{{ content }}</span>
    </div>
  </transition>
</template>
<script>
const prefixCls = 'v-msg';
export default {
  props: {
    type: { type: String, default: 'message' },
    duration: { type: Number, default: 3 },
    closable: { type: Boolean, default: false },
    transitionName: { type: String, default: '' },
    icon: { type: String, default: 'msg-info' },
    content: { type: String, required: true },
    onClose: { type: Function, default: () => {} },
    name: { type: String, required: true },
  },
  data() {
    return {
      prefixCls,
    };
  },
  computed: {
    classes() {
      return [prefixCls, `${prefixCls}__${this.type}`];
    },
    /**
     *  Default message.
     *
     * @return {string}
     * @author Seven Du <shiweidu@outlook.com>
     */
    defaultMessage() {
      if (this.type === 'success') {
        return '成功！';
      }

      return '发生错误了，请刷新重试！';
    },
  },
  mounted() {
    this.clearCloseTimer();
    if (this.duration !== 0) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.duration * 1000);
    }
  },
  beforeDestroy() {
    this.clearCloseTimer();
  },
  methods: {
    clearCloseTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    },
    close() {
      this.clearCloseTimer();
      this.onClose();
      this.$parent.close(this.name);
    },
    handleEnter() {},
    handleLeave() {},
  },
};
</script>
<style lang="scss">
.v-msg-list {
  font-size: 12px;
  position: fixed;
  z-index: 1010;
  width: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.v-msg {
  display: flex;
  align-items: center;
  font-size: 30px;
  color: #000;
  &-icon {
    margin: 0 10px;
    width: 32px;
    height: 32px;
  }
  &-notice {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 5px 0 #ededed;
    border-radius: 8px;
  }
  &__message {
    svg {
      flex: 0 0 auto;
    }
    position: absolute;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 20px;
    width: 100%;
    height: 90px;
    background-color: #fff;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.12);
  }
}

.move-up-appear,
.move-up-enter-active,
.move-up-leave-active,
.move-down-appear,
.move-down-enter-active,
.move-down-leave-active {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-play-state: paused;
}

.move-up-appear,
.move-up-enter-active {
  animation-name: moveUpIn;
  animation-play-state: running;
}

.move-up-leave-active {
  animation-name: moveUpOut;
  animation-play-state: running;
  animation-timing-function: ease-in-out;
}

.move-up-appear,
.move-up-enter-active,
.move-down-appear,
.move-down-enter-active {
  opacity: 0;
  animation-timing-function: ease-in-out;
}

.move-down-appear,
.move-down-enter-active {
  animation-name: moveDownIn;
  animation-play-state: running;
}

.move-down-leave-active {
  animation-name: moveDownOut;
  animation-play-state: running;
  animation-timing-function: ease-in-out;
}

@keyframes moveUpIn {
  0% {
    transform-origin: 0 0;
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform-origin: 0 0;
    transform: translateY(0%);
    opacity: 1;
  }
}

@keyframes moveUpOut {
  0% {
    transform-origin: 0 0;
    transform: translateY(0%);
    opacity: 1;
  }
  100% {
    transform-origin: 0 0;
    transform: translateY(-100%);
    opacity: 0;
  }
}

@keyframes ivuMoveDownIn {
  0% {
    transform-origin: 0 0;
    transform: translateY(100%);
    opacity: 0;
  }

  to {
    transform-origin: 0 0;
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes ivuMoveDownOut {
  0% {
    transform-origin: 0 0;
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform-origin: 0 0;
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>
