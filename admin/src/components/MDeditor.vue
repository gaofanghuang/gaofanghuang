<template>
  <div class="markdown-editor">
    <div class="markdown-tools">
      <div class="markdown-tool" @click="isPreview = false" :class="{ active: !isPreview }">
        Code
      </div>
      <div class="markdown-tool" @click="isPreview = true" :class="{ active: isPreview }">View</div>

      <el-popover placement="top" width="320" v-model="showEmoji">
        <div class="markdown-tools-emoji" v-show="showEmoji">
          <span @click="addEmoji(item)" v-for="(item, key) in emoji" :key="`emoji-${key}`">{{
            item
          }}</span>
        </div>
        <div slot="reference" class="markdown-tool">Emoji</div>
      </el-popover>
    </div>
    <textarea
      class="markdown-input"
      v-show="!isPreview"
      spellcheck="false"
      autocapitalize="off"
      autocomplete="off"
      autocorrect="off"
      v-model="value"
      :placeholder="placeholder"
    ></textarea>
    <div class="markdown-view" v-show="isPreview" v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import md from '@/utils/markdown';
import emoji from './emoji';

export default {
  props: {
    content: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  model: {
    prop: 'content',
    event: 'toContent',
  },
  data() {
    return {
      value: '',
      isPreview: false,
      emoji: emoji,
      showEmoji: false,
    };
  },
  computed: {
    compiledMarkdown() {
      return md(this.value);
    },
  },
  watch: {
    value() {
      this.$emit('toContent', this.value);
    },
    content() {
      this.value = this.content;
    },
  },
  created() {
    this.value = this.content;
  },
  methods: {
    addEmoji(item) {
      this.value = this.value + item;
      this.showEmoji = false;
    },
  },
};
</script>

<style lang="scss">
.markdown-editor {
  .markdown-view,
  .markdown-input {
    background: #f9f9f9;
    border: 1px solid #efefef;
    padding: 20px;
    font-size: 16px;
    color: #666;
    resize: none;
    letter-spacing: 1px;
    width: 100%;
    border-radius: 4px;
    height: 300px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba($color: #999999, $alpha: 0.2);
      transition: 0.2s;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba($color: #000000, $alpha: 0);
    }

    &:hover::-webkit-scrollbar-thumb {
      background-color: rgba($color: #999999, $alpha: 0.6);
    }
  }

  .markdown-tools {
    display: flex;
    position: relative;
    top: 1px;
  }

  .markdown-tool {
    margin-right: 5px;
    font-size: 12px;
    background: #ffffff;
    color: #999999;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding: 0 8px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #efefef;

    cursor: pointer;

    &.active {
      background: #f9f9f9;
      border-bottom: none;
    }
  }
}

.markdown-tools-emoji {
  span {
    display: inline-block;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
</style>
