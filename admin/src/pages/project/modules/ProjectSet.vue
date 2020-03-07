<template>
  <div class="project-set-wrap">
    <el-form ref="form" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目状态">
            <el-select v-model="status" placeholder="请选择状态">
              <el-option v-for="item in state" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目版本">
            <el-select v-model="version" placeholder="请选择版本">
              <el-option v-for="item in versions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="hr"></div>

      <el-form-item label="添加版本">
        <el-input v-model="newVersion" placeholder="请版本名称"></el-input>
      </el-form-item>
      <el-form-item v-if="versions && versions.length > 0">
        <div class="version-tips">
          已有版本：<span v-for="item in versions" :key="item">{{ item }}</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as api from '@/utils/api';

const STATES = [
  {
    id: 1,
    name: '开发中',
  },
  {
    id: 2,
    name: '已完成',
  },
  {
    id: 3,
    name: '已废弃',
  },
];

export default {
  data() {
    return {
      id: this.$route.params.id,
      state: STATES,
      status: 1,
      version: '',
      versions: [],
      newVersion: '',
      loading: false,
    };
  },
  props: ['info'],
  created() {
    this.version = this.info.version;
    this.versions = this.info.versions;
  },
  methods: {
    saveSet() {},
    handleSet() {
      const params = {
        status: this.status,
        version: this.version,
      };
      if (this.newVersion) {
        params.version = this.newVersion;
        this.version = params.version;
        this.versions.push(this.newVersion);
        params.versions = this.versions;
        this.newVersion = '';
      }
      api.updatedProject(this.id, params).then(({ data }) => {
        this.$message({
          message: data.message,
          type: 'success',
        });
        this.$emit('refresh');
      });
    },
  },
};
</script>

<style lang="scss">
.project-set-wrap {
  .hr {
    width: 100%;
    border-bottom: 1px solid #efefef;
    margin-top: 20px;
    margin-bottom: 42px;
  }
  .el-input {
    width: 217px;
  }
  .version-tips {
    font-size: 12px;
    color: #999999;
    span {
      & + span {
        &::before {
          content: '、';
        }
      }
    }
  }
}
</style>
