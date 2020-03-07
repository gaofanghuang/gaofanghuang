<template>
  <div class="about-wrap">
    <el-form ref="form" label-width="60px">
      <el-form-item>
        <MDeditor v-model="content" placeholder="请输入自我介绍" />
      </el-form-item>
      <el-form-item>
        <el-button class="save-btn" :loading="loading" type="primary" @click="saveAbout">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as api from '@/utils/api';
import MDeditor from '@/components/MDeditor';

export default {
  data() {
    return {
      loading: false,
      content: '',
    };
  },
  created() {
    api.getAbout().then(({ data }) => {
      if (data.code) {
        this.content = data.data.content;
      }
    });
  },
  components: {
    MDeditor,
  },
  methods: {
    saveAbout() {
      if (!this.content) {
        this.$message({
          message: '请输入自我介绍',
          type: 'error',
        });
        return;
      }
      const params = {
        content: this.content,
      };
      api.updatedAbout(params).then(({ data }) => {
        if (data.code) {
          this.$message({
            message: data.message,
            type: 'success',
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.about-wrap {
  padding: 20px;
  .save-btn {
    margin-top: 40px;
  }
}
</style>
