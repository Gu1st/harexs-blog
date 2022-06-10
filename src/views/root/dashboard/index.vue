<template>
  <n-grid x-gap="12" :cols="3">
    <n-gi>
      <div class="dashboard-item">
        <div class="dashboard-item-name">文章数量</div>
        <div class="dashboard-item-num">{{ info.articleCount }}</div>
      </div>
    </n-gi>
    <n-gi>
      <div class="dashboard-item">
        <div class="dashboard-item-name">评论数量</div>
        <div class="dashboard-item-num">{{ info.commentCount }}</div>
      </div>
    </n-gi>
    <n-gi>
      <div class="dashboard-item">
        <div class="dashboard-item-name">分类数量</div>
        <div class="dashboard-item-num">{{ info.classifyCount }}</div>
      </div>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { home } from '../../../api/root/home';
import { ref } from 'vue';
const info = ref({
  articleCount: 0,
  commentCount: 0,
  classifyCount: 0
});
const getInfo = () => {
  const res = home();
  res.then(res => {
    info.value.articleCount = res.data.articleCount;
    info.value.commentCount = res.data.commentCount;
    info.value.classifyCount = res.data.classifyCount;
  });
};

getInfo();
</script>

<style scoped lang="scss">
.dashboard-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 120px;
  background-color: rgba(0, 128, 0, 0.5);
  border-radius: 6px;
  &-name {
    color: #f1f2f3;
    font-size: 20px;
  }
  &-num {
    color: #fff;
    font-size: 36px;
  }
}
</style>
