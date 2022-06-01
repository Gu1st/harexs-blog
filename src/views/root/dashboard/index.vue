<template>
  <n-grid x-gap="12" :cols="3">
    <n-gi>
      <div class="dashboard-item">
        <div class="dashboard-item-name">文章数量</div>
        <div class="dashboard-item-num">121</div>
      </div>
    </n-gi>
    <n-gi>
      <div class="dashboard-item">
        <div class="dashboard-item-name">评论数量</div>
        <div class="dashboard-item-num">23</div>
      </div>
    </n-gi>
    <n-gi>
      <div class="dashboard-item">
        <div class="dashboard-item-name">分类数量</div>
        <div class="dashboard-item-num">5</div>
      </div>
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts"></script>

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
