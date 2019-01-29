<template>
  <div id="app">
    <Header v-if="showHead" />
    <main class="app-content" :class="{'show-header': showHead, 'is-pc': !browser.isMobile, 'is-mobile': browser.isMobile, 'is-edit': isEdit, 'is-project': isProject }">
      <router-view />
    </main>
    <ActionSheet />
  </div>
</template>

<script>
  import Header from "@/components/Header"
  import ActionSheet from "@/components/ActionSheet"

  export default {
    name: 'app',
    components: {
      Header,
      ActionSheet
    },
    computed: {
      browser() {
        return this.$store.state.browser
      },
      showHead() {
        return !!this.$route.meta.showHead
      },
      isEdit() {
        return this.$route.path.includes('edit') || this.$route.path.includes('add')
      },
      isProject() {
        return this.$route.path.includes('project')
      }
    }
  }
</script>

<style lang="scss">
  .app-content {
    &.show-header {
      margin-top: 90px;
    }

    &.is-pc {
      width: 1200px;
      margin-left: auto;
      margin-right: auto;
      &.is-edit {
        width: 2400px
      }
    }
  }
</style>