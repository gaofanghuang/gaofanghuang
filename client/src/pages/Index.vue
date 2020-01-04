<template>
  <div class="index-wrap">
    <div class="index-screen">
      <div class="index-scrren-bg" :style="`background-image: url(${this.bgImg})`"></div>
      <!-- <div class="index-gamebox"></div> -->
      <div class="index-summary-wrap flex flex-y flex-x">
        <div class="index-summary tc">
          <div class="webmaster-avatar">
            <img :src="avatar" alt="avatar" />
          </div>
          <div class="webmaster-name">Gaofang Huang</div>
          <div class="webmaster-career">Developer & Designer</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bgImg from '@/assets/bg.jpg';
import Avatar from '@/assets/carrot.jpg';

export default {
  data() {
    return {
      bgImg: bgImg,
      avatar: Avatar,
    };
  },
};
</script>

<style lang="scss">
.is-pc.ignore {
  .index-wrap {
    .index-screen {
      margin-top: -90px;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      position: relative;
    }
    .index-scrren-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: bottom center;
      transform: scale(1.05);
      opacity: 0.1;
      filter: blur(8px);
      overflow: hidden;
      transition: 6s;
      &:hover {
        filter: none;
      }
    }
  }
  .index-summary-wrap {
    height: 80vh;
  }

  .webmaster-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .webmaster-name {
    font-size: 36px;
    font-weight: 200;
    font-weight: 200;
    margin-bottom: 14px;
  }
  .webmaster-career {
    font-size: 18px;
    font-weight: 800;
  }
}
.is-mobile {
  .index-scrren-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: bottom center;
    transform: scale(1.05);
    opacity: 0.1;
    filter: blur(8px);
    overflow: hidden;
  }
  .index-summary-wrap {
    height: 80vh;
  }
  .webmaster-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 40px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .webmaster-name {
    font-size: 36px;
    font-weight: 200;
    font-weight: 200;
    margin-bottom: 14px;
  }
  .webmaster-career {
    font-size: 18px;
    font-weight: 800;
  }
}
</style>
