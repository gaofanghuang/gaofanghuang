<template>
  <Transition enter-active-class="fadeIn-enter-active" leave-active-class="fadeIn-leave-active">
    <div class="big-img-wrap" v-if="show" @click="closeBig">
      <span class="big-img-close">
        <Icon name="close" />
      </span>
      <img class="big-img-asset" :src="path | getImg" />
    </div>
  </Transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      show: state => state.showBigImg || false,
      path: state => state.bigPath || '',
    }),
  },
  methods: {
    closeBig() {
      this.$store.commit('toggleBigImg', {
        showBigImg: false,
        bigPath: '',
      });
    },
  },
};
</script>

<style lang="scss">
.is-pc.ignore {
  .big-img-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.85);
    z-index: 999;

    .big-img-close {
      position: fixed;
      top: 20px;
      right: 20px;
      color: $white;
      font-size: 24px;
      font-weight: 200;
      cursor: pointer;
    }

    .big-img-asset {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 80%;
      max-height: 80%;
    }
  }
}
.is-mobile {
  .big-img-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.85);
    z-index: 999;

    .big-img-close {
      position: fixed;
      top: 20px;
      right: 20px;
      color: $white;
      font-size: 48px;
      font-weight: 200;
      cursor: pointer;
    }

    .big-img-asset {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
