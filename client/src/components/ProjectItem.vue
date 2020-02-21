<template>
  <router-link :to="`/project/${item._id}`" class="project-item-wrap">
    <div class="project-item-cover">
      <img :src="item.cover.path | getImg" :alt="item.name" />
    </div>
    <div class="project-item-info">
      <div class="project-item-name">{{ item.name }}</div>
      <div class="project-item-describe">{{ item.describe }}</div>
      <div class="project-item-tags">
        <TagMap :list="item.tag" />
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['item'],
};
</script>

<style lang="scss">
.project-item-wrap {
  display: flex;
  background: #ffffff;
  border: 1px solid $border-color;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.6s;
  .project-item-tags {
    display: none;
  }
  &:hover {
    box-shadow: 0 9px 16px rgba($color: #000000, $alpha: 0.08);
    .project-item-tags {
      display: block;
    }
    .project-item-describe {
      display: none;
    }
  }
  .project-item-cover {
    width: 140px;
    height: 140px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .project-item-info {
    width: calc(100% - 140px);
    padding: 10px;
  }
  .project-item-name {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .project-item-describe {
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    max-height: 40px;
  }
  .tag-map-list {
    display: flex;
    flex-wrap: wrap;
  }
  .tag-map-item {
    margin-bottom: 5px;
  }
}
</style>
