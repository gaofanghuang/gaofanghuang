<template>
  <div class="project-log-wrap">
    <el-table stripe border :data="list" style="width: 100%" v-loading="listLoading">
      <el-table-column label="版本号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.version || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="记录类型" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.type | typeMap }}</span>
        </template>
      </el-table-column>
      <el-table-column label="记录标题">
        <template slot-scope="scope">
          <span>
            <span>{{ scope.row.title || '-' }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="记录内容">
        <template slot-scope="scope">
          <span>
            <el-button size="mini" @click="handleView(scope.row)">
              查看
            </el-button>
          </span>
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
        <div class="project-info-edit">
          <el-form-item label="类型">
            <el-select v-model="curItem.type" placeholder="请选择类型">
              <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="curItem.title" placeholder="请选择标题，可不填"></el-input>
          </el-form-item>
          <el-form-item label="版本">
            <el-input v-model="curItem.version"></el-input>
          </el-form-item>
        </div>

        <template v-if="curItem.type === 1">
          <el-form-item label="图文">
            <MDeditor v-if="dialogVisible" v-model="curItem.content" />
          </el-form-item>
        </template>

        <template v-if="curItem.type === 2">
          <el-form-item label="图集">
            <div class="log-item-imgs">
              <UploadImg multiple @change="uploadImg" />
              <div class="log-item-img" v-for="(item, index) in curItem.images" :key="item.id">
                <img :src="item.path | getImg" />
                <i class="log-item-img-delete el-button--danger" @click="deleteImg(index)"
                  ><i class="el-icon-delete"></i
                ></i>
              </div>
            </div>
          </el-form-item>
        </template>

        <template v-if="curItem.type === 3">
          <el-form-item label="视频">
            <el-input v-model="curItem.video" placeholder="请输入B站AV号"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="saveLog">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="title2" :visible.sync="dialogVisible2" width="800px">
      <template v-if="curItem.type === 1">
        <div class="log-view-content markdown-view" v-html="viewContent"></div>
      </template>

      <template v-if="curItem.type === 2">
        <div class="log-view-imgs">
          <img
            :src="item.path | getImg"
            v-for="(item, index) in curItem.images"
            :key="`images-${index}`"
          />
        </div>
      </template>

      <template v-if="dialogVisible2 && curItem.type === 3 && curItem.video">
        <iframe
          :src="`//player.bilibili.com/player.html?aid=${curItem.video}`"
          width="100%"
          height="500px"
          scrolling="no"
          border="0"
          frameborder="no"
          framespacing="0"
          allowfullscreen="true"
        >
        </iframe>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = false">
          关闭
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/utils/api';
import UploadImg from '@/components/UploadImg';
import MDeditor from '@/components/MDeditor';
import md from '@/utils/markdown';

const TYPES = [
  {
    id: 1,
    name: '图文',
  },
  {
    id: 2,
    name: '图集',
  },
  {
    id: 3,
    name: '视频',
  },
];

export default {
  data() {
    return {
      id: this.$route.params.id,
      list: [],
      title: '',
      dialogVisible: false,
      title2: '',
      dialogVisible2: false,
      curItem: {},
      types: TYPES,
      page: 1,
      showSize: 10,
      total: 0,
      listLoading: false,
      saveLoading: false,
    };
  },
  props: ['info'],
  computed: {
    viewContent() {
      return this.curItem.content ? md(this.curItem.content) : '';
    },
  },
  filters: {
    typeMap(type) {
      const item = TYPES.find(item => item.id === type);
      return item ? item.name : '';
    },
  },
  components: {
    UploadImg,
    MDeditor,
  },
  created() {
    this.getList();
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true;
      this.title = '添加记录';
      this.curItem = {
        type: 1,
        title: '',
        content: '',
        images: [],
        cover: '',
        video: '',
        version: this.info.version,
      };
    },
    handleView(row) {
      this.title2 = `查看记录`;
      this.dialogVisible2 = true;
      this.curItem = {
        ...row,
      };
    },
    handleEdit(row) {
      this.title = `编辑记录`;
      this.dialogVisible = true;
      this.curItem = {
        ...row,
      };
    },
    handleDelete(row) {
      this.$confirm(`此操作将永久删除该项记录, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          api.deleteLog(this.id, row._id).then(({ data }) => {
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
    getList() {
      const params = {
        page: this.page,
        showSize: this.showSize,
      };
      this.listLoading = true;
      api.getLogs(this.id, params).then(({ data }) => {
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
    uploadImg(images) {
      this.curItem.images = [...this.curItem.images, ...images];
    },
    deleteImg(index) {
      this.curItem.images.splice(index, 1);
    },
    saveLog() {
      let params = {
        type: this.curItem.type,
        title: this.curItem.title,
        content: this.curItem.content,
        images: this.curItem.images,
        cover: this.curItem.cover,
        video: this.curItem.video,
        version: this.curItem.version,
      };
      this.saveLoading = true;
      if (this.curItem._id) {
        api.updatedLog(this.id, this.curItem._id, params).then(({ data }) => {
          this.$message({
            message: data.message,
            type: 'success',
          });
          this.dialogVisible = false;
          this.saveLoading = false;
          this.getList();
        });
      } else {
        api.addLog(this.id, params).then(({ data }) => {
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

<style lang="scss">
.project-log-wrap {
  .log-item-img,
  .upload-wrap.type-cover {
    width: 100px;
    height: 100px;
  }

  .log-item-imgs {
    display: flex;
    flex-wrap: wrap;
  }

  .log-item-img {
    margin-left: 10px;
    margin-bottom: 10px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .log-item-img-delete {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 20px;
      height: 20px;
      font-size: 12px;
      text-align: center;
      line-height: 20px;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .project-info-edit {
    display: flex;
    justify-content: space-between;
  }

  .log-view-content,
  .log-view-imgs {
    height: 300px;
    overflow-y: auto;

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

    img {
      display: block;
      max-width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>
