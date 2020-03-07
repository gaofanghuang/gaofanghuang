<template>
  <div class="checklist-detail-wrap">
    <div class="checklist-detail-head">
      <div class="checklist-detail-cover">
        <img v-if="info.cover" :src="info.cover.path | getImg" />
      </div>
      <div class="checklist-detail-text">
        <div class="checklist-detail-title">
          清单名称：{{ info.name }}
          <span class="checklist-detail-version" v-if="info.version">
            {{ info.version }}
          </span>
        </div>
        <div class="checklist-detail-describe">清单描述：{{ info.describe }}</div>
        <div class="checklist-detail-tags" v-if="info.tag && info.tag.length > 0">
          清单标签：
          <TagMap :list="info.tag" />
        </div>
      </div>
      <div class="checklist-detail-btn">
        <el-button size="medium" type="primary" @click="handleAdd">
          添加条目
        </el-button>
      </div>
    </div>

    <div class="checklist-entry-body">
      <el-table stripe border :data="list" style="width: 100%" v-loading="listLoading">
        <el-table-column label="条目类型" width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.type | typeMap }}</span>
          </template>
        </el-table-column>
        <el-table-column label="条目标题">
          <template slot-scope="scope">
            <span>
              <span>{{ scope.row.title || '-' }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="条目内容">
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

      <el-dialog :title="title" :visible.sync="dialogVisible" width="860px">
        <el-form ref="form" label-width="80px">
          <div class="checklist-detail-edit">
            <el-row>
              <el-col :span="5">
                <el-form-item label="类型">
                  <el-select v-model="curItem.type" placeholder="请选择类型">
                    <el-option
                      v-for="item in types"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="评分">
                  <el-select v-model="curItem.score">
                    <el-option v-for="item in 5" :key="item" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="标题">
                  <el-input v-model="curItem.title" placeholder="请选择标题，可不填"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="网址">
                  <el-input v-model="curItem.url"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
                <div class="log-item-img" v-for="item in curItem.images" :key="item.id">
                  <img :src="item.path | getImg" />
                  <i class="log-item-img-delete el-button--danger" @click="deleteImg(item)"
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
          <el-button type="primary" :loading="saveLoading" @click="saveEntry">确 定</el-button>
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
  </div>
</template>

<script>
import TagMap from '@/components/TagMap';
import * as api from '@/utils/api';
import UploadImg from '@/components/UploadImg';
import MDeditor from '@/components/MDeditor';
import md from '@/utils/markdown';
import fix from '@/utils/fix';

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
      info: {},
      page: 1,
      showSize: 10,
      total: 0,
      listLoading: false,
      saveLoading: false,
    };
  },
  components: {
    TagMap,
    UploadImg,
    MDeditor,
  },
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
  created() {
    this.getInfo();
    this.getList();
  },
  methods: {
    getInfo() {
      api.getCheckDetail(this.id).then(({ data }) => {
        if (data.code) {
          this.info = data.data;
        }
      });
    },
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
        url: '',
        score: '',
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
          api.deleteEntry(this.id, row._id).then(({ data }) => {
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
      api.getEntries(this.id, params).then(({ data }) => {
        if (data.code) {
          let _data = [];
          if (data.data.length > 0) {
            _data = data.data;
            _data.forEach((item, index) => {
              const _str = item._id.toString().substr(0, 8);
              const _date = new Date(Number(parseInt(_str, 16).toString() + '000')).getTime();
              _data[index].created_time = _date;
            });
            _data = fix.sort(_data, 'created_time', 'des');
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
    deleteImg(img) {
      let params = {
        id: img._id,
      };
      api.deleteImg(params).then(({ data }) => {
        this.$message({
          type: 'success',
          message: data.message,
        });
        this.curItem.imgs = this.curItem.imgs.filter(item => {
          return Number(item._id) !== Number(img._id);
        });
      });
    },
    saveEntry() {
      let params = {
        type: this.curItem.type,
        title: this.curItem.title,
        content: this.curItem.content,
        images: this.curItem.images,
        cover: this.curItem.cover,
        video: this.curItem.video,
        url: this.curItem.url,
        score: this.curItem.score,
      };
      this.saveLoading = true;
      if (this.curItem._id) {
        api.updatedEntry(this.id, this.curItem._id, params).then(({ data }) => {
          this.$message({
            message: data.message,
            type: 'success',
          });
          this.dialogVisible = false;
          this.saveLoading = false;
          this.getList();
        });
      } else {
        api.addEntry(this.id, params).then(({ data }) => {
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
.checklist-detail-wrap {
  .cell {
    text-align: center;
  }

  .checklist-detail-head {
    display: flex;
    color: #666666;
    margin-bottom: 20px;
  }

  .checklist-detail-cover {
    margin-right: 20px;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }

  .checklist-detail-text {
    width: calc(100% - 120px);
    font-size: 12px;
    color: #999999;
  }

  .checklist-detail-title {
    margin-bottom: 10px;
    font-size: 16px;
  }

  .checklist-detail-version {
    padding: 2px 10px;
    border: 1px solid #efefef;
    font-size: 12px;
    margin-left: 10px;
    border-radius: 13px;
    color: #dddddd;
  }

  .checklist-detail-tags,
  .checklist-detail-describe {
    margin-bottom: 10px;
  }

  .checklist-detail-tags {
    display: flex;
    align-items: center;
    .tag-map-item {
      margin-bottom: 0;
    }
  }

  .checklist-detail-url {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    font-size: 12px;
    color: #999999;

    span {
      display: inline-block;
      max-width: 32%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    a {
      color: #999999;
      text-decoration: none;

      &:hover {
        color: #23bed5;
      }
    }
  }
  .checklist-entry-body {
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

    .checklist-detail-edit {
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
}
</style>
