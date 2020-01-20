<template>
  <div class="checklist-item" @click="goToChecklist">
    <div class="checklist-cover" v-if="item.cover">
      <img :src="item.cover.path | getImg" :alt="item.name" />
    </div>
    <div class="checklist-word">
      <div class="checklist-name">{{ item.name }}</div>
      <div class="checklist-describe">
        {{ item.describe }}
      </div>
      <div class="checklist-info">
        <div class="checklist-time">
          <Icon name="time-circle" />
          {{ item.updated_time | formatDate('yyyy-MM-dd') }}
        </div>
        <div class="checklist-tags">
          <TagMap :list="item.tag" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    goToChecklist() {
      this.$router.push(`/checklist/${this.item._id}`);
    },
  },
};
</script>

<style lang="scss">
.checklist-item {
  display: flex;
  padding: 20px;
  transition: 0.6s;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: $background-color;
  }
}
.checklist-cover {
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
.checklist-word {
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
}
.checklist-name {
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
}
.checklist-describe {
  width: 100%;
  font-size: 14px;
  color: $light;
  margin-bottom: 20px;
}
.checklist-info {
  align-self: flex-end;
  display: flex;
  align-items: center;
}
.checklist-time {
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
.checklist-tags {
  padding-left: 20px;
}
</style>
