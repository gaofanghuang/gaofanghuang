<template>
  <div class="projects-wrap">
    <div class="projects-banner flex flex-x flex-y">Projects</div>
    <div class="projects-container">
      <LoadMore @onRefresh="getList" @onLoadMore="getList">
        <transition-group tag="div" class="project-list" name="fadeIn">
          <ProjectItem v-for="item in list" :item="item" :key="item._id" />
        </transition-group>
      </LoadMore>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';
import LoadMore from '@/components/LoadMore';
import ProjectItem from '@/components/ProjectItem';

export default {
  data() {
    return {
      page: 1,
      showSize: 10,
      list: [],
    };
  },
  components: {
    LoadMore,
    ProjectItem,
  },
  methods: {
    getList(callback = () => {}, refresh = false) {
      const params = {
        page: refresh ? 1 : this.page + 1,
        showSize: this.showSize,
      };
      api.getProjects(params).then(({ data }) => {
        if (data.code) {
          this.page = params.page;
          const dataTemp = data.data;
          this.list = refresh ? dataTemp : [...this.list, ...dataTemp];
          callback(dataTemp.length, this.showSize);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.projects-wrap {
  .projects-banner {
    width: 100%;
    height: 320px;
    background: #f2f2f2;
    color: #dddddd;
    font-family: 'moon-light';
    letter-spacing: 3px;
    font-size: 48px;
  }
  .projects-container {
    width: 100%;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
    padding: 40px 0;
  }
  .project-list {
    display: flex;
    flex-wrap: wrap;
  }
  .project-item-wrap {
    width: calc((100% - 40px) / 3);
    margin-bottom: 20px;
    margin-right: 20px;
    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
}
</style>
