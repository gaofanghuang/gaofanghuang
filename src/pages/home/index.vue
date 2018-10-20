<template>
  <div class="home-wrap">
    <Nav />
    <SNS />
    <div class="home-about">
      <div class="home-about-me">
        <div class="home-about-avatar">
          <img src="/static/img/carrot.jpg">
        </div>
        <h2 class="home-about-name">Huang GaoFang</h2>
        <p>Front-end Developer & UI Designer</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from './modules/nav'
  import SNS from './modules/sns'
  export default {
    components: {
      Nav,
      SNS
    }
  }
</script>

<style lang="scss">
  .home-wrap {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba($green, 0.75), rgba($primary, 0.75));
    color: #fff;

    .home-about {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-shadow: 3px 6px 9px darken(rgba($primary, 0.75), 5%);
      font-size: px2rem(36);
    }

    .home-about-me {
      text-align: center;
    }

    .home-about-avatar {
      width: px2rem(240);
      height: px2rem(240);
      border-radius: 50%;
      background: url("/static/img/carrot_hover.jpg") no-repeat center center;
      background-size: cover;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      cursor: pointer;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: px2rem(240);
        height: px2rem(240);
        border-radius: 50%;
        content: "";
        border: 3px solid #fff;
        opacity: 0.4;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.2s;
        border-radius: 50%;
        overflow: hidden;
      }

      &:hover {
        img {
          opacity: 0;
        }

        &::before {
          animation: toWrap 0.28s ease-out;
        }
      }
    }

    @keyframes toWrap {
      0% {
        transform: scale(0.9);
        opacity: 0.2;
      }

      50% {
        transform: scale(1);
        opacity: 1;
      }

      100% {
        transform: scale(1.4);
        opacity: 0;
      }
    }

    .home-about-name {
      margin-top: px2rem(64);
      margin-bottom: px2rem(24);
    }
  }
</style>
