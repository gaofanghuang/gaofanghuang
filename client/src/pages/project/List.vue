<template>
    <div class="list-wrap">
        <div class="list-banner flex flex-x flex-bottom">
            <div class="list-banner-title">已发布项目{{ list.length }}个</div>
        </div>
        <div class="list-container">
            <div class="list-filter flex">
                <div class="list-filter-title">标签：</div>
                <div class="list-filter-tags flex" :class="{'show': tagShow}">
                    <div class="list-filter-tag" @click="filterTag('all')" :class="{'active': tag.length === 0}">全部
                    </div>
                    <div class="list-filter-tag" :class="{'active': hasTag(item.id) }" @click="filterTag(item.id)"
                        v-for="item in tags" :key="`tag-${item.id}`">
                        {{ item.name }}
                    </div>
                    <div class="list-filter-more" @click="tagShow = !tagShow">{{ tagShow ? '收起' : '展开' }}</div>
                </div>
            </div>
            <div class="list-filter mt20 flex">
                <div class="list-filter-title">排序：</div>
                <div class="list-filter-sorts flex">
                    <div class="list-filter-sort" :class="{'active': sort === 'first'}" @click="sortList('first')">发布时间
                    </div>
                    <div class="list-filter-sort" :class="{'active': sort === 'last'}" @click="sortList('last')">更新时间
                    </div>
                </div>
            </div>
            <div class="list-content mt20 flex">
                <div class="list-item" v-for="item in filterList" :key="`item-${item.id}`">
                    <a :href="`/info/${item.id}`">
                        <div class="list-item-cover">
                            <img v-if="item.cover" :src="item.cover.path | getImg" alt="item.name">

                        </div>
                        <div class="list-item-word">
                            <a class="list-item-github" :href="item.github"><i class="icon icon-github"></i></a>
                            <div class="list-item-name mb10">{{ item.name }}</div>
                            <div class="list-item-time"><i class="icon icon-time"></i>
                                {{ item.id | formatDate('yyyy-MM-dd') }}</div>
                            <div class="list-item-tags">
                                <i class="icon icon-tag"></i>
                                <span class="list-item-tag" v-for="tag in item.tag.slice(0,3)"
                                    :key="`item-${item.id}-tag-${tag}`" v-text="mapTag(tag)"></span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from "@/utils/api"

    import {
        mapState
    } from "vuex"

    export default {
        data() {
            return {
                list: [],
                filterList: [],
                tags: [],
                tagShow: false,
                sort: 'first',
                tag: [],
            }
        },
        computed: {
            ...mapState({
                projectList: state => state.list || [],
                projectTags: state => state.tags || []
            })
        },
        created() {
            if (this.projectList.length === 0) {
                this.getList()
            } else {
                this.list = [...this.projectList]
                this.filterList = [...this.projectList]
            }
            if (this.projectTags.length === 0) {
                this.getTags()
            } else {
                this.tags = [...this.projectTags]
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
            getList() {
                api.getList().then(({
                    data
                }) => {
                    data.sort((a, b) => {
                        return b.lasttime - a.lasttime
                    })
                    this.list = data
                    this.filterList = data
                    this.$store.commit("SaveList", this.list);
                })
            },
            filterTag(id) {
                if (id === 'all') {
                    this.tag = []
                    this.filterList = [...this.list]
                } else {
                    let hasItem = this.tag.findIndex((item) => {
                        return item == id
                    })
                    if (hasItem > -1) {
                        this.tag = this.tag.filter(item => {
                            return item != id
                        })
                    } else {
                        this.tag.push(id)
                    }
                    if (this.tag.length === 0) {
                        this.filterList = [...this.list]
                    } else {
                        let _list = []
                        for (let item of this.list) {
                            let tags = item.tag.join(",").toLowerCase()
                            let hasItem = false
                            for (let tag of this.tag) {
                                if (tags.indexOf(tag) > -1) {
                                    hasItem = true
                                }
                            }
                            if (hasItem) {
                                _list.push(item)
                            }
                        }
                        this.filterList = _list
                    }
                }
            },
            hasTag(id) {
                let hasItem = this.tag.findIndex((item) => {
                    return item == id
                })
                return hasItem > -1
            },
            getTags() {
                api.getTags().then(({
                    data
                }) => {
                    let _data = []
                    for (let item of data) {
                        if (item.tags && item.tags.length > 0) {
                            for (let tag of item.tags) {
                                _data.push({
                                    pid: item.id,
                                    ...tag
                                })
                            }
                        }
                    }
                    this.tags = _data
                    this.$store.commit("SaveTags",  _data);
                })
            },
            sortList(sort) {
                this.sort = sort
                if (sort == 'first') {
                    let _list = this.list.sort((a, b) => {
                        return b.id - a.id
                    })
                    this.list = _list
                } else {
                    let _list = this.list.sort((a, b) => {
                        return b.lasttime - a.lasttime
                    })
                    this.list = _list
                }
            }
        },
    }
</script>

<style lang="scss">
    .list-wrap {
        .list-banner {
            height: 300px;
            background: darken($color: $background-color, $amount: 2%);
            color: $light;
            padding-bottom: 10px;
        }

        .list-container {
            width: 1024px;
            margin-top: 20px;
            margin-left: auto;
            margin-right: auto;

            @media screen and (max-width:1024px) {
                width: 100vw;
                padding: 0 10px;
            }
        }

        .list-content {
            flex-wrap: wrap;
        }

        .list-filter {
            @media screen and (max-width:1024px) {
                width: 100vw;
            }
        }

        .list-filter-tags {
            position: relative;
            flex-wrap: wrap;
            overflow: hidden;
            height: 26px;

            @media screen and (max-width:1024px) {
                height: 46px;
                width: calc(100% - 95px);
            }

            .list-filter-more {
                position: absolute;
                top: 0;
                right: 0;
                padding: 3px 10px;
                font-size: 12px;
                color: $light;
                background: $background-color;
                cursor: pointer;

                &:hover {
                    color: $primary;
                }

            }

            &.show {
                overflow: unset;
                height: auto;
            }
        }

        .list-filter-tag {
            display: inline-block;
            color: $gray;
            padding: 3px 10px;
            margin-right: 6px;
            border-radius: 4px;
            margin-bottom: 6px;
            cursor: pointer;
            transition: 0.2s;
            font-size: 12px;
            border: 1Px solid #eaeaef;

            &:hover {
                background: #eaeaef;
            }

            &.active {
                background: #eaeaef;
            }

        }

        .list-filter-title {
            flex-shrink: 0;
        }

        .list-item {
            cursor: pointer;
            width: 240px;
            margin-bottom: 20px;
            margin-right: 20px;

            &:hover img {
                filter: none;
            }

            @media screen and (max-width:1024px) {
                width: 100%;
                margin-right: 0;
            }
        }

        .list-item-cover {
            width: 100%;
            height: 180px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            overflow: hidden;

            @media screen and (max-width:1024px) {
                height: 60vw;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: 0.6s;
                filter: grayscale(100%);
                filter: gray;
            }
        }

        .list-item-word {
            width: 100%;
            position: relative;
            background: $white;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            overflow: hidden
        }

        .list-item-github {
            position: absolute;
            top: 8px;
            right: 6px;
            display: block;
            width: 24px;
            height: 20px;

            @media screen and (max-width:1024px) {
                width: 40px;
                height: 36px;
            }
        }

        .list-item-tags {
            border-top: 1px solid $border-color;
            padding: 10px;
            margin-top: 10px;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;

            .icon-tag {
                position: relative;
                top: 2px;
                width: 14px;
                height: 14px;
                margin-right: 5px;
                background-position: 3px 0;

                @media screen and (max-width:1024px) {
                    top: 4px;
                    width: 26px;
                    height: 24px;
                }
            }
        }

        .list-item-tag {
            display: inline-block;
            color: $gray;
            padding: 3px 10px;
            margin-right: 6px;
            border-radius: 4px;
            margin-bottom: 6px;
            cursor: pointer;
            transition: 0.2s;
            font-size: 12px;
            border: 1Px solid #eaeaef;

            &:hover {
                background: #eaeaef;
            }
        }

        .list-item-name {
            color: $gray;
            padding-top: 10px;
            padding-left: 10px;
            padding-right: 40px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .list-item-time {
            font-size: 12px;
            color: $light;
            padding-left: 10px;

            .icon-time {
                position: relative;
                top: 2px;
                width: 14px;
                height: 12px;

                @media screen and (max-width:1024px) {
                    top: 4px;
                    width: 26px;
                    height: 24px;
                }
            }
        }

        .list-filter-sorts {
            border: 1Px solid #eaeaef;
            height: 28px;
            line-height: 26px;
            border-radius: 14px;
            font-size: 12px;
            cursor: pointer;
            position: relative;
            top: -3px;
            overflow: hidden;
            color: $gray;

            &::after {
                position: absolute;
                top: 0;
                left: 49.7%;
                content: "";
                width: 0.6%;
                height: 100%;
                background: #eaeaef;
            }

            @media screen and (max-width:1024px) {
                height: 46px;
                line-height: 44px;
            }
        }

        .list-filter-sort {
            width: 50%;
            height: 100%;
            padding: 0 10px;

            &.active {
                background: #eaeaef;
            }
        }
    }
</style>