<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    const body = document.querySelector('body');
    const loadingApp = document.querySelector('#loadingApp');
    body.removeChild(loadingApp);
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-clip: padding-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

*:after,
*:before {
  box-sizing: border-box;
  background-clip: padding-box;
}

*:focus {
  outline: none;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba($color: #000000, $alpha: 0.2);
  transition: 0.2s;
  border-radius: 8px;
}

::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}

:hover::-webkit-scrollbar-thumb {
  background-color: rgba($color: #000000, $alpha: 0.6);
}

.el-pagination {
  margin-top: 40px;
  text-align: center;
}
</style>
