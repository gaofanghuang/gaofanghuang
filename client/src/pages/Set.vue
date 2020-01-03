<template>
  <div class="set-wrap">
    <div class="set-group">
      <div class="set-group-title">基本设置</div>
      <div class="set-group-item">
        <div class="set-item-info">
          <div class="set-item-label">深色模式</div>
          <div class="set-item-content">调整背景色为深色，减轻视觉疲劳</div>
        </div>
        <div class="set-item-swtich">
          <SwitchBox v-model="isDarkMode" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isDarkMode: false,
    };
  },
  computed: {
    ...mapGetters(['darkMode']),
  },
  created() {
    this.isDarkMode = this.darkMode;
  },
  watch: {
    isDarkMode() {
      this.$store.commit('ToggleDarkMode', this.isDarkMode);
    },
  },
};
</script>

<style lang="scss" scoped>
// 移动端
.set-wrap {
  padding: 20px;
}
.set-group {
  margin-bottom: 40px;
}
.set-group-title {
  font-size: 28px;
  color: $primary;
  margin-bottom: 20px;
}
.set-group-item {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include thin-border(bottom, darken($border-color, 5%));
}
.set-item-label {
  font-size: 32px;
  margin-bottom: 10px;
}
.set-item-content {
  font-size: 24px;
  color: $light;
}
.is-dark {
  .set-group-item {
    @include thin-border(bottom, $gray);
  }
}
// pc端
.is-pc.ignore {
  .set-wrap {
    padding: 20px;
    width: 900px;
    margin-left: auto;
    margin-right: auto;
    .set-group {
      margin-bottom: 20px;
    }
    .set-group-title {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .set-group-item {
      height: 80px;
    }
    .set-item-label {
      font-size: 18px;
      margin-bottom: 10px;
    }
    .set-item-content {
      font-size: 14px;
      color: $light;
    }
  }
  &.is-dark {
    .set-wrap.ignore {
      .set-group-item {
        border-bottom: 1px solid #444;
      }
    }
  }
}
</style>
