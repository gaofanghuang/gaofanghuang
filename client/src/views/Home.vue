<template>
  <div class="home-wrap" :style="bgStyle">
    <div class="home-banner">
      <div class="home-arrow">
        <Icon name="menu" />
      </div>
    </div>
    <div class="home-layout">
      <div class="home-container">
        <div class="home-module">
          <div class="home-module-title">近期项目</div>
          <div class="home-module-list home-project-list">
            <div class="home-project-item">
              <div class="home-project-cover"></div>
              <div class="home-project-word">
                <div class="home-project-name">ddd</div>
                <div class="home-project-describe">
                  sadasdasdsd
                </div>
                <div class="home-project-info">
                  <div class="home-project-time">2020-01-18</div>
                  <div class="home-project-tags">
                    <div class="home-project-tag">sdsdsd</div>
                    <div class="home-project-tag">sdsdsd</div>
                    <div class="home-project-tag">sdsdsd</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bg from '@/assets/bg/bg.jpg';

export default {
  name: 'home',
  data() {
    return {
      bgImg: bg,
      bgStyle: {},
    };
  },
  created() {
    this.bgStyle = {
      'background-image': `url(${this.bgImg})`,
    };
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
  components: {},
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
  background-size: 100vw 100vh;
  background-attachment: fixed;
}
.home-banner {
  position: relative;
  width: 100%;
  height: 100vh;
  .home-arrow {
    position: absolute;
    bottom: 20px;
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
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
  padding: 40px 0;
}
</style>
