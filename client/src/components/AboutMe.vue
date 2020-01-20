<template>
  <div class="about-me-wrap">
    <div class="about-me-box">
      <div class="about-me-avatar">
        <img :src="avatar" alt="avatar" />
      </div>
      <div class="about-me-name">Gaofang Huang</div>
      <div class="about-me-sns">
        <div class="about-me-sns-item" v-for="item in sns" :key="item.name">
          <a :href="item.url" target="_blank">
            <Icon :name="item.icon" />
            <span>{{ item.name }}</span>
          </a>
        </div>
      </div>
      <div class="about-me-motto">Do something fun</div>
    </div>
  </div>
</template>

<script>
import carrot from '@/assets/carrot.jpg';

export default {
  data() {
    return {
      avatar: carrot,
      sns: [
        {
          icon: 'mail',
          name: 'gaofanghuang@vip.qq.com',
          url: 'mailto:gaofanghuang@vip.qq.com',
        },
        {
          icon: 'github-fill',
          name: 'Gaofang Huang',
          url: 'https://github.com/gaofanghuang',
        },
        {
          icon: 'bilibili-line',
          name: '狂暴胡萝卜',
          url: 'https://space.bilibili.com/15185557',
        },
      ],
      info: {},
    };
  },
};
</script>

<style lang="scss">
.about-me-wrap {
  padding-top: 30px;
  .about-me-box {
    border: 1px solid $border-color;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
  }
  .about-me-avatar {
    margin-top: -40px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    border: 2px solid #ffffff;
    box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.25);
    margin-bottom: 10px;
  }
  .about-me-name {
    font-size: 16px;
    font-family: 'moon-regular';
    letter-spacing: 1px;
  }
  .about-me-motto {
    border-top: 1px solid #efefef;
    margin-top: 20px;
    padding-top: 20px;
    text-align: center;
    font-size: 16px;
    color: #dfdfdf;
    font-family: 'moon-light';
    letter-spacing: 1px;
  }
  .about-me-sns {
    border-top: 1px solid #efefef;
    margin-top: 20px;
    padding-top: 20px;
    text-align: left;
    color: #999999;
    .icon {
      font-size: 18px;
      margin-right: 10px;
    }
  }
  .about-me-sns-item {
    .icon {
      color: #d37a99;
    }
    &:nth-of-type(2) {
      .icon {
        color: rgb(177, 110, 169);
      }
    }
    &:nth-of-type(3) {
      .icon {
        color: #6bb0bb;
      }
    }
    & + .about-me-sns-item {
      margin-top: 20px;
    }
    a {
      display: flex;
      align-items: center;
    }
  }
}
</style>
