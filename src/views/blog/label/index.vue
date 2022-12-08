<template>
  <div class="label">
    <div class="label__header">分类聚合 - 点击查阅分类文章</div>
    <div class="label__main">
      <div
        @click="CatCategory(item)"
        class="label__main--block"
        v-for="item in listData"
        :key="item.id"
      >
        分类：{{ item.class_name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoryToBlog } from '../../../hooks/blog/category';
import { useRouter } from 'vue-router';
const { listData, getList } = useCategoryToBlog();
const router = useRouter();

getList();

const CatCategory = info => {
  console.log(info);
  router.push({
    name: 'category',
    query: {
      cid: info.id
    }
  });
};
</script>

<style scoped lang="scss">
.label {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 16px;
  color: #777;
  padding: 50px;
  &__header {
    margin-bottom: 40px;
  }
  &__main {
    display: flex;
    flex-wrap: wrap;
    width: 1020px;
    max-width: 100%;

    &--block {
      margin-right: 20px;
      margin-bottom: 10px;
      padding: 2px 16px 2px 16px;
      background-color: rgba(45, 169, 103, 0.7);
      color: #fff;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
