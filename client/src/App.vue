<template>
  <div id="app">
    <Header />
    <Transition enter-active-class="fadeIn-enter-active" leave-active-class="fadeIn-leave-active">
      <main class="app-content">
        <router-view />
      </main>
    </Transition>
    <SideBar />
  </div>
</template>

<script>
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';

export default {
  name: 'app',
  data() {
    return {};
  },
  components: {
    Header,
    SideBar,
  },
};
</script>

<style lang="scss">
  .app-content {
    width: 100vw;
    min-height: 100vh;
    padding-top: 120px;
  }
</style>
