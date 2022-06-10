<template>
  <n-grid x-gap="12" :cols="3" style="margin-bottom: 10px">
    <n-gi>
      <n-button type="primary" @click="newArticle"> 新增文章 </n-button>
    </n-gi>
  </n-grid>

  <n-data-table :columns="Columns" :data="data" :pagination="false" :bordered="false" />
  <new-article-vue
    :editId="editId"
    @closeDrawer="closeDrawer"
    :drawerActive="drawerActive"
  ></new-article-vue>
  <!-- 分页组件 -->
  <div class="pagenation">
    <n-pagination :on-update:page="pageChange" v-model="page" :page-count="pageCount" />
  </div>
</template>
<script lang="ts" setup>
import newArticleVue from '../../../components/root/newArticle.vue';
import { useRootArticle } from '../../../hooks/root/article';

const {
  page,
  pageCount,
  pageChange,
  Columns,
  getList,
  newArticle,
  closeDrawer,
  drawerActive,
  editId,
  data
} = useRootArticle();

//加载数据
getList();
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
