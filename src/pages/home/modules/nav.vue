<template>
  <nav class="nav">
    <span class="nav-tap"></span>
    <ul class="nav-list">
      <li class="nav-item">
        <a href="/">About</a>
      </li>
      <li class="nav-item">
        <a href="http://blog.huanggaofang.com">Blog</a>
      </li>
      <li class="nav-item">
        <a href="/">Project</a>
      </li>
      <li class="nav-item">
        <a href="/cv">CV</a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
  .nav {
    position: fixed;
    right: px2rem(30);
    top: px2rem(40);

    .nav-tap {
      display: block;
      width: px2rem(48);
      height: px2rem(48);
      border: 4px solid #fff;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      z-index: 99;
      right: px2rem(20);
    }

    .nav-list {
      position: fixed;
      right: 0;
      top: px2rem(100);
      padding: 0 px2rem(40) px2rem(40) px2rem(40);
      z-index: 98;
      text-align: center;
      transition: transform .5s ease-in-out;
      transform: scaleY(0);
      transform-origin: 0 0;
    }

    a {
      color: #fff;
      font-size: px2rem(24);
      transition: 0.2s;
      opacity: 0.6;
      position: relative;

      &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        background: $primary;
        transition: transform .5s ease-in-out;
        transform: scaleX(0);
        transform-origin: 100% 0;
      }

      &:hover {
        opacity: 1;
        &:before {
          transform: scaleX(1);
          transform-origin: 0 0;
        }
      }
    }

    &:hover {
      .nav-list {
        transform: scaleY(1);
      }
    }
  }
</style>
