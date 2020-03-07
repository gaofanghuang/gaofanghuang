<template>
  <div class="set-wrap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="系统设置" name="set">
        <Set />
      </el-tab-pane>
      <el-tab-pane label="音乐挂件" name="music">
        <Music />
      </el-tab-pane>
      <el-tab-pane label="关于我" name="about">
        <About />
      </el-tab-pane>
      <!-- <el-tab-pane label="数据备份" name="backup">
        <Backup />
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import Set from './Set';
import About from './About';
import Music from './Music';
// import Backup from './Backup';

export default {
  data() {
    return {
      activeName: 'set',
    };
  },
  components: {
    Set,
    About,
    Music,
    // Backup,
  },
  methods: {
    handleClick(e) {
      this.activeName = e.name;
    },
  },
};
</script>
