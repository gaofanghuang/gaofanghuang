<template>
  <router-link :to="`/project/${item._id}`" class="project-item">
    <div class="project-cover" v-if="item.cover">
      <img :src="item.cover.path | getImg" :alt="item.name" />
    </div>
    <div class="project-word">
      <div class="project-name">{{ item.name }}</div>
      <div class="project-describe">
        {{ item.describe }}
      </div>
      <div class="project-info">
        <div class="project-time">
          <Icon name="time-circle" />
          {{ item.updated_time | formatDate('yyyy-MM-dd') }}
        </div>
        <div class="project-tags">
          <TagMap :list="item.tag" />
        </div>
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
.project-item {
  display: flex;
  padding: 20px;
  transition: 0.6s;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: $background-color;
  }
}
.project-cover {
  width: 140px;
  height: 140px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.project-word {
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
  width: calc(100% -140px);
}
.project-name {
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
}
.project-describe {
  width: 100%;
  font-size: 14px;
  color: $light;
  margin-bottom: 20px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  max-height: 60px;
}
.project-info {
  align-self: flex-end;
  display: flex;
  align-items: center;
}
.project-time {
  font-size: 12px;
  color: $light;
  font-family: 'moon-regular';
  letter-spacing: 1px;
  .icon {
    font-size: 13px;
    position: relative;
    top: 1px;
  }
}
.project-tags {
  padding-left: 20px;
}
</style>
