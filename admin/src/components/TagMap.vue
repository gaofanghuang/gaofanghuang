<template>
    <div class="tag-map-list">
        <span class="tag-map-item" v-for="item in tag" :key="`${item.name}-${item.id}`">{{ item.name }}</span>
    </div>
</template>

<script>
    import * as api from "@/utils/api"
    export default {
        props: ['list'],
        data() {
            return {
                tag: [],
                tags: []
            }
        },
        created() {
            this.getTags()
        },
        methods: {
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
                    let res = []
                    for (let item of this.list) {
                        for (let item2 of this.tags) {
                            if (item == item2.id) {
                                res.push(item2)
                            }
                        }
                    }
                    this.tag = res
                })
            }
        }
    }
</script>

<style lang="scss">
.tag-map-list {
    .tag-map-item {
        display: inline-block;
        font-size: 12px;
        background: #f9f9f9;
        color: #999999;
        border-radius: 4px;
        padding: 2px 8px;
        border: 1px solid #efefef;
        margin-bottom: 5px;
        & + .tag-map-item {
            margin-left: 5px;
        }
    }
}
</style>
