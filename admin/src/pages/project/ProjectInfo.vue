<template>
  <div class="project-info-wrap">
    <div class="project-info-head">
      <div class="project-info-cover">
        <img v-if="info.cover" :src="info.cover.path | getImg" />
      </div>
      <div class="project-info-text">
        <div class="project-info-title">
          项目名称：{{ info.name }}
          <span class="project-info-version" v-if="info.version">
            {{ info.version }}
          </span>
        </div>
        <div class="project-info-describe">项目描述：{{ info.describe }}</div>
        <div class="project-info-tags" v-if="info.tag && info.tag.length > 0">
          项目标签：
          <TagMap :list="info.tag" />
        </div>

        <div class="project-info-url">
          <span v-if="info.url">
            项目地址:
            <a :href="info.url" target="_blank">{{ info.url }}</a>
          </span>
          <span v-if="info.github">
            Github地址:
            <a :href="info.github" target="_blank">{{ info.github }}</a>
          </span>
        </div>
      </div>
      <div class="project-info-btn">
        <el-button size="medium" type="primary" @click="handleAddTODO" v-if="type === 'todo'">
          添加TODO
        </el-button>
        <el-button size="medium" type="primary" @click="handleAdd" v-if="type === 'log'">
          添加记录
        </el-button>
        <el-button
          size="medium"
          type="primary"
          :loading="setLoading"
          @click="handleSet"
          v-if="type === 'set'"
        >
          保存设置
        </el-button>
      </div>
    </div>

    <div class="type-navigation">
      <div class="type-navigation-btns">
        <span
          class="type-navigation-item"
          @click="type = 'todo'"
          :class="{ active: type === 'todo' }"
        >
          TODO
        </span>
        <span
          class="type-navigation-item"
          @click="type = 'log'"
          :class="{ active: type === 'log' }"
        >
          记录
        </span>
        <span
          class="type-navigation-item"
          @click="type = 'set'"
          :class="{ active: type === 'set' }"
        >
          设置
        </span>
      </div>
    </div>

    <ProjectLog v-if="type === 'log'" :info="info" ref="projectLog" />

    <ProjectTODO v-if="type === 'todo'" :info="info" ref="projectTODO" />

    <ProjectSet v-if="type === 'set'" :info="info" @refresh="refreshInfo" ref="projectSet" />
  </div>
</template>

<script>
import * as api from '@/utils/api';
import ProjectLog from './modules/ProjectLog';
import ProjectTODO from './modules/ProjectTODO';
import ProjectSet from './modules/ProjectSet';
import TagMap from '@/components/TagMap';

export default {
  data() {
    return {
      id: this.$route.params.id,
      type: 'todo',
      info: {},
      setLoading: false,
    };
  },
  components: {
    ProjectLog,
    ProjectTODO,
    ProjectSet,
    TagMap,
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      api.getProjectInfo(this.id).then(({ data }) => {
        if (data.code) {
          this.info = data.data;
        }
      });
    },
    refreshInfo() {
      this.setLoading = false;
      this.getInfo();
    },
    handleAdd() {
      this.$refs.projectLog.handleAdd();
    },
    handleAddTODO() {
      this.$refs.projectTODO.handleAdd();
    },
    handleSet() {
      this.setLoading = true;
      this.$refs.projectSet.handleSet();
    },
  },
};
</script>

<style lang="scss">
.project-info-wrap {
  .cell {
    text-align: center;
  }

  .project-info-head {
    display: flex;
    color: #666666;
    margin-bottom: 20px;
  }

  .project-info-cover {
    margin-right: 20px;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }

  .project-info-text {
    width: calc(100% - 120px);
    font-size: 12px;
    color: #999999;
  }

  .project-info-title {
    margin-bottom: 10px;
    font-size: 16px;
  }

  .project-info-version {
    padding: 2px 10px;
    border: 1px solid #efefef;
    font-size: 12px;
    margin-left: 10px;
    border-radius: 13px;
    color: #dddddd;
  }

  .project-info-tags,
  .project-info-describe {
    margin-bottom: 10px;
    word-break: break-all;
    padding-right: 40px;
  }

  .project-info-tags {
    display: flex;
    align-items: center;
    .tag-map-item {
      margin-bottom: 0;
    }
  }

  .project-info-url {
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

  .type-navigation {
    position: relative;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #efefef;
    font-size: 12px;
    color: #666666;
    margin-top: 40px;
    margin-bottom: 60px;
  }
  .type-navigation-btns {
    position: absolute;
    top: -16px;
    user-select: none;
  }
  .type-navigation-item {
    display: inline-block;
    margin-right: 20px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    padding: 0 20px;
    border: 1px solid #efefef;
    background: #ffffff;
    cursor: pointer;
    &.active {
      border: 1px solid #409eff;
      background: #409eff;
      color: #ffffff;
    }
  }
}
</style>
