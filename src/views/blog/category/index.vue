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
import { articleAndClassify } from '../../../api/bolg/category';
import { ref, watchEffect } from 'vue';
let page = ref(1);
let pageCount = ref(5);

const route = useRoute();
let listData = ref([]);

const getList = () => {
  const ListRes = articleAndClassify(route.query?.cid, page.value);
  ListRes.then((res: any) => {
    listData.value = res.data;
    pageCount.value = Math.ceil(res.total / 7);
  });
};
watchEffect(() => {
  if (route.query?.cid) {
    getList();
  }
});

const pageChange = e => {
  page.value = e;
  getList();
};

console.log('分类页，参数为：', route.query?.cid);
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
