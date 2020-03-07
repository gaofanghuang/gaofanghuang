<template>
  <div class="project-list">
    <div class="project-list-tool">
      <el-input placeholder="请输入项目名称" prefix-icon="el-icon-search" v-model="searchKey" />
      <el-button size="medium" type="primary" @click="handleAdd">
        添加项目
      </el-button>
    </div>

    <div v-loading="listLoading">
      <template v-if="!searchKey">
        <el-table stripe border :data="list" style="width: 100%">
          <el-table-column label="排序" width="50">
            <template slot-scope="scope">
              {{ scope.row.sort }}
            </template>
          </el-table-column>
          <el-table-column label="项目缩略图" width="100">
            <template slot-scope="scope">
              <img
                v-if="scope.row.cover"
                :src="scope.row.cover.path | getImg"
                class="project-list-cover"
              />
            </template>
          </el-table-column>
          <el-table-column label="项目名称">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="项目标签">
            <template slot-scope="scope">
              <TagMap :list="scope.row.tag" />
            </template>
          </el-table-column>
          <el-table-column label="记录数" width="80">
            <template slot-scope="scope">
              {{ scope.row.logCount || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.status | statusMap }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新日期" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.updated_time | formatDate('yyyy-MM-dd') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.row)">
                记录
              </el-button>
              <el-button size="mini" type="primary" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template v-if="searchKey">
        <el-table stripe border :data="searchList" style="width: 100%">
          <el-table-column label="排序" width="50">
            <template slot-scope="scope">
              {{ scope.row.sort }}
            </template>
          </el-table-column>
          <el-table-column label="项目缩略图" width="100">
            <template slot-scope="scope">
              <img
                v-if="scope.row.cover"
                :src="scope.row.cover.path | getImg"
                class="project-list-cover"
              />
            </template>
          </el-table-column>
          <el-table-column label="项目名称">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="项目标签">
            <template slot-scope="scope">
              <TagMap :list="scope.row.tag" />
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.status | statusMap }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新日期" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.updated_time | formatDate('yyyy-MM-dd') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button size="mini" type="primary" @click="handleView(scope.row)">
                记录
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="showSize"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="860px">
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <UploadImg v-if="dialogVisible" :path="curItem.cover.path" @change="uploadImage" />
          </el-col>
          <el-col :span="18">
            <el-form-item label="名称">
              <el-input v-model="curItem.name"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" :rows="6" v-model="curItem.describe"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item label="标签">
              <el-select v-model="curItem.tag" filterable multiple placeholder="请选择标签">
                <el-option
                  v-for="item in tags"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="排序">
              <el-input v-model="curItem.sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="链接">
              <el-input v-model="curItem.url"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="github">
              <el-input v-model="curItem.github"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="saveProject">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/utils/api';
import UploadImg from '@/components/UploadImg';
import TagMap from '@/components/TagMap';
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
      dialogVisible: false,
      searchKey: '',
      title: '',
      curItem: {},
      searchList: [],
      tags: [],
      canSearch: true,
      page: 1,
      showSize: 10,
      total: 0,
      list: [],
      saveLoading: false,
      listLoading: false,
    };
  },
  watch: {
    searchkey() {
      if (this.searchKey && this.searchKey.length > 0) {
        this.handleSearch();
      }
    },
  },
  filters: {
    statusMap(status) {
      const item = STATES.find(item => item.id === status);
      return item ? item.name : '';
    },
  },
  created() {
    this.getTags();
    this.getList();
  },
  components: {
    UploadImg,
    TagMap,
  },
  methods: {
    getList() {
      const params = {
        page: this.page,
        showSize: this.showSize,
      };
      this.listLoading = true;
      api.getProjects(params).then(({ data }) => {
        if (data.code) {
          this.list = data.data;
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
    handleSearch() {
      if (!this.canSearch) {
        return;
      }
      this.canSearch = false;
      let key = this.searchKey.toLowerCase();
      let list = this.list;
      this.searchList = [];
      for (let item of list) {
        let tags = item.tag.join(',').toLowerCase();
        let name = item.name.toLowerCase();
        let describe = item.describe.toLowerCase();
        if (tags.indexOf(key) > -1 || name.indexOf(key) > -1 || describe.indexOf(key) > -1) {
          this.searchList.push(item);
        }
      }
      setTimeout(() => {
        this.canSearch = true;
      }, 600);
    },
    getTags() {
      api.getTags().then(({ data }) => {
        this.tags = data.data;
        this.$store.commit('SaveTags', data.data);
      });
    },
    handleEdit(row) {
      this.title = '编辑项目';
      this.curItem = {
        ...row,
      };
      this.dialogVisible = true;
    },
    handleAdd() {
      this.title = '添加项目';
      this.curItem = {
        name: '',
        describe: '',
        tag: [],
        status: 1,
        url: '',
        github: '',
        cover: '',
        sort: 0,
      };
      this.dialogVisible = true;
    },
    handleView(row) {
      // console.log(index, row);
      this.$router.push(`/project/${row._id}`);
    },
    handleDelete(row) {
      this.$confirm(`此操作将永久删除项目${row.name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          api.deleteProject(row._id).then(({ data }) => {
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
    uploadImage(cover) {
      this.curItem.cover = cover;
    },
    saveProject() {
      let params = {
        name: this.curItem.name,
        describe: this.curItem.describe,
        tag: this.curItem.tag,
        status: this.curItem.status,
        url: this.curItem.url,
        github: this.curItem.github,
        cover: this.curItem.cover,
        sort: this.curItem.sort,
      };
      this.saveLoading = true;
      if (this.curItem._id) {
        api.updatedProject(this.curItem._id, params).then(({ data }) => {
          if (data.code) {
            this.$message({
              message: data.message,
              type: 'success',
            });
            this.dialogVisible = false;
            this.saveLoading = false;
            this.getList();
          }
        });
      } else {
        api.addProject(params).then(({ data }) => {
          if (data.code) {
            this.$message({
              message: data.message,
              type: 'success',
            });
            this.dialogVisible = false;
            this.saveLoading = false;
            this.getList();
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
.project-list {
  .cell {
    text-align: center;
  }

  .project-list-tool {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .el-input {
      width: 300px;
    }
  }

  .el-select {
    width: 100%;
  }

  .project-list-cover {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
}
</style>
