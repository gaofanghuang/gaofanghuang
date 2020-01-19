<template>
  <div class="project-item">
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
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {},
};
</script>

<style lang="scss">
.project-item {
  display: flex;
  padding: 20px;
  transition: 0.6s;
  border-radius: 4px;
  &:hover {
    background: $background-color;
  }
}
.project-cover {
  width: 140px;
  height: 140px;
  border-radius: 4px;
  overflow: hidden;
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
}
.project-info {
  align-self: flex-end;
  display: flex;
  align-items: center;
}
.project-time {
  font-size: 12px;
  color: $light;
  .icon {
    font-size: 13px;
  }
}
.project-tags {
  padding-left: 20px;
}
</style>
