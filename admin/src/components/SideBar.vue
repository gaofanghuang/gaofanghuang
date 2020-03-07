<template>
  <div class="sidebar-wrap">
    <div class="sidebar-head">
      <div class="logo"></div>
      <div class="sideba">后台管理系统</div>
    </div>
    <div class="sidebar-list">
      <router-link class="sidebar-item" to="/data-count">
        <i class="sidebar-icon">🍒</i> 数据统计
      </router-link>
      <router-link class="sidebar-item" to="/projects">
        <i class="sidebar-icon">🍻</i> 项目管理
      </router-link>
      <router-link class="sidebar-item" to="/checklist">
        <i class="sidebar-icon">🥕</i> 清单管理
      </router-link>
      <router-link class="sidebar-item" to="/tags">
        <i class="sidebar-icon">🍟</i> 标签管理
      </router-link>
      <router-link class="sidebar-item" to="/img-box">
        <i class="sidebar-icon">🍧</i> 图片库
      </router-link>
      <router-link class="sidebar-item" to="/users">
        <i class="sidebar-icon">😸</i> 用户管理
      </router-link>
      <router-link class="sidebar-item" to="/comments">
        <i class="sidebar-icon">👑</i> 评论管理
      </router-link>
      <router-link class="sidebar-item" to="/set">
        <i class="sidebar-icon">🍅</i> 系统设置
      </router-link>
    </div>
    <div class="sidebar-foot" @click="logout">
      退出登录
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('Logout');
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss">
.sidebar-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .sidebar-head {
    width: 100%;
    height: 58px;
    padding-top: 12px;
    text-align: left;
    border-bottom: 1px solid #292929;
    padding-left: 14px;
    font-size: 14px;
    background: #262626;
    .logo {
      height: 18px;
      background: url('../assets/GAOFANG.png') no-repeat;
      background-size: auto 100%;
    }
  }
  .sidebar-list {
    width: 100%;
    height: calc(100% - 156px);
    overflow-y: auto;
  }
  .sidebar-item {
    display: block;
    height: 48px;
    line-height: 48px;
    padding-left: 14px;
    color: #ffffff;
    border-bottom: 1px solid #292929;
    text-decoration: none;
    font-size: 14px;
    transition: 0.2s;
    &:hover {
      background: #393939;
    }
    &.router-link-active {
      background: linear-gradient(45deg, #23bed5, #23cca9);
    }
  }
  .sidebar-icon {
    display: inline-block;
    width: 24px;
    font-style: normal;
  }
  .sidebar-foot {
    align-self: flex-end;
    font-size: 14px;
    text-align: center;
    width: 100%;
    height: 48px;
    line-height: 48px;
    border-top: 1px solid #292929;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      background: #de5585;
    }
  }
}
</style>
