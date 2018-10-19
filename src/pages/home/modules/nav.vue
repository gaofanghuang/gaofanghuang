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
    right: px2rem(40);
    top: px2rem(20);

    .nav-tap {
      display: block;
      width: px2rem(48);
      height: px2rem(48);
      border: 4px solid #fff;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      z-index: 99;
    }

    .nav-list {
      display: none;
      position: fixed;
      right: 0;
      top: 0;
      background: rgba($primary, 0.75);
      padding: px2rem(80) px2rem(40) px2rem(40) px2rem(40);
      z-index: 98;
    }

    a {
      color: #fff;
      font-size: px2rem(24);
      transition: 0.2s;
      opacity: 0.6;

      &:hover {
        opacity: 1;
      }
    }

    &:hover {
      .nav-list {
        display: block;
      }
    }
  }
</style>