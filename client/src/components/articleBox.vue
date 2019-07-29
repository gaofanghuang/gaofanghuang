<template>
    <div class="article-box-wrap">
        <div class="markdown-view" :class="{'show': more}" v-html="viewContent(content)"></div>
        <div class="article-box-more" @click="more = !more">{{ more ? '收起' : '阅读全文' }}</div>
    </div>
</template>

<script>
    import md from "@/utils/markdown"
    export default {
        data () {
            return {
                more: false
            }
        },
        props: ['content'],
        methods: {
            viewContent(content) {
                return content ? md(content) : ''
            }
        }
    }
</script>

<style lang="scss">
.article-box-wrap {
    .markdown-view {
        padding: 0 20px;
        height: 350px;
        overflow: hidden;
        &.show {
            height: auto;
        }
    }
    .article-box-more {
        height: 36px;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        position: relative;
        color: $light;
        &::before {
            position: absolute;
            top: -20px;
            left: 0;
            content: "";
            width: 100%;
            height: 20px;
            background: linear-gradient(0deg, rgba($white, 1) 0%, rgba($white, 0) 100%);
        }
    }
}
</style>
