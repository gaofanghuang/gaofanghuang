<template>
  <footer class="footer-wrap">
    <p class="copyright">CopyRight© 2020 <Icon name="heart" /> <a href="http://www.huanggaofang.com">Gaofang Huang</a></p>
    <p class="powered">Powered by GaofangHuang • Theme by GaofangHuang | All Rights Reserved</p>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer-wrap {
  width: 100%;
  background: #f2f2f2;
  border-top: 1px solid #e9e9e9;
  text-align: center;
  padding: 40px 0 20px 0;
  color: #999999;
  align-self: flex-end;
  a:hover {
    color: $primary;
  }
  .powered {
    font-size: 12px;
  }
}
</style>
