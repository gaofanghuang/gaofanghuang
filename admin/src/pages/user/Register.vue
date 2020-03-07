<template>
  <div class="register-wrap">
    <div class="register-header">
      <div class="logo"></div>
    </div>
    <div class="register-box">
      <div class="register-box-title">后台管理系统</div>
      <el-form ref="form">
        <el-form-item>
          <el-input v-model="username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" type="password" placeholder="请输入管理员密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="passwordConfirm" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="register-btn" type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as api from '@/utils/api';
import Check from '@/utils/check';

export default {
  data() {
    return {
      username: '',
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },
  methods: {
    register() {
      if (this.checkForm()) {
        console.log('注册');
        const params = {
          username: this.username,
          nickname: this.nickname,
          email: this.email,
          password: this.password,
        };
        api.register(params).then(({ data }) => {
          if (data.code) {
            this.$message({
              message: data.message,
              type: 'success',
            });
            this.$router.push(`/login`);
          } else {
            this.$message({
              message: data.message,
              type: 'error',
            });
          }
        });
      }
    },
    checkForm() {
      if (!this.username) {
        this.$message({
          type: 'error',
          message: '请输入账号',
        });
        return false;
      }
      if (!this.nickname) {
        this.$message({
          type: 'error',
          message: '请输入昵称',
        });
        return false;
      }
      if (!this.email) {
        this.$message({
          type: 'error',
          message: '请输入邮箱',
        });
        return false;
      }
      if (!Check.isEmail(this.email)) {
        this.$message({
          type: 'error',
          message: '邮箱格式不正确',
        });
        return false;
      }
      if (!this.password) {
        this.$message({
          type: 'error',
          message: '请输入密码',
        });
        return false;
      }
      if (!this.passwordConfirm) {
        this.$message({
          type: 'error',
          message: '请确认密码',
        });
        return false;
      }
      if (this.password !== this.passwordConfirm) {
        this.$message({
          type: 'error',
          message: '密码不一致',
        });
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
.register-wrap {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  background: #262626;
  padding-left: 20px;
  padding-top: 20px;
  .logo {
    height: 30px;
    background: url('../../assets/GAOFANG.png') no-repeat;
  }
}
.register-box-title {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 40px;
  color: #333333;
}
.register-box {
  width: 360px;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 10px;
  padding: 20px;

  .register-btn {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
