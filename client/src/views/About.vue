<template>
  <div class="about-wrap">
    <div class="about-banner flex flex-x flex-y">about</div>
    <div class="about-container">
      <div class="about-content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import * as api from '@/services/api';
import md from '@/services/markdown';

export default {
  data() {
    return {
      content: '',
    };
  },
  created() {
    this.getAbout();
  },
  methods: {
    getAbout() {
      api.getAbout().then(({ data }) => {
        if (data.code) {
          this.content = md(data.data.content);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.about-wrap {
  .about-banner {
    width: 100%;
    height: 320px;
    background: #f2f2f2;
    color: #dddddd;
    font-family: 'moon-light';
    letter-spacing: 3px;
    font-size: 48px;
  }
  .about-container {
    width: 100%;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
    padding: 40px 0;
  }
}
</style>
