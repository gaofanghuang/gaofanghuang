<template>
  <el-container>
    <el-aside width="200px">
      <SideBar />
    </el-aside>
    <el-container>
      <el-header>
        <div class="com-header-title">{{ title }}</div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from '@/components/SideBar';
export default {
  components: {
    SideBar,
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
  },
};
</script>

<style lang="scss">
.el-aside {
  min-height: 100vh;
  background: #333333;
  color: #ffffff;
}

.el-header {
  position: fixed;
  top: 0;
  left: 200px;
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #eaeaea;
  line-height: 60px;
  font-size: 16px;
  font-weight: 700;
  color: #666;
  letter-spacing: 2px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  z-index: 9;
}

.el-header + .el-main {
  margin-top: 60px;
}
</style>
