<template>
  <div class="comments-wrap">
    <div class="comments-tool">
      <el-button size="medium" type="primary" @click="batchDelete">
        批量删除
      </el-button>
    </div>

    <el-table
      stripe
      border
      :data="list"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column width="100" label="评论日期">
        <template slot-scope="scope">
          {{ scope.row.updated_time | formatDate('yyyy-MM-dd') }}
        </template>
      </el-table-column>

      <el-table-column label="评论人名称">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>

      <el-table-column label="评论人邮箱">
        <template slot-scope="scope">
          {{ scope.row.userEmail }}
        </template>
      </el-table-column>

      <el-table-column label="评论人站点名称">
        <template slot-scope="scope">
          {{ scope.row.userSite }}
        </template>
      </el-table-column>

      <el-table-column label="评论人站点地址">
        <template slot-scope="scope">
          {{ scope.row.userUrl }}
        </template>
      </el-table-column>

      <el-table-column label="评论内容" width="110">
        <template slot-scope="scope">
          <div class="view-content-btns">
            <el-button type="text" @click="handleView(scope.row, scope.$index + 1)"
              >查看评论内容</el-button
            >
            <el-button
              type="text"
              @click="handleViewReply(scope.row, scope.$index + 1)"
              v-if="scope.row.reply"
              >查看回复内容</el-button
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row, scope.$index + 1)">
            删除
          </el-button>
          <el-button
            size="mini"
            v-if="!scope.row.reply"
            type="primary"
            @click="handleReply(scope.row, scope.$index + 1)"
          >
            回复
          </el-button>
          <el-button disabled size="mini" v-if="scope.row.reply">已回复</el-button>
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

    <el-dialog :title="replyTitle" :visible.sync="dialogVisible" width="30%">
      <MDeditor v-model="replyContent" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doReply()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="viewContentTitle" :visible.sync="viewContentDialogVisible" width="30%">
      <div class="view-content markdown-view" v-html="viewContent"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="viewContentDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/utils/api';
import MDeditor from '@/components/MDeditor';
import md from '@/utils/markdown';

export default {
  data() {
    return {
      list: [],
      multipleSelection: [],
      replyTitle: '',
      replyId: '',
      replyContent: '',
      dialogVisible: false,
      viewContent: '',
      viewContentTitle: '',
      viewContentDialogVisible: false,
      page: 1,
      showSize: 10,
      total: 0,
    };
  },
  components: {
    MDeditor,
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const params = {
        page: this.page,
        showSize: this.showSize,
      };
      api.getComments(params).then(({ data }) => {
        if (data.code) {
          this.list = data.data;
          this.total = data.total;
        }
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDelete(row, index) {
      this.$confirm(`此操作将永久删除评论#${index}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.doDelete(row._id);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    batchDelete() {
      console.log('批量删除');
      if (this.multipleSelection.length > 0) {
        const ids = this.multipleSelection
          .map(item => {
            return item._id;
          })
          .join(',');
        this.$confirm(`此操作将永久删除评论, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.doDelete(ids);
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            });
          });
      } else {
        this.$message({
          type: 'error',
          message: '请先选择删除项',
        });
      }
    },
    handleReply(row, index) {
      console.log('回复');
      this.replyTitle = `回复评论#${index}`;
      this.replyId = row._id;
      this.dialogVisible = true;
    },
    doReply() {
      const params = {
        reply: this.replyContent,
      };
      api.replyComment(this.replyId, params).then(({ data }) => {
        if (data.code) {
          this.$message({
            type: 'success',
            message: data.message,
          });
          this.dialogVisible = false;
          this.getList();
        }
      });
    },
    doDelete(id) {
      api.deleteComment(id).then(({ data }) => {
        if (data.code) {
          this.$message({
            type: 'success',
            message: data.message,
          });
          this.getList();
        }
      });
    },
    handleView(row, index) {
      console.log('查看评论内容');
      this.viewContent = md(row.content);
      this.viewContentTitle = `查看评论内容#${index}`;
      this.viewContentDialogVisible = true;
    },
    handleViewReply(row, index) {
      console.log('查看回复内容');
      this.viewContent = md(row.reply);
      this.viewContentTitle = `查看回复内容#${index}`;
      this.viewContentDialogVisible = true;
    },
  },
};
</script>

<style lang="scss">
.comments-tool {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.view-content-btns {
  text-align: center;
  .el-button {
    display: block;
  }
  .el-button + .el-button {
    margin-left: 0;
  }
}
</style>
