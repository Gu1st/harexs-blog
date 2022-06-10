<template>
  <blog-list :listData="listData"></blog-list>
  <!-- 分页组件 -->
  <div class="pagenation" v-if="pageCount">
    <n-pagination v-model="page" :on-update:page="pageChange" :page-count="pageCount" />
  </div>
</template>

<script setup lang="ts">
import blogList from '../../../components/home/blogList.vue';
import { watchEffect } from 'vue';
import { useCategory } from '../../../hooks/blog/category';
import { useRoute } from 'vue-router';
const { page, pageCount, listData, getList, pageChange } = useCategory();
const route = useRoute();

//监听cid变化 重新加载数据
watchEffect(() => {
  if (route.query?.cid) {
    getList();
  }
});
</script>

<style scoped lang="scss">
.pagenation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin: 20px;
  box-sizing: border-box;
}
</style>
