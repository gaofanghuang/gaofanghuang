<template>
    <header class="header-wrap flex align-center" v-bind:class="{'is-progress': isProgress}">
        <div class="header-left flex-base flex-grow">
            <Icon type="sousuo" @click="goSearch" v-if="isSearch" />
            <Icon type="fanhui" v-if="isBack" @click="goBack" />
            <Icon type="caidan" @click="handleMenu" v-if="isMenu" />
        </div>
        <div class="header-title flex flex-bas flex-grow align-center justify-center">
            {{ title || 'OF' }}
        </div>
        <div class="header-righte flex flex-base flex-grow justify-end">
            <Icon type="bianji" @click="goAdd" v-if="isAdd" />
            <Icon type="gengduo1" @click="handleMore" v-if="isMore" />
            <Icon type="fasong" @click="handleSave" v-if="isSave" />
        </div>
    </header>
</template>

<script>
    import bus from "@/bus.js";
    export default {
        data() {
            return {
                title: ""
            }
        },
        computed: {
            isBack() {
                return !!this.$route.meta.isBack
            },
            isSearch() {
                return !!this.$route.meta.isSearch
            },
            isAdd() {
                return !!this.$route.meta.isAdd && process.env.NODE_ENV !== "development"
            },
            isSave() {
                return !!this.$route.meta.isSave
            },
            isMore() {
                return !!this.$route.meta.isMore && process.env.NODE_ENV === "development"
            },
            isMenu() {
                return !!this.$route.meta.isMenu
            },
            isProgress() {
                return this.$store.state.isProgress
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
            // PC按下键盘快捷键保存
            window.addEventListener('keydown', (e) => {
                // 可以判断是不是mac，如果是mac,ctrl变为花键
                // event.preventDefault() 方法阻止元素发生默认的行为。
                if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
                    e.preventDefault()
                    this.handleSave()
                }
            }, false)
            this.title = this.$route.meta.title
        },
        methods: {
            goBack(num = -1) {
                window.history.length <= 1 ?
                    this.$router.push("/") :
                    this.$router.back(num);
            },
            goSearch() {
                console.log("搜索")
                this.$router.push("/list")
            },
            goAdd() {
                console.log("新建")
                this.$router.push("/add")
            },
            handleSave() {
                bus.$emit("saveInfo")
            },
            handleMore() {
                bus.$emit("handleMore")
            },
            handleMenu() {
                bus.$emit("handleMenu")
            }
        }
    }
</script>


<style lang="scss">
    .header-wrap {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 90px;
        border-bottom: 1Px solid #f2f2f2;
        box-shadow: 0 0 12px rgba($black, 0.28);
        padding: 0 20px;
        background: $white;

        .header-title {
            height: 100%;
        }

        .save-btn {
            display: inline-block;
            padding: 1Px;
            padding: 0 10px;
            height: 60px;
            border-radius: 30px;
            cursor: pointer;
            transition: 0.2s ease-out;
            font-size: 24;
            font-weight: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            background: $white;
            color: $primary;
            border: 1Px solid $primary;
            box-shadow: 0 6px 12px rgba($primary, 0.18);

            &:hover {
                background: linear-gradient(90deg, $primary, $green);
                color: $white;
                box-shadow: none;
            }
        }

        .icon-wrap {
            cursor: pointer;
            transition: 0.2s;
            &:hover {
                color: $primary;
            }
        }

        .icon-wrap + .icon-wrap {
            margin-left: 20px;
        }
    }
</style>