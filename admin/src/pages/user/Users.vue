<template>
  <div class="user-list">
    <div class="user-list-tool">
      <el-button size="medium" type="primary" @click="handleAdd">
        添加成员
      </el-button>
    </div>
    <el-table stripe border :data="list" style="width: 100%">
      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="角色" width="100">
        <template slot-scope="scope">
          {{ getRole(scope.row.role) }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新日期" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.updated_time | formatDate('yyyy-MM-dd') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">
            编辑信息
          </el-button>
          <el-button size="mini" type="primary" @click="changePassword(scope.row)">
            修改密码
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="460px">
      <el-form ref="form" label-width="80px">
        <el-form-item label="账号" v-if="!curItem._id">
          <el-input v-model="curItem.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="curItem.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="curItem.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" v-if="!curItem._id">
          <el-select v-model="curItem.role" placeholder="请选择用户角色">
            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="dialogVisiblePassword" width="460px">
      <el-form ref="form" label-width="80px">
        <el-form-item label="角色">
          <el-select v-model="curItem.role" placeholder="请选择用户角色">
            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="curItem.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePassword = false">取 消</el-button>
        <el-button type="primary" @click="saveUserPassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/utils/api';
import Check from '@/utils/check';

export default {
  data() {
    return {
      list: [],
      curItem: {},
      dialogVisible: false,
      dialogVisiblePassword: false,
      title: '',
      roles: [
        {
          id: 1,
          name: '管理员',
        },
        {
          id: 2,
          name: '注册会员',
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getRole(role) {
      const curRole = this.roles.find(item => {
        return item.id === role;
      });
      return curRole ? curRole.name : '';
    },
    getList() {
      api.getUsers().then(({ data }) => {
        if (data.code) {
          this.list = data.data;
        }
      });
    },
    handleAdd() {
      this.curItem = {
        username: '',
        nickname: '',
        role: 2,
        email: '',
        password: '000000',
      };
      this.title = '添加用户';
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.curItem = {
        ...row,
      };
      this.title = '编辑用户';
      this.dialogVisible = true;
    },
    handleDelete(row) {
      this.$confirm(`此操作将永久删除用户【${row.nickname}】, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          api.deleteUser(row._id).then(({ data }) => {
            if (data.code) {
              this.$message({
                message: data.message,
                type: 'success',
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
    changePassword(row) {
      this.curItem = {
        ...row,
        password: '',
      };
      this.dialogVisiblePassword = true;
    },
    saveUser() {
      if (this.checkForm()) {
        const params = {
          username: this.curItem.username,
          nickname: this.curItem.nickname,
          role: this.curItem.role,
          email: this.curItem.email,
        };
        if (this.curItem._id) {
          api.updatedUser(this.curItem._id, params).then(({ data }) => {
            if (data.code) {
              this.$message({
                message: data.message,
                type: 'success',
              });
              this.dialogVisible = false;
              this.getList();
            }
          });
        } else {
          params.password = this.curItem.password;
          api.addUser(params).then(({ data }) => {
            if (data.code) {
              this.$message({
                message: data.message,
                type: 'success',
              });
              this.dialogVisible = false;
              this.getList();
            }
          });
        }
      }
    },
    saveUserPassword() {
      const params = {
        role: this.curItem.role,
        password: this.curItem.password,
      };
      api.updatedUserRolePW(this.curItem._id, this.curItem.username, params).then(({ data }) => {
        if (data.code) {
          this.$message({
            message: data.message,
            type: 'success',
          });
          this.dialogVisiblePassword = false;
          this.getList();
        }
      });
    },
    checkForm() {
      if (!this.curItem.username) {
        this.$message({
          type: 'error',
          message: '请输入账号',
        });
        return false;
      }
      if (!this.curItem.nickname) {
        this.$message({
          type: 'error',
          message: '请输入昵称',
        });
        return false;
      }
      if (!this.curItem.email) {
        this.$message({
          type: 'error',
          message: '请输入邮箱',
        });
        return false;
      }
      if (!Check.isEmail(this.curItem.email)) {
        this.$message({
          type: 'error',
          message: '邮箱格式不正确',
        });
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
.user-list {
  .cell {
    text-align: center;
  }

  .user-list-tool {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .el-select {
    width: 100%;
  }
}
</style>
