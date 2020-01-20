<template>
  <div class="we-wrap">
    <div class="we-avatars">
      <div class="we-avatar-i">
        <img :src="iAvatar" alt="I" />
      </div>
      <div class="we-avatar-and">
        <Icon name="heart1" />
      </div>
      <div class="we-avatar-you">
        <img :src="youAvatar" alt="you" />
      </div>
    </div>
    <div class="we-togather">
      {{ togather }}
    </div>
  </div>
</template>

<script>
import { distanceTime } from '@/services/utils';
import iAvatar from '@/assets/ia.jpg';
import youAvatar from '@/assets/youa.jpg';

export default {
  data() {
    return {
      iAvatar: iAvatar,
      youAvatar: youAvatar,
      startTime: '2019-04-01 19:56',
      togather: '',
      timingFn: '',
    };
  },
  created() {
    this.getTogatherTime();
  },
  destroyed() {
    clearInterval(this.timingFn);
  },
  methods: {
    getTogatherTime() {
      const startTime = new Date(this.startTime).getTime();
      this.timingFn = setInterval(() => {
        const curTime = new Date().getTime();
        this.togather = distanceTime(curTime, startTime);
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.we-wrap {
  border: 1px solid $border-color;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  .we-avatars {
    width: 69%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .we-avatar-you,
  .we-avatar-i {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background: $background-color;
    border: 2px solid #ffffff;
    box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.25);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .we-avatar-and {
    color: rgb(255, 100, 130);
    animation: beat 1.33s ease-in-out infinite;
  }
  .we-togather {
    margin-top: 10px;
    color: $light;
  }
}
</style>
