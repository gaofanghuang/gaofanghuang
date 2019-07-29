<template>
    <div class="info-wrap">
        <div class="info-banner">
            <div class="info-container tc">
                <div class="info-name">{{ info.name }}</div>
                <div class="info-describe">{{ info.describe }}</div>
                <div class="info-tools flex flex-both">
                    <div class="info-tags flex flex-y">
                        <i class="icon icon-tag-w"></i>
                        <span class="info-tag" v-for="tag in info.tag" :key="`info-tag-${tag}`" v-text="mapTag(tag)">
                        </span>
                    </div>
                    <div class="info-urls flex">
                        <div class="info-qrcode">
                            <i class="icon icon-qrcode-w"></i>
                            <div class="info-qrcode-drop">
                                <canvas id="qrcode"></canvas>
                            </div>
                        </div>
                        <a class="ml20" v-if="info.url" :href="info.url"><i class="icon icon-url-w"></i></a>
                        <a class="ml20" v-if="info.github" :href="info.github"><i class="icon icon-github-w"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="info-container">
            <div class="info-logs">
                <div class="info-logs-item" v-for="item in logs" :key="`logs-${item.id}`">
                    <span class="info-logs-version"
                        :class="{'is-new-version': showVersion(item.version)}">v{{ item.version }}</span>
                    <div class="info-logs-date">
                        <span class="year">{{ item.lasttime | formatDate('yyyy') }}</span>
                        <span>{{ item.lasttime | formatDate('MM/dd hh:mm') }}</span>
                    </div>

                    <template v-if="item.type == 1">
                        <div>
                            需求
                        </div>
                    </template>

                    <template v-if="item.type == 2">
                        <div class="info-log-box">
                            <div class="info-log-title" v-if="item.title">{{ item.title }}</div>
                            <div class="info-log-article markdown-view" v-html="viewContent(item.content)"></div>
                        </div>
                    </template>

                    <template v-if="item.type == 3">
                        <div class="info-log-box">
                            <div class="info-log-title" v-if="item.title">{{ item.title }}</div>
                            <div class="info-log-imglist">
                                <img :src="img.path | getImg" v-for="img in item.imgs" :key="`img-${img.id}`">
                            </div>
                        </div>
                    </template>

                    <template v-if="item.type == 4">
                        <div class="info-log-box">
                            <div class="info-log-title" v-if="item.title">{{ item.title }}</div>
                            <iframe :src="`//player.bilibili.com/player.html?aid=${item.video}`" width="100%"
                                height="500px" scrolling="no" border="0" frameborder="no" framespacing="0"
                                allowfullscreen="true">
                            </iframe>
                        </div>
                    </template>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from "@/utils/api"
    import QRCode from "qrcode"
    import md from "@/utils/markdown"

    import {
        mapState
    } from "vuex"

    export default {
        data() {
            return {
                id: this.$route.params.id,
                logs: []
            }
        },
        computed: {
            ...mapState({
                projectList: state => state.list || [],
                tags: state => state.tags || []
            }),
            info() {
                return this.projectList.length > 0 ? this.projectList.find(item => item.id == this.id) : {}
            }
        },
        created() {
            this.getLogs()
        },
        updated() {
            if (this.info.qrcode) {
                let canvas = document.getElementById("qrcode")
                QRCode.toCanvas(canvas, '232323', {
                    width: 120
                })
            }
        },
        methods: {
            mapTag(id) {
                let tag = ''
                if (this.tags.length > 0) {
                    tag = this.tags.filter(item => {
                        return item.id == id
                    })
                    tag = tag[0].name
                }
                return tag
            },
            getLogs() {
                let params = {
                    id: this.id
                }
                api.getLogs(params).then(({
                    data
                }) => {
                    if (data.length > 0) {
                        data.sort((a, b) => {
                            return b.lasttime - a.lasttime
                        })
                    }
                    this.logs = data
                })
            },
            showVersion(v) {
                let res = false
                if (v.split('.')[2] == 0) {
                    res = true
                }
                return res
            },
            viewContent(content) {
                return content ? md(content) : ''
            }
        },
    }
</script>

<style lang="scss">
    .info-wrap {
        .info-banner {
            position: absolute;
            top: 0;
            width: 100%;
            height: 180px;
            padding-top: 40px;
            color: $white;
        }

        .info-name {
            font-size: 24px;
            margin-bottom: 15px;
        }

        .info-describe {
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 20px;
        }

        .info-tag {
            border: 1Px solid $white;
            font-size: 12px;
            border-radius: 4px;
            padding: 2px 6px;
            margin-right: 8px;
            opacity: 0.8;
            transition: 0.2s;

            &:hover {
                opacity: 1;
            }
        }

        .icon-tag-w {
            width: 18px;
            height: 20px;
            margin-right: 5px;
        }

        .info-urls {
            height: 20px;

            .icon-qrcode-w {
                width: 24px;
                height: 24px;
                position: relative;
                top: -2px;
            }

            .icon-url-w {
                width: 20px;
                height: 20px;
            }

            .icon-github-w {
                width: 20px;
                height: 20px;
            }
        }

        .info-qrcode {
            position: relative;
            cursor: pointer;

            .icon:hover+.info-qrcode-drop {
                opacity: 1;
            }
        }

        .info-qrcode-drop {
            position: absolute;
            top: 34px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 120px;
            background: #ffffff;
            border-radius: 4px;
            box-shadow: 0 3px 9px rgba(#000000, 0.08);
            opacity: 0;
            transition: 0.2s;

            &::before {
                position: absolute;
                content: "";
                top: -9px;
                left: 50%;
                transform: translateX(-50%);
                border-width: 0 9px 9px;
                border-style: solid;
                border-color: transparent transparent #f9f9f9;
            }

            canvas {
                width: 120px;
                height: 120px;
            }
        }

        .info-container {
            width: 1024px;
            margin-left: auto;
            margin-right: auto;
            padding-top: 20px;

            @media screen and (max-width:1024px) {
                width: 100vw;
                padding: 0 10px;
            }
        }

        .info-logs {
            padding-left: 120px;
            position: relative;

            &::before {
                position: absolute;
                top: 0;
                left: 100px;
                content: "";
                width: 1Px;
                height: 100%;
                background: $border-color;
            }
        }

        .info-logs-item {
            position: relative;
            margin-bottom: 40px;
        }

        .info-logs-date {
            font-size: 16px;
            font-weight: 600;

            .year {
                font-size: 12px;
                margin-right: 10px;
                font-weight: 400;
            }
        }

        .info-logs-version {
            position: absolute;
            top: 2px;
            left: -100px;
            width: 60px;
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            text-align: right;
            color: $light;

            &.is-new-version {
                border: 1Px solid $primary;
                color: $primary;
                border-radius: 4px;
                text-align: center;

                &::before {
                    position: absolute;
                    content: "";
                    top: 50%;
                    right: -4px;
                    transform: translateY(-50%);
                    border: 4px solid transparent;
                    border-right-width: 0;
                    border-left-color: $primary;
                }

                &::after {
                    position: absolute;
                    content: "";
                    top: 50%;
                    right: -3px;
                    transform: translateY(-50%);
                    border: 3px solid transparent;
                    border-right-width: 0;
                    border-left-color: $background-color;
                }
            }
        }

        .info-log-box {
            background: $white;
            padding: 10px;
            border-radius: 4px;
            margin-top: 20px;
            box-shadow: 0px 3px 8px 0px rgba(223, 223, 223, 0.38);
        }

        .info-log-title {
            margin-bottom: 40px;
            font-size: 18px;
            text-align: center;
        }

        .info-log-article {
            max-height: 500px;
            overflow-y: auto;
            padding: 10px;
            @include scroll-bar($light);
        }

        .info-log-imglist {
            max-height: 500px;
            overflow: hidden;
        }
    }
</style>