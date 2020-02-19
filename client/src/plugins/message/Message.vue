<template>
  <transition name="move-down-in" @enter="handleEnter" @leave="handleLeave">
    <div class="message-item" v-show="show" :class="msgTypleClass">
      <Icon v-if="msgTypeIcon" :name="msgTypeIcon" />
      <span class="message-content">{{ content || defaultContent }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    icon: { type: String, default: '' },
    type: { type: String, default: 'default' },
    duration: { type: Number, default: 3000 },
    content: { type: String, default: '' },
    onClose: { type: Function, default: () => {} },
    closable: { type: Boolean, default: false },
    name: { type: String, required: true },
  },
  computed: {
    msgTypleClass() {
      return `message-item_${this.type}`;
    },
    msgTypeIcon() {
      const icons = {
        info: 'info-circle',
        success: 'check-circle',
        warning: 'warning-circle',
        error: 'close-circle',
        default: '',
      };
      return this.icon || icons[this.type];
    },
    defaultContent() {
      if (this.type === 'success') {
        return '操作成功。';
      }
      return '发生未知错误，请尝试刷新。';
    },
  },
  mounted() {
    this.show = true;
    this.clearCloseTimer();
    if (this.duration !== 0) {
      this.closeTimer = setTimeout(() => {
        this.show = false;
        this.close();
      }, this.duration);
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
.message-item {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  background: #ffffff;
  box-shadow: 0 9px 16px rgba($color: $primary, $alpha: 0.02);
  .icon {
    flex-shrink: 0;
    margin-right: 10px;
  }
  .message-content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &_info {
    background: lighten($color: $info, $amount: 48%);
    color: darken($color: $info, $amount: 15%);
    box-shadow: 0 9px 16px rgba($color: $info, $alpha: 0.02);
  }
  &_success {
    background: lighten($color: $success, $amount: 42%);
    color: darken($color: $success, $amount: 15%);
    box-shadow: 0 9px 16px rgba($color: $success, $alpha: 0.02);
  }
  &_warning {
    background: lighten($color: $warning, $amount: 38%);
    color: darken($color: $warning, $amount: 15%);
    box-shadow: 0 9px 16px rgba($color: $warning, $alpha: 0.02);
  }
  &_error {
    background: lighten($color: $error, $amount: 36%);
    color: darken($color: $error, $amount: 15%);
    box-shadow: 0 9px 16px rgba($color: $error, $alpha: 0.02);
  }
}
</style>
