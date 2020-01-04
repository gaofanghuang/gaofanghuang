<template>
  <div class="header-pc">
    <div class="header-pc-box">
      <div class="header-pc-logo">
        <img :src="logoPath" alt="logo" />
      </div>
      <div class="header-pc-nav">
        <router-link
          tag="div"
          class="header-pc-nav-item"
          :class="{ active: isCurPath('/index') }"
          to="/index"
          >首页</router-link
        >
        <router-link
          tag="div"
          class="header-pc-nav-item"
          :class="{ active: isCurPath('/project') }"
          to="/project"
          >项目</router-link
        >
        <router-link
          tag="div"
          class="header-pc-nav-item"
          :class="{ active: isCurPath('/about') }"
          to="/about"
          >关于我</router-link
        >
        <router-link
          tag="div"
          class="header-pc-nav-item"
          :class="{ active: isCurPath('/set') }"
          to="/set"
          >设置</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import mLogo from '@/assets/logo.png';

export default {
  data() {
    return {
      logoPath: mLogo,
    };
  },
  computed: {
    ...mapGetters(['darkMode']),
  },
  methods: {
    isCurPath(path) {
      return this.$route.fullPath.includes(path);
    },
  },
};
</script>

<style lang="scss">
.is-pc.ignore {
  .header-pc {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 14px;
    z-index: 9;
    .header-pc-box {
      width: 100%;
      height: 48px;
      background: #fff;
      box-shadow: 0 0 9px rgba($color: #000000, $alpha: 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 24px;
      overflow: hidden;
    }
    .header-pc-logo {
      width: 48px;
      height: 48px;
      border-radius: 24px;
      overflow: hidden;
    }
    .header-pc-nav {
      display: flex;
    }
    .header-pc-nav-item {
      padding: 0 20px;
      line-height: 48px;
      color: $gray;
      cursor: pointer;
      &:hover {
        color: $active;
        text-shadow: 0 0 3px rgba($color: darken($active, 5%), $alpha: 0.28);
      }
    }
    .active {
      color: $primary;
      text-shadow: 0 0 3px rgba($color: darken($primary, 5%), $alpha: 0.28);
    }
  }
}
.is-dark {
  .header-pc {
    .header-pc-box {
      background: $black;
      box-shadow: 0 0 9px rgba($color: $light, $alpha: 0.18);
    }
    .header-pc-logo {
      img {
        filter: grayscale(100%);
        filter: gray;
      }
    }
  }
}
</style>
