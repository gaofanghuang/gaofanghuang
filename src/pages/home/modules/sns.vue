<template>
  <div class="sns-wrap">
    <ul class="sns-list">
      <li class="sns-item">
        <a href="mailto:gaofanghuang@vip.qq.com" title="gaofanghuang@vip.qq.com">Email</a>
      </li>
      <li class="sns-item"><a href="https://github.com/gaofanghuang" target="_blank">Github</a></li>
      <li class="sns-item"><a href="https://www.behance.net/huanggaofang" target="_blank">Behance</a></li>
    </ul>
  </div>
</template>

<style lang="scss">
  .sns-wrap {
    position: fixed;
    bottom: 0;
    left: px2rem(40);
    cursor: pointer;

    .sns-list {
      position: relative;

      &::after,
      &::before {
        display: block;
        position: absolute;
        bottom: 0;
        left: px2rem(40);
        content: "";
        width: 4px;
        height: px2rem(60);
        background: #fff;
        transition: 0.2s ease-in-out;
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }
    }

    .sns-item {
      transition: 0.2s ease-in-out;
      opacity: 0;
      padding: px2rem(10);
      border: 1px solid #fff;
      font-size: px2rem(20);
      border-radius: px2rem(40);
      text-align: center;
      margin-bottom: 20px;

      a {
        color: #fff;
      }
    }

    &:hover {
      .sns-list {
        &::after,
        &::before {
            opacity: 0;
        }
      }
      .sns-item {
        opacity: 0.45;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
</style>