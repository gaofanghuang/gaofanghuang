<template>
  <div class="set-wrap">
    <el-form ref="form">
      <el-form-item label="开放注册">
        <el-switch v-model="form.canRegister"></el-switch>
      </el-form-item>
      <el-form-item label="允许评论">
        <el-switch v-model="form.canComment"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button class="save-btn" :loading="loading" type="primary" @click="saveSet">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as api from '@/utils/api';

export default {
  data() {
    return {
      loading: false,
      form: {
        canRegister: false,
        canComment: false,
      },
    };
  },
  created() {
    api.getConfig().then(({ data }) => {
      if (data.code) {
        this.form.canRegister = data.data.canRegister;
        this.form.canComment = data.data.canComment;
      }
    });
  },
  methods: {
    saveSet() {
      const params = {
        canRegister: this.form.canRegister,
        canComment: this.form.canComment,
      };
      api.updatedConfig(params).then(({ data }) => {
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
.set-wrap {
  padding: 20px;
  .save-btn {
    margin-top: 40px;
  }
}
</style>
