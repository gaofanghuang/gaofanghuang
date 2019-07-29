<template>
    <header class="header-wrap flex flex-y flex-both">
        <a href="/" class="header-logo"></a>
        <div class="header-nav flex flex-y flex-gap">
            <router-link to="/index" class="header-nav-item">
                <i class="icon icon-nav-home"></i>
            </router-link>
            <router-link to="/list" class="header-nav-item">
                <i class="icon icon-nav-project"></i>
            </router-link>
            <router-link to="/about" class="header-nav-item">
                <i class="icon icon-nav-about"></i>
            </router-link>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                title: ""
            }
        },
        watch: {
            $route(newRoute) {
                let {
                    title
                } = newRoute.meta || {};

                if (title) {
                    this.title = title;
                }
            }
        },
        mounted() {
            this.title = this.$route.meta.title
        },
        methods: {
            goBack(num = -1) {
                window.history.length <= 1 ?
                    this.$router.push("/") :
                    this.$router.back(num);
            },
            goTop() {
                let distance = document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
                let step = distance / 50; //每步的距离
                (function jump() {
                    if (distance > 0) {
                        distance -= step;
                        window.scrollTo(0, distance);
                        setTimeout(jump, 10)
                    }
                })();
            }
        }
    }
</script>


<style lang="scss">
    .header-wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        padding: 12px;
        z-index: 9;

        @media screen and (max-width:1024px) {
            height: 80px;
            padding: 16px;
        }

        .header-logo {
            display: block;
            width: 164px;
            height: 24px;
            background: url("../assets/GAOFANG.png") no-repeat;
            background-size: auto 100%;
        }

        .header-nav {
            width: 120px;
            height: 30px;
            background: rgba(0, 0, 0, 0.08);
            border-radius: 15px;

            @media screen and (max-width:1024px) {
                width: 140px;
                height: 50px;
                border-radius: 25px;
            }
        }

        .header-nav-item {
            width: 24px;
            height: 24px;
            opacity: 0.65;
            transition: 0.2s;

            @media screen and (max-width:1024px) {
                width: 30px;
                height: 30px;
            }

            &.router-link-active,
            &:hover {
                opacity: 1;
            }
        }
    }
</style>