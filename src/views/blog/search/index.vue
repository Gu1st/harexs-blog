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
import { ref, watchEffect } from 'vue';
import { articleAndSearch } from '../../../api/bolg/search';

const route = useRoute();

let page = ref(1);
let pageCount = ref(5);

let listData = ref([]);

const getList = () => {
  const ListRes = articleAndSearch(page.value, route.params?.content);
  ListRes.then((res: any) => {
    listData.value = res.data;
    pageCount.value = Math.ceil(res.total / 7);
  });
};
watchEffect(() => {
  if (route.params?.content) {
    getList();
  }
});

const pageChange = e => {
  page.value = e;
  getList();
};
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
