<template>
    <Transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
        <div class="project-wrap">
            <div class="project-banner">
                <p>这里是banner</p>
                <!-- <img src="" alt=""> -->
                <div class="project-nav flex">
                    <button @click="goTo('/')">Home</button>
                    <button class="active" @click="goTo('/project')">Project</button>
                    <button @click="goTo('/blog')">Blog</button>
                    <button @click="goTo('/about')">About</button>
                </div>
            </div>
            <div class="project-content">
                <div class="project-category" v-for="(item, key) in project" :key="`project-${item.category}-${key}`">
                    <div class="project-category-name">{{ item.category }}</div>
                    <div class="project-list flex">
                        <template v-if="item.type === 'pc'">
                            <div class="project-item" v-for="(item2, key2) in item.list" :key="`project-item-${key2}`">
                                <a :href="item2.url">
                                    <div class="project-cover">
                                        <img :src="item2.cover" alt="">
                                        <time class="project-date">{{ item2.lasttime | formatDate('yyyy/MM/dd') }}</time>
                                    </div>
                                    <p class="project-name">{{ item2.name }}</p>
                                    <p class="project-descript">{{ item2.descript }}</p>
                                </a>
                            </div>
                        </template>
                        <template v-if="item.type === 'app'">
                            <div class="project-item project-item-type-app" v-for="(item2, key2) in item.list"
                                :key="`project-item-${key2}`">
                                <a :href="item2.url">
                                    <div class="project-cover">
                                        <img :src="item2.cover" alt="">
                                    </div>
                                    <p class="project-name">{{ item2.name }}</p>
                                    <p class="project-descript">{{ item2.descript }}</p>
                                    <div class="project-item-hover">
                                        <img src="" alt="">
                                    </div>
                                </a>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
    import * as api from "@/util/api";
    import QRCode from "qrcode";
    export default {
        data() {
            return {
                project: [{
                    category: 'PC Web',
                    type: 'pc',
                    list: [{
                        cover: '111.png',
                        name: 'XXX',
                        url: 'http://www.huanggaofang.com',
                        descript: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
                        lasttime: 1546913540570
                    }]
                }, {
                    category: 'Mobile App',
                    type: 'app',
                    list: [{
                        cover: '111.png',
                        name: 'XXX',
                        platform: [{
                            client: 'h5',
                            path: 'http://www.huanggaofang.com'
                        }],
                        url: 'http://www.huanggaofang.com',
                        descript: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
                        lasttime: 1546913540570
                    }]
                }, {
                    category: 'Design',
                    type: 'image',
                    list: []
                }, {
                    category: 'Paint',
                    type: 'image',
                    list: []
                }, {
                    category: 'Vlog',
                    type: 'video',
                    list: []
                }]
            }
        },
        mounted() {

        },
        methods: {
            goTo(path) {
                this.$router.push(path)
            },
        }
    }
</script>


<style lang="scss">
    .project-wrap {
        .project-banner {
            min-height: 420px;
            background: #efefef;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999999;
            position: relative;
        }

        .project-nav {
            position: absolute;
            bottom: 32px;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0.68;

            button {
                color: #999999;
                cursor: pointer;
                padding: 6px 10px;
                border: 1Px solid #999999;
                border-radius: 9px;

                &:hover {
                    color: $primary;
                    border: 1Px solid $primary;
                }
            }

            button+button {
                margin-left: 40px;
            }

            .active {
                border: none;
                background: linear-gradient(45deg, $green, $primary);
                color: #ffffff;

                &:hover {
                    color: #ffffff;
                    border: none;
                }
            }
        }

        .project-content {
            padding: 20px 4vw;
        }

        .project-category {
            margin-bottom: 80px;
        }

        .project-list {
            flex-wrap: wrap;
            padding-left: 80px;
        }

        .project-item {
            background: #ffffff;
            width: 400px;
            padding: 10px;
            margin-right: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 8px #f2f2f2, 0 3px 3px #d9d9d9;
            transition: 0.2s;
            cursor: pointer;

            &:hover {
                box-shadow: none;
            }
        }

        .project-category-name {
            margin-bottom: 20px;
            color: #999999;
            font-size: 38px;
            font-weight: 600;
        }

        .project-cover {
            width: 380px;
            height: 320px;
            background: #EFEFEF;
        }

        .project-name {
            font-size: 28px;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .project-descript {
            font-size: 24px;
            word-wrap: wrap;
            word-break: break-all;
        }

        .project-item-type-app {

            position: relative;

            .project-item-hover {
                display: none;
            }

            &:hover {
                .project-item-hover {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    width: 380px;
                    height: 320px;
                    background: rgba($color: #000000, $alpha: 0.2);
                    display: block;
                }
            }
        }
        .project-date {
            font-size: 24px;
        }
    }
</style>