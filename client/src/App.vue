<template>
  <div id="app" :class="{ 'is-dark': darkMode, 'is-mobile': isMobile, 'is-pc': !isMobile, 'ignore': !isMobile }">
    <Header v-if="isMobile" />
    <HeaderPC v-if="!isMobile" />
    <Transition enter-active-class="fadeIn-enter-active" leave-active-class="fadeIn-leave-active">
      <main class="app-content">
        <router-view />
      </main>
    </Transition>
    <SideBar v-if="isMobile" />
    <BigImg />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '@/components/Header';
import HeaderPC from '@/components/HeaderPC';
import SideBar from '@/components/SideBar';
import BigImg from '@/components/BigImg';
import { clientOS } from '@/services/utils';

export default {
  name: 'app',
  data() {
    return {
      isMobile: clientOS().isMobile,
    };
  },
  computed: {
    ...mapGetters(['darkMode']),
  },
  components: {
    Header,
    HeaderPC,
    SideBar,
    BigImg,
  },
};
</script>

<style lang="scss">
.is-mobile {
  .app-content {
    width: 100vw;
    min-height: 100vh;
    padding-top: 120px;
  }
}
.is-pc.ignore {
  .app-content {
    width: 100%;
    min-height: 100vh;
    font-size: 14px;
    padding-top: 90px;
  }
}
</style>
