<template>
  <div class="entry-wrap" @click="tapItem">
    <div class="entry-left">
      <div class="entry-icon" v-if="icon">
        <Icon :name="icon" />
      </div>
      <div class="entry-label">{{ content }}</div>
    </div>
    <div class="entry-right">
      <div class="entry-value" v-if="value">{{ value }}</div>
      <div class="entry-arrow" v-if="arrow">
        <Icon name="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Entry',
  props: {
    content: String,
    icon: String,
    value: String,
    arrow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    tapItem() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss">
.entry-wrap {
  width: 100%;
  height: 100px;
  line-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  .entry-left {
    display: flex;
    align-items: center;
  }
  .entry-arrow {
    font-size: 36px;
    color: $light;
  }
  .entry-icon {
    margin-right: 20px;
    font-size: 48px;
  }
}
</style>
