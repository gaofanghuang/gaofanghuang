<template>
  <div class="home-wrap" :style="bgStyle">
    <div class="home-banner">
      <div class="home-arrow">
        <Icon name="menu" />
      </div>
    </div>
    <div class="home-layout">
      <div class="home-container">
        <div class="home-left">
          <div class="home-module home-project" v-if="projects.length > 0">
            <div class="home-module-title">- The Latest Project -</div>
            <div class="home-module-list home-project-list">
              <ProjectCard v-for="item in projects" :item="item" :key="item._id" />
            </div>
          </div>

          <div class="home-module home-checklist" v-if="projects.length > 0">
            <div class="home-module-title">- The Latest Checklist -</div>
            <div class="home-module-list home-checklist-list">
              <ChecklistCard v-for="item in projects" :item="item" :key="item._id" />
            </div>
          </div>
        </div>

        <div class="home-right">
          ssss
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bg from '@/assets/bg/bg.jpg';
import ProjectCard from '@/components/ProjectCard';
import ChecklistCard from '@/components/ChecklistCard';
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
    ChecklistCard
  },
  created() {
    this.bgStyle = {
      'background-image': `url(${this.bgImg})`,
    };
    if (this.projects.length === 0) {
      this.getProjects();
    }
  },
  computed: {
    ...mapState({
      projects: state => state.projects || [],
    }),
  },
  mounted() {
    window.onscroll = function() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const Header = document.querySelector('#header');
      if (scrollTop >= window.screen.availHeight) {
        Header.style = 'top: 0px;';
      } else {
        Header.style = 'top: -48px;';
      }
    };
  },
  methods: {
    getProjects() {
      this.$store.dispatch('GetProjects');
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
.header-wrap {
  top: -48px;
}
.main-wrap {
  padding-top: 0;
}
.home-wrap {
  width: 100%;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: auto 100vh;
  background-attachment: fixed;
}
.home-banner {
  position: relative;
  width: 100%;
  height: 100vh;
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
  width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding: 40px 0;
}
.home-left {
  width: 900px;
}
.home-right {
  width: 260px;
  margin-left: 20px;
  background: $background-color;
  border-radius: 4px;
}
.home-module {
  margin-bottom: 40px;
}
.home-module-title {
  font-size: 16px;
  font-family: 'moon-regular';
  margin-bottom: 20px;
}
</style>
