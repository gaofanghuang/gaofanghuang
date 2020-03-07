<template>
  <div class="upload-wrap" :class="{ 'type-cover': !btn, 'type-btn': btn }">
    <img v-if="path && !btn" :src="path | getImg" class="upload-img" />
    <i v-if="!path && !btn" class="el-icon-plus upload-icon"></i>
    <el-button v-if="btn" size="medium" type="primary">上传图片</el-button>
    <input
      type="file"
      v-if="!reset"
      :multiple="multiple"
      class="upload-inp"
      ref="uploadFile"
      @change="getFile"
    />
  </div>
</template>

<script>
import * as api from '@/utils/api';
export default {
  props: {
    path: {
      type: String,
      default: '',
    },
    btn: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: '1',
    },
  },
  data() {
    return {
      images: [],
      reset: false,
    };
  },
  methods: {
    beforeCoverUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isGIF = file.type === 'image/gif';
      const isLt2M = file.size / 1024 / 1024 / 1024 < 2;

      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 200KB!');
      }
      return (isJPG || isPNG || isGIF) && isLt2M;
    },
    async getFile(filesData) {
      const files = filesData.target.files;
      if (this.multiple) {
        for (const file of files) {
          const base64 = await this.getBase64(file);
          const image = await this.uploadFile(base64, this.category);
          this.images.push({
            _id: image._id,
            path: image.path,
          });
        }
      } else {
        const file = files[0];
        const base64 = await this.getBase64(file);
        const image = await this.uploadFile(base64, this.category);
        this.images.push({
          _id: image._id,
          path: image.path,
        });
      }
      this.$emit('change', this.multiple ? this.images : this.images[0]);
      this.reset = true;
      this.images = [];
      setTimeout(() => {
        this.reset = false;
      }, 300);
    },
    async getBase64(file) {
      return new Promise((resolve, reject) => {
        const check = this.beforeCoverUpload(file);
        if (!check) {
          reject(false);
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    },
    async uploadFile(base64, category) {
      return new Promise((resolve, reject) => {
        /**
         * category: 1 默认分类 2 表情分类
         */
        api
          .uploadImg({
            base64: base64,
            category: category,
          })
          .then(({ data }) => {
            if (data.code) {
              resolve(data.data);
            } else {
              reject(false);
            }
          });
      });
    },
  },
};
</script>

<style lang="scss">
.upload-wrap {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;

  align-content: center;
  position: relative;

  &.type-cover {
    justify-content: center;
    width: 200px;
    height: 200px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;

    &:hover {
      border-color: #409eff;
    }

    .upload-icon {
      font-size: 28px;
      color: #8c939d;
      width: 28px;
      height: 28px;
      line-height: 28px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .upload-img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }

  &.type-btn {
    justify-content: end;
    justify-content: flex-end;
  }

  .upload-inp {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
</style>
