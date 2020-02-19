<template>
  <div class="comment-input-wrap">
    <div class="comment-user-info">
      <div class="comment-user-info-item comment-input-username">
        <input type="text" v-model="userName" placeholder="请输入您的昵称*" required />
      </div>
      <div class="comment-user-info-item comment-input-useremail">
        <input type="text" v-model="userEmail" placeholder="请输入您的邮箱*" required />
      </div>
      <div class="comment-user-info-item comment-input-usersite">
        <input type="text" v-model="userSite" placeholder="请输入您的站名" />
      </div>
      <div class="comment-user-info-item comment-input-userurl">
        <input type="text" v-model="userUrl" placeholder="请输入您的站址" />
      </div>
    </div>
    <div class="comment-input-box">
      <textarea
        placeholder="请输入评论内容*"
        spellcheck="false"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        v-model="content"
      >
      </textarea>
      <div
        class="comment-input-submit flex flex-x flex-y"
        v-loading="!canSubmit"
        @click="submitComment"
      >
        <span>提交评论</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';
import format from '@/services/format';
import Message from '@/plugins/message';

export default {
  data() {
    return {
      userName: '',
      userEmail: '',
      userSite: '',
      userUrl: '',
      content: '',
      canSubmit: true,
    };
  },
  methods: {
    submitComment() {
      if (this.checkForm()) {
        if (!this.canSubmit) {
          return;
        }
        this.canSubmit = false;
        const params = {
          userName: this.userName,
          userEmail: this.userEmail,
          userSite: this.userSite,
          userUrl: this.userUrl,
          content: this.content,
        };
        api.submitComment(params).then(({ data }) => {
          if (data.code) {
            this.userName = '';
            this.userEmail = '';
            this.userSite = '';
            this.userUrl = '';
            this.content = '';
            this.$emit('refresh');
            Message.success('提交评论成功');
            this.canSubmit = true;
          }
        });
      }
    },
    checkForm() {
      if (!this.userName) {
        Message.error('请输入您的昵称');
        return false;
      }
      if (this.userName.length > 20) {
        Message.error('昵称长度不能超过20个字符');
        return false;
      }
      if (!this.userEmail) {
        Message.error('请输入您的邮箱');
        return false;
      }
      if (!format.isEmail(this.userEmail)) {
        Message.error('邮箱格式不正确');
        return false;
      }
      if (this.userSite.length > 20) {
        Message.error('站名长度不能超过20个字符');
        return false;
      }
      if (this.userUrl && !format.isUrl(this.userUrl)) {
        Message.error('站址格式不正确');
        return false;
      }
      if (!this.content) {
        Message.error('请输入评论内容');
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
.comment-input-wrap {
  .comment-input-box {
    width: 100%;
    height: 120px;
    border: 1px solid $border-color;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    textarea {
      width: 100%;
      padding: 10px 16px;
      font-family: 'PingFang SC', 'Microsoft Yahei', 'WenQuanYi Micro Hei';
      color: #999999;
      &::placeholder {
        color: #dddddd;
      }
    }
    .comment-input-submit {
      position: absolute;
      bottom: 10px;
      right: 10px;
      height: 30px;
      width: 80px;
      background: linear-gradient(45deg, $primary, $green);
      color: #ffffff;
      font-size: 12px;
      border-radius: 4px;
      cursor: pointer;
      user-select: none;
    }
  }
  .comment-user-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .comment-user-info-item {
    width: calc((100% - 10px) / 2);
    height: 36px;
    border: 1px solid $border-color;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;
    input {
      padding: 0 16px;
      font-family: 'PingFang SC', 'Microsoft Yahei', 'WenQuanYi Micro Hei';
      color: #999999;
      &::placeholder {
        color: #dddddd;
      }
    }
  }
}
</style>
