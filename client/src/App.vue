<template>
  <div id="app">
    <Header />
    <main class="app-content">
      <Transition enter-active-class="fadeIn-enter-active" leave-active-class="fadeIn-leave-active">
        <router-view />
      </Transition>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'app',
  components: {
    Header,
  },
};
</script>
