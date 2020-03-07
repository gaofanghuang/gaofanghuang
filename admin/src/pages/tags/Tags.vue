<template>
  <div class="tags-wrap">
    <div class="tags-tool">
      <el-button size="medium" type="primary" @click="handleAdd">添加标签</el-button>
    </div>

    <el-tree
      :data="tags"
      node-key="_id"
      default-expand-all
      :expand-on-click-node="treeNodeClickExpand"
      :props="defaultProps"
      v-loading="listLoading"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="custom-tree-node-label">{{ data.name }}</span>
        <span>
          <el-button type="text" v-if="!data.pid" size="mini" @click="() => addItem(data)">
            添加
          </el-button>
          <el-button type="text" size="mini" @click="() => editItem(data)">
            编辑
          </el-button>
          <el-button type="text" size="mini" @click="() => removeItem(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="300px">
      <el-form ref="form" label-width="80px">
        <el-form-item label="上级标签">
          <el-select v-model="curItem.pid" placeholder="请选择上级标签">
            <el-option v-for="item in plist" :key="item._id" :label="item.name" :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签名称">
          <el-input v-model="curItem.name"></el-input>
        </el-form-item>
        <el-form-item label="标签排序">
          <el-input v-model="curItem.sort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveItem" :loading="saveLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/utils/api';
import fix from '@/utils/fix';

export default {
  data() {
    return {
      plist: [],
      tags: [],
      curItem: {},
      title: '',
      treeNodeClickExpand: false,
      dialogVisible: false,
      saveLoading: false,
      listLoading: false,
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    };
  },
  created() {
    this.getList();
  },
  computed: {
    height() {
      let winH = document.documentElement.clientHeight;
      return winH - 168 + 'px';
    },
  },
  methods: {
    addItem(data) {
      this.title = '添加子标签';
      this.dialogVisible = true;
      this.curItem = {
        pid: data._id,
        name: '',
        sort: 0,
      };
    },
    editItem(data) {
      this.title = '编辑子标签';
      this.dialogVisible = true;
      this.curItem = {
        ...data,
      };
    },
    removeItem(node, data) {
      this.$confirm(`此操作将永久删除标签【${data.name}】, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.handleDelete(data);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    handleAdd() {
      this.title = '添加标签';
      this.dialogVisible = true;
      this.curItem = {
        pid: '',
        name: '',
        sort: 0,
      };
    },
    handleDelete(item) {
      api.deleteTag(item._id).then(({ data }) => {
        if (data.code) {
          this.$message({
            type: 'success',
            message: data.message,
          });
          this.getList();
        }
      });
    },
    getList() {
      this.listLoading = true;
      api.getTags().then(({ data }) => {
        if (data.code) {
          const tempData = data.data;
          let tempPdata = [];
          let tempTdata = [];
          if (tempData.length > 0) {
            tempPdata = tempData.filter(item => {
              return !item.pid;
            });
            tempPdata = fix.sort(tempPdata, 'sort');
            const tempCdata = tempData.filter(item => {
              return item.pid;
            });
            tempTdata = JSON.parse(JSON.stringify(tempPdata));
            for (let i in tempTdata) {
              let children = [];
              for (let item of tempCdata) {
                if (tempTdata[i]._id === item.pid) {
                  children.push(item);
                }
              }
              tempTdata[i].children = fix.sort(children, 'sort');
            }
          }
          this.tags = tempTdata;
          this.plist = tempPdata;
          this.$store.commit('SaveTags', data.data);
          this.listLoading = false;
        } else {
          this.$message({
            type: 'error',
            message: '获取标签列表',
          });
        }
      });
    },
    saveItem() {
      let params = {
        pid: this.curItem.pid,
        name: this.curItem.name,
        sort: this.curItem.sort,
      };
      this.saveLoading = true;
      if (this.curItem._id) {
        api.updatedTag(this.curItem._id, params).then(({ data }) => {
          if (data.code) {
            this.$message({
              message: data.message,
              type: 'success',
            });
            this.saveLoading = false;
            this.dialogVisible = false;
            this.getList();
          }
        });
      } else {
        api.addTag(params).then(({ data }) => {
          if (data.code) {
            this.$message({
              message: data.message,
              type: 'success',
            });
            this.saveLoading = false;
            this.dialogVisible = false;
            this.getList();
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
.tags-wrap {
  .cell {
    text-align: center;
  }

  .tags-tool {
    text-align: right;
    margin-bottom: 20px;
  }

  .el-table--scrollable-y .el-table__body-wrapper {
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba($color: #999999, $alpha: 0.2);
      transition: 0.2s;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba($color: #000000, $alpha: 0);
    }

    &:hover::-webkit-scrollbar-thumb {
      background-color: rgba($color: #999999, $alpha: 0.6);
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>
