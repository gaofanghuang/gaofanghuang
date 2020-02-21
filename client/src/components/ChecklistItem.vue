<template>
  <router-link :to="`/checklist/${item._id}`" class="checklist-item-wrap">
    <div class="checklist-item-cover">
      <img :src="item.cover.path | getImg" :alt="item.name" />
    </div>
    <div class="checklist-item-info">
      <div class="checklist-item-name">{{ item.name }}</div>
      <div class="checklist-item-describe">{{ item.describe }}</div>
      <div class="checklist-item-tags">
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
.checklist-item-wrap {
  display: flex;
  background: #ffffff;
  border: 1px solid $border-color;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.6s;
  .checklist-item-tags {
    display: none;
  }
  &:hover {
    box-shadow: 0 9px 16px rgba($color: #000000, $alpha: 0.08);
    .checklist-item-tags {
      display: block;
    }
    .checklist-item-describe {
      display: none;
    }
  }
  .checklist-item-cover {
    width: 140px;
    height: 140px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .checklist-item-info {
    width: calc(100% - 140px);
    padding: 10px;
  }
  .checklist-item-name {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .checklist-item-describe {
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
