<template>
  <div class="login-wrap">
    <div class="login-header">
      <div class="logo"></div>
    </div>
    <div class="login-box">
      <div class="login-box-title">后台管理系统</div>
      <el-form ref="form">
        <el-form-item>
          <el-input v-model="username" placeholder="请输入管理员账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="password"
            @keyup.enter="login"
            type="password"
            placeholder="请输入管理员密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" class="login-btn" type="primary" @click="login">
            {{ hasInit ? '登录' : '初始化' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as api from '@/utils/api';

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      hasInit: true,
    };
  },
  created() {
    api.getConfig().then(({ data }) => {
      if (!data.code) {
        this.hasInit = false;
      }
    });
  },
  methods: {
    login() {
      if (!this.username) {
        this.$message({
          type: 'error',
          message: '请输入账号',
        });
      }
      if (!this.password) {
        this.$message({
          type: 'error',
          message: '请输入密码',
        });
      }
      if (this.username && this.password) {
        console.log(this.hasInit ? '登录' : '初始化');
        const params = {
          username: this.username,
          password: this.password,
        };
        this.loading = true;
        if (this.hasInit) {
          api.login(params).then(({ data }) => {
            if (data.code) {
              this.$message({
                message: data.message,
                type: 'success',
              });
              this.$store.commit('Login', data.data);
              this.loading = false;
              this.$router.push(`/`);
            } else {
              this.loading = false;
            }
          });
        } else {
          api.initConfig(params).then(({ data }) => {
            if (data.code) {
              this.$message({
                message: data.message,
                type: 'success',
              });
              this.hasInit = true;
              this.login();
            } else {
              this.loading = false;
            }
          });
        }
      }
    },
  },
};
</script>

<style lang="scss">
.login-wrap {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-header {
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
.login-box {
  width: 360px;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 10px;
  padding: 20px;
  .login-btn {
    width: 100%;
    margin-top: 20px;
  }
}
.login-box-title {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 40px;
  color: #333333;
}
</style>
