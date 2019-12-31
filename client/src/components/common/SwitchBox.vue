<template>
  <div class="switchbox-wrap ignore" @click="toggleSwitch" :class="{ 'is-open': isStatus }">
    <div class="swithbox-dot"></div>
  </div>
</template>

<script>
export default {
  name: 'SwitchBox',
  props: ['status'],
  data() {
    return {
      isStatus: false,
    };
  },
  model: {
    prop: 'status',
    event: 'toStatus',
  },
  created() {
    this.checkStatus();
  },
  methods: {
    checkStatus() {
      if (typeof this.status === 'boolean') {
        this.isStatus = this.status;
      } else {
        this.isStatus = this.status === '1';
      }
    },
    toggleSwitch() {
      this.isStatus = !this.isStatus;
      this.$emit('toStatus', this.isStatus);
      this.$emit('change');
    },
  },
};
</script>

<style lang="scss">
.switchbox-wrap {
  display: flex;
  width: 100px;
  height: 40px;
  border: 1px solid darken($color: $border-color, $amount: 5%);
  border-radius: 20px;
  position: relative;
  background-color: #f2f2f2;
  box-shadow: 0 0 12px rgba($color: #000000, $alpha: 0.08) inset;
  transition: background-color 0.4s;
  cursor: pointer;
  &.is-open {
    background-color: $primary;
    border: none;
    .swithbox-dot {
      transform: translate(46px, -50%);
      border: none;
    }
  }
}
.swithbox-dot {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-5px, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 3px 18px rgba($color: #000000, $alpha: 0.08);
  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
}
.is-dark {
  .switchbox-wrap {
    background-color: $gray;
    border: none;
    box-shadow: 0 0 12px rgba($color: $gray, $alpha: 0.08) inset;
  }
  .swithbox-dot {
    background: $primary;
    box-shadow: 0 3px 18px rgba($color: $light, $alpha: 0.08);
  }
}
.is-pc {
  .switchbox-wrap.ignore {
    width: 46px;
    height: 16px;
    border-radius: 8px;
    &.is-open {
      .swithbox-dot {
        transform: translate(30px, -50%);
      }
    }
    .swithbox-dot {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
