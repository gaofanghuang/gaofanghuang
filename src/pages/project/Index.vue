<template>
  <div class="project-wrap">
    <Nav />
    <div class="project-main">
      sss
    </div>
    <ul class="project-list">
      <li class="project-item">
        <img src="" alt="" class="project-cover">
        <div class="project-info">
          <p class="project-name"><a href="">Project Name</a></p>
          <p class="project-platform">PC Web</p>
          <p class="project-language">Javascript</p>
          <p class="project-description">description</p>
          <p class="project-qrcode">view qrcode</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import Nav from '../home/modules/nav'
  export default {
    components: {
      Nav
    }
  }
</script>


<style lang="scss">
  .project-wrap {
    width: 100%;
    min-height: 100%;
    background: #f5f5f5;

    .project-main {
      width: 100%;
      height: 68vh;
      background: linear-gradient(90deg, rgba($green, 0.75), rgba($primary, 0.75));
    }

    .project-list {
      width: 100%;
      padding: px2rem(40);
      display: flex;
      flex-wrap: wrap;
    }

    .project-item {
      width: 25%;
      height: px2rem(260);
      background: #fff;
      padding: px2rem(20);
      display: flex;
    }

    .project-cover {
      width: px2rem(220);
      height: px2rem(220);
      background: #f2f2f2;
    }

    .project-info {
      padding-left: px2rem(20);
      font-size: px2rem(24);
      color: #999;

      p {
        margin-bottom: px2rem(10);
      }
    }

    .project-name {
      font-size: px2rem(36);

      a {
        color: $primary;
      }
    }

    .project-qrcode {
      cursor: pointer;

      &:hover {
        color: $primary;
      }
    }
  }
</style>