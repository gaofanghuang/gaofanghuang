<template>
  <header class="header-wrap flex flex-both">
    <div class="header-logo" v-if="!showBack">
      <img :src="logoPath" alt="logo" />
    </div>
    <div class="header-back" @click="goBack" v-if="showBack">
      <Icon name="arrowleft" />
    </div>
    <div class="header-nav" @click="toggleSideBar">
      <Icon name="menu" />
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import mLogo from '@/assets/logo.png';

export default {
  data() {
    return {
      logoPath: mLogo,
      showBack: false,
    };
  },
  computed: {
    ...mapGetters(['darkMode']),
  },
  watch: {
    $route() {
      this.showBack = this.$route.meta.back;
    },
  },
  methods: {
    toggleSideBar() {
      console.log('切换侧边栏');
      this.$bus.$emit('toggleSideBar', true);
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
.header-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 120px;
  background: #fff;
  box-shadow: 0 0 9px rgba($color: #000000, $alpha: 0.08);
}
.header-logo {
  width: 120px;
  height: 120px;
}
.header-back,
.header-nav {
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  font-size: 32px;
  .icon {
    font-size: 48px;
  }
}
.header-nav {
  @include thin-border(left, $border-color);
}
.is-dark {
  .header-wrap {
    background: $black;
    box-shadow: 0 0 9px rgba($color: $light, $alpha: 0.18);
  }
  .header-nav {
    @include thin-border(left, $gray);
  }
}
</style>
