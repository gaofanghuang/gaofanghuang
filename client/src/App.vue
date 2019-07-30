<template>
  <div id="app" class="app-wrap" :class="`${path}-layout`">
    <Header />
    <main class="app-content">
      <Transition enter-active-class="fadeIn-enter-active" leave-active-class="fadeIn-leave-active">
        <router-view />
      </Transition>
    </main>
    <Footer />
    <BigImg />
  </div>
</template>

<script>
  import Header from "@/components/Header"
  import Footer from "@/components/Footer"
  import BigImg from "@/components/BigImg"

  export default {
    name: 'app',
    components: {
      Header,
      Footer,
      BigImg
    },
    computed: {
      path() {
        let meta = this.$route.meta
        return meta ? meta.name : ''
      }
    }
  }
</script>

<style lang="scss">
  .app-wrap {
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background: linear-gradient(-45deg, $primary, $green);

    .app-content {
      padding-top: 50px;

      @media screen and (max-width:1024px) {
        padding-top: 80px;
      }
    }
  }

  .list-layout,
  .about-layout {
    height: auto;
    min-height: calc(100vh - 47px);
    overflow-y: auto;
    background: $background-color;

    .header-wrap {
      background: $white;
      border-bottom: 1px solid $border-color;
      box-shadow: 0 3px 8px rgba($black, 0.08);
    }

    .header-logo {
      background: url("./assets/GAOFANG_c.png") no-repeat;
      background-size: auto 100%;
    }

    .footer-wrap {
      color: $light;
    }
  }

  .info-layout,
  .list-layout {
    .footer-wrap {
      position: static;
    }
  }

  .info-layout {
    padding-top: 180px;
    position: relative;

    @media screen and (max-width:1024px) {
      padding-top: 220px;
    }

    .app-content {
      padding-top: 0;
      min-height: calc(100vh - 220px);
      background: $background-color;
      padding-bottom: 220px;
    }

    .footer-wrap {
      background: $background-color;
      color: $light;
      padding-bottom: 12px;
    }
  }
</style>