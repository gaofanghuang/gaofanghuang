<template>
  <div class="home-wrap">
    <div class="home-banner" :style="bgStyle">
      <div class="home-arrow">
        <Icon name="menu" />
      </div>
    </div>
    <div class="home-layout">
      <div class="home-container">
        <div class="home-left">
          <AboutMe />
          <We />
          <LastestComments />
        </div>

        <div class="home-main">
          <div class="home-module home-project" v-if="projects.length > 0">
            <div class="home-module-title">The Latest Project</div>
            <div class="home-module-list home-project-list">
              <ProjectCard v-for="item in projects" :item="item" :key="item._id" />
            </div>
          </div>

          <div class="home-module home-checklist" v-if="checklist.length > 0">
            <div class="home-module-title">The Latest Checklist</div>
            <div class="home-module-list home-checklist-list">
              <ChecklistCard v-for="item in checklist" :item="item" :key="item._id" />
            </div>
          </div>
        </div>

        <div class="home-right">
          <MusicBar />
          <TagsRank />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bg from '@/assets/bg/bg.jpg';
import ProjectCard from '@/components/ProjectCard';
import ChecklistCard from '@/components/ChecklistCard';
import AboutMe from '@/components/AboutMe';
import We from '@/components/We';
import LastestComments from '@/components/LastestComments';
import MusicBar from '@/components/MusicBar';
import TagsRank from '@/components/TagsRank';
import { mapState } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      bgImg: bg,
      bgStyle: {},
    };
  },
  components: {
    ProjectCard,
    ChecklistCard,
    AboutMe,
    We,
    LastestComments,
    MusicBar,
    TagsRank
  },
  created() {
    this.bgStyle = {
      'background-image': `url(${this.bgImg})`,
    };
    if (this.projects.length === 0) {
      this.getProjects();
    }
    if (this.checklist.length === 0) {
      this.getChecklist();
    }
  },
  computed: {
    ...mapState({
      projects: state => state.projects.slice(0, 3) || [],
      checklist: state => state.checklist.slice(0, 3) || [],
    }),
  },
  methods: {
    getProjects() {
      this.$store.dispatch('GetProjects');
    },
    getChecklist() {
      this.$store.dispatch('GetChecklist');
    },
  },
};
</script>

<style lang="scss">
body {
  &::-webkit-scrollbar {
    width: 0;
  }
}
.home-wrap {
  width: 100%;
  min-height: 100vh;
  margin-top: -48px;
}
.home-banner {
  position: relative;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
  .home-arrow {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    .icon {
      position: absolute;
      left: 0;
      top: 0;
      color: #ffffff;
      text-shadow: 0 0 3px #000000;
      animation: arrowDown 2.48s reverse infinite;
    }
  }
}
.home-layout {
  width: 100%;
  background: #ffffff;
}
.home-container {
  display: flex;
  width: 100%;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  padding: 40px 20px;
}
.home-left {
  width: 260px;
  margin-right: 4%;
}
.home-main {
  width: calc(92% - 260px - 200px);
}
.home-right {
  width: 200px;
  margin-left: 4%;
}
.home-module {
  margin-bottom: 40px;
}
.home-module-title {
  font-size: 16px;
  font-family: 'moon-bold';
  margin-bottom: 20px;
  letter-spacing: 1px;
  padding-bottom: 10px;
  border-bottom: 1px solid #efefef;
}
.tags-rank-wrap,
.latest-comments-wrap,
.we-wrap {
  margin-top: 20px;
}
</style>
