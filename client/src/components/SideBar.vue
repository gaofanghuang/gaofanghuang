<template>
  <Transition enter-active-class="fadeIn-enter-active" leave-active-class="fadeIn-leave-active">
    <div class="sidebar-wrap" v-if="showWrap">
      <div class="sidebar-mask" @click="closeSideBar"></div>
      <Transition
        enter-active-class="rightSwipe-enter-active"
        leave-active-class="rightSwipe-leave-active"
      >
        <div class="sidebar-box" v-if="showBox">
          <div class="sidebar-header">
            <img class="sidebar-avatar" :src="avatar" alt="avatar" />
            <div class="sidebar-userinfo">
              <p class="userinfo-name">Gaofang Huang</p>
              <p class="userinfo-signature">Front-end engineer & Web Designer</p>
            </div>
            <div class="sidebar-set" @click="goTo('/set')">
              <Icon name="setting" />
            </div>
          </div>
          <div class="sidebar-body">
            <Entry icon="home" @click="goTo('/index')" content="首页" />
            <Entry icon="block" @click="goTo('/project')" content="项目" />
            <Entry icon="smile" @click="goTo('/about')" content="关于我" />
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script>
import carrot from '@/assets/carrot.jpg';
export default {
  data() {
    return {
      avatar: carrot,
      showWrap: false,
      showBox: false,
    };
  },
  mounted() {
    this.$bus.$on('toggleSideBar', status => {
      if (status) {
        this.openSideBar();
      } else {
        this.closeSideBar();
      }
    });
  },
  watch: {
    $route() {
      this.closeSideBar();
    },
  },
  methods: {
    openSideBar() {
      this.showWrap = true;
      setTimeout(() => {
        this.showBox = true;
      }, 100);
    },
    closeSideBar() {
      this.showBox = false;
      setTimeout(() => {
        this.showWrap = false;
      }, 100);
    },
    goTo(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      } else {
        this.closeSideBar();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-wrap {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 99;
}
.sidebar-mask {
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.75);
}
.sidebar-box {
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  height: 100vh;
  background: #ffffff;
  display: flex;
  flex-wrap: wrap;
}
.sidebar-header {
  width: 100%;
  height: 360px;
  background: linear-gradient(125deg, $green, $primary);
  padding: 40px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  color: #ffffff;
  position: relative;
}
.sidebar-userinfo {
  align-self: flex-end;
}
.sidebar-set {
  position: absolute;
  top: 40px;
  right: 40px;
  font-size: 48px;
}
.sidebar-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.userinfo-name {
  font-size: 36px;
  margin-bottom: 12px;
}
.userinfo-signature {
  font-size: 24px;
}
.sidebar-body {
  width: 100%;
  align-self: flex-start;
  height: calc(100% - 120px);
  overflow-y: auto;
}
</style>
