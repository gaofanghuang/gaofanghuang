<template>
  <div class="project-todo-wrap">
    <el-table stripe border :data="list" style="width: 100%" v-loading="listLoading">
      <el-table-column label="版本号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.version || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优先级" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.sort | sortMap }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <span>{{ scope.row.content || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布日期" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.created_time | formatDate('yyyy-MM-dd') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新日期" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.updated_time | formatDate('yyyy-MM-dd') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.status | statusMap }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="showSize"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="800px">
      <el-form ref="form" label-width="80px">
        <div class="project-todo-edit">
          <el-row>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-select v-model="curItem.status" placeholder="请选择状态">
                  <el-option
                    v-for="item in state"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="优先级">
                <el-select v-model="curItem.sort" placeholder="请选择状态">
                  <el-option
                    v-for="item in sorts"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="内容">
            <el-input v-model="curItem.content" placeholder="请填写内容"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="saveTODO">确 定</el-button>
      </span>
    </el-dialog>
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

const SORTS = [
  {
    id: 1,
    name: '无关紧要',
  },
  {
    id: 2,
    name: '低',
  },
  {
    id: 3,
    name: '中',
  },
  {
    id: 4,
    name: '高',
  },
  {
    id: 5,
    name: '紧急',
  },
];

export default {
  data() {
    return {
      id: this.$route.params.id,
      list: [],
      state: STATES,
      sorts: SORTS,
      title: '',
      dialogVisible: false,
      curItem: {},
      page: 1,
      showSize: 10,
      total: 0,
      listLoading: false,
      saveLoading: false,
    };
  },
  filters: {
    statusMap(status) {
      return STATES.find(item => item.id === status).name;
    },
    sortMap(sort) {
      return SORTS.find(item => item.id === sort).name;
    },
  },
  props: ['info'],
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const params = {
        page: this.page,
        showSize: this.showSize,
      };
      this.listLoading = true;
      api.getTODO(this.id, params).then(({ data }) => {
        if (data.code) {
          let _data = [];
          if (data.data.length > 0) {
            _data = data.data;
            _data.forEach((item, index) => {
              const _str = item._id.toString().substr(0, 8);
              const _date = new Date(Number(parseInt(_str, 16).toString() + '000')).getTime();
              _data[index].created_time = _date;
            });
          }
          this.list = _data;
          this.total = data.total;
          this.listLoading = false;
        }
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
    },
    handleAdd() {
      this.title = '添加TODO';
      this.dialogVisible = true;
      this.curItem = {
        content: '',
        status: 1,
        sort: 1,
      };
    },
    handleDelete(row) {
      this.$confirm(`此操作将永久删除该项TODO, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          api.deleteTODO(this.id, row._id).then(({ data }) => {
            this.$message({
              type: 'success',
              message: data.message,
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    handleEdit(row) {
      this.title = '编辑TODO';
      this.dialogVisible = true;
      this.curItem = {
        ...row,
      };
    },
    saveTODO() {
      const params = {
        sort: this.curItem.sort,
        status: this.curItem.status,
        content: this.curItem.content,
      };
      this.saveLoading = true;
      if (this.curItem._id) {
        api.updatedTODO(this.id, this.curItem._id, params).then(({ data }) => {
          this.$message({
            message: data.message,
            type: 'success',
          });
          this.dialogVisible = false;
          this.saveLoading = false;
          this.getList();
        });
      } else {
        params.version = this.info.version;
        api.addTODO(this.id, params).then(({ data }) => {
          this.$message({
            message: data.message,
            type: 'success',
          });
          this.dialogVisible = false;
          this.saveLoading = false;
          this.getList();
        });
      }
    },
  },
};
</script>
