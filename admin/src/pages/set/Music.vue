<template>
  <div class="music-wrap">
    <div class="music-add">
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="音乐id">
              <el-input v-model="newItem.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="音乐标题">
              <el-input v-model="newItem.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="2">
            <el-button type="primary" :loading="saveLoading" @click="handleAdd">添加</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table v-loading="listLoading" stripe border :data="list" style="width: 100%">
      <el-table-column label="音乐id">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="音乐名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as api from '@/utils/api';

export default {
  data() {
    return {
      list: [],
      newItem: {
        id: '',
        title: '',
      },
      listLoading: false,
      saveLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      api.getMusic().then(({ data }) => {
        if (data.code) {
          this.list = data.data;
          this.listLoading = false;
        }
      });
    },
    handleAdd() {
      if (!this.newItem.title) {
        this.$message({
          type: 'error',
          message: '请填写音乐标题',
        });
        return;
      }
      if (!this.newItem.id) {
        this.$message({
          type: 'error',
          message: '请填写音乐id',
        });
        return;
      }
      this.saveLoading = true;
      api.addMusic(this.newItem).then(({ data }) => {
        if (data.code) {
          this.$message({
            type: 'success',
            message: data.message,
          });
          this.saveLoading = false;
          this.getList();
          this.newItem = {
            id: '',
            title: '',
          };
        }
      });
    },
    handleDelete(row) {
      this.$confirm(`此操作将永久删除音乐${row.title}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          api.deleteMusic(row._id).then(({ data }) => {
            if (data.code) {
              this.$message({
                type: 'success',
                message: data.message,
              });
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
  },
};
</script>

<style lang="scss">
.music-add {
  margin-bottom: 20px;
  padding-top: 20px;
}
</style>
