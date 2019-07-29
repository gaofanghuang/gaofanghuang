<template>
    <footer class="footer-wrap">
        Copyright © <a href="https://huanggaofang.com/">Gaofang Huang</a> ❤ 2019
    </footer>
</template>

<style lang="scss">
    .footer-wrap {
        position: fixed;
        bottom: 12px;
        right: 12px;
        text-align: right;
        color: rgba($white, 0.8);
        font-size: 12px;
        padding-right: 12px;

        @media screen and (max-width:1024px) {
            position: static;
            padding-bottom: 12px;
        }
    }
</style>