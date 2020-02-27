<template>
  <div class="search-wrap">
    <div class="search-banner flex flex-x flex-y">
      <div class="search-input-box" v-if="!tag.id">
        <input
          type="text"
          @keyup.enter="getSearch"
          spellcheck="false"
          placeholder="请输入关键词搜索"
          v-model="keyword"
        />
        <div class="search-input-btn flex flex-x flex-y" @click="getSearch">
          <Icon name="search" />
        </div>
      </div>
      <div class="search-tag" v-if="tag.id"># {{ tag.name }}</div>
    </div>
    <div class="search-container">
      <template v-if="projects.length > 0">
        <div class="search-category-title">Project</div>
        <transition-group tag="div" class="project-list" name="fadeIn">
          <ProjectItem v-for="item in projects" :item="item" :key="item._id" />
        </transition-group>
      </template>

      <template v-if="checklist.length > 0">
        <div class="search-category-title">Checklist</div>
        <transition-group tag="div" class="checklist-list" name="fadeIn">
          <ChecklistItem v-for="item in checklist" :item="item" :key="item._id" />
        </transition-group>
      </template>

      <div
        class="no-data-tips flex flex-x flex-y"
        v-if="projects.length === 0 && checklist.length === 0"
      >
        <div class="no-data-tips_content">
          <img :src="carrot" alt="no data" class="no-data-tips_icon" />
          <div class="no-data-tips_word">
            Sorry, 什么也没找到，请尝试更换{{ tag.id ? '标签' : '关键词' }}~
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';
import ProjectItem from '@/components/ProjectItem';
import ChecklistItem from '@/components/ChecklistItem';
import carrot from '@/assets/carrot.jpg';

export default {
  data() {
    return {
      carrot,
      keyword: '',
      projects: [],
      checklist: [],
      tag: {
        id: '',
        name: '',
      },
    };
  },
  components: {
    ProjectItem,
    ChecklistItem,
  },
  watch: {
    $route() {
      this.getTagSearch();
    },
  },
  created() {
    this.getTagSearch();
  },
  methods: {
    getTagSearch() {
      const path = this.$route.path;
      if (path.includes('tag')) {
        const tagId = this.$route.params.id;
        this.tags = this.$store.state.tags;
        for (let item of this.tags) {
          if (tagId === item._id) {
            this.tag = {
              id: tagId,
              name: item.name,
            };
          }
        }
        this.getSearch();
      } else {
        this.tag = {
          id: '',
          name: '',
        };
      }
    },
    getSearch() {
      const params = {
        tag: this.tag.id,
        keyword: this.keyword,
      };
      api.getProjects(params).then(({ data }) => {
        if (data.code) {
          this.projects = data.data;
        }
      });
      api.getChecklist(params).then(({ data }) => {
        if (data.code) {
          this.checklist = data.data;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.search-wrap {
  .search-banner {
    width: 100%;
    height: 320px;
    background: #f2f2f2;
    color: #dddddd;
    font-family: 'moon-light';
    letter-spacing: 3px;
    position: relative;
  }
  .search-tag {
    font-size: 48px;
  }
  .search-container {
    width: 100%;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
    padding: 40px 0;
  }
  .search-input-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid $border-color;
    border-radius: 4px;
    overflow: hidden;
    background: #ffffff;
    width: 420px;
    height: 42px;
    display: flex;
    input {
      width: calc(100% - 80px);
      height: 42px;
      line-height: 42px;
      padding: 0 16px;
      font-family: 'PingFang SC', 'Microsoft Yahei', 'WenQuanYi Micro Hei';
      color: #999999;
      box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.08) inset;
      &::placeholder {
        color: #dddddd;
      }
      &:focus + .search-input-btn {
        background: linear-gradient(45deg, $error, hsl(20, 100%, 60%));
      }
    }
  }
  .search-input-btn {
    flex-shrink: 0;
    width: 80px;
    height: 42px;
    background: linear-gradient(45deg, $primary, $green);
    transition: 0.2s;
    color: #ffffff;
    font-size: 24px;
  }
  .no-data-tips_content {
    text-align: center;
    .no-data-tips_icon {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
      overflow: hidden;
    }
    .no-data-tips_word {
      margin-top: 20px;
      color: $light;
    }
  }
  .checklist-list,
  .project-list {
    display: flex;
    flex-wrap: wrap;
  }
  .checklist-item-wrap,
  .project-item-wrap {
    width: calc((100% - 40px) / 3);
    margin-bottom: 20px;
    margin-right: 20px;
    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
  .search-category-title {
    font-size: 16px;
    font-family: 'moon-bold';
    margin-bottom: 20px;
    letter-spacing: 1px;
    padding-bottom: 10px;
    border-bottom: 1px solid #efefef;
  }
  .project-list {
    margin-bottom: 40px;
  }
}
</style>
