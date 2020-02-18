<template>
  <header id="header" class="header-wrap">
    <div class="header-logo">
      <img src="../assets/GAOFANG_c.png" alt="logo" />
    </div>
    <div class="header-nav">
      <router-link v-for="item in navs" class="header-nav-item" :key="item.name" :to="item.path">
        <Icon :name="item.icon" />
        <span class="header-nav-name">{{ item.name }}</span>
      </router-link>
    </div>
    <div class="header-btns">
      <div class="header-search-btn" @click="goToSearch">
        <Icon name="search" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        {
          icon: 'home',
          name: 'Home',
          path: '/',
        },
        {
          icon: 'block',
          name: 'Project',
          path: '/projects',
        },
        {
          icon: 'heart',
          name: 'Checklist',
          path: '/checklist',
        },
        {
          icon: 'comment',
          name: 'Comments',
          path: '/comments',
        },
        {
          icon: 'android-fill',
          name: 'Client',
          path: '/client',
        },
        {
          icon: 'smile',
          name: 'About',
          path: '/about',
        },
      ],
    };
  },
  methods: {
    goToSearch() {
      this.$router.push('/search');
    },
  },
};
</script>

<style lang="scss">
.header-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background: #ffffff;
  color: $primary;
  transition: 0.6s;
  opacity: 0.68;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 9px 16px rgba($color: $primary, $alpha: 0.08);
  font-family: 'moon-regular';
  z-index: 9;
  &:hover {
    opacity: 1;
  }
  .header-logo {
    width: 123px;
    height: 18px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .header-nav-item {
    transition: 0.6s;
    letter-spacing: 1px;
    .icon {
      margin-right: 6px;
    }
    &:hover {
      color: $active;
    }
    & + .header-nav-item {
      margin-left: 20px;
    }
  }
  .header-btns {
    display: flex;
  }
  .header-search-btn {
    cursor: pointer;
    .icon {
      font-size: 24px;
    }
    transition: 0.6s;
    &:hover {
      color: $active;
    }
  }
}
</style>
