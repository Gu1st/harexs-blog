<template>
  <blog-list :listData="listData"></blog-list>
  <!-- 分页组件 -->
  <div class="pagenation" v-if="pageCount">
    <n-pagination v-model="page" :on-update:page="pageChange" :page-count="pageCount" />
  </div>
</template>

<script setup lang="ts">
import blogList from '../../../components/home/blogList.vue';
import { useRoute } from 'vue-router';
import { watchEffect } from 'vue';
import { useSearch } from '../../../hooks/blog/search';

const route = useRoute();
const { page, pageCount, listData, getList, pageChange } = useSearch();

//监听搜索文本变化
watchEffect(() => {
  if (route.params?.content) {
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
