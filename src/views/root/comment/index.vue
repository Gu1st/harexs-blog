<template>
  <n-data-table :columns="Columns" :data="data" :pagination="false" :bordered="false" />
</template>
<script lang="ts" setup>
import { useComment } from '../../../hooks/root/comment';
const { Columns, getList, data } = useComment();

//加载数据
getList();
</script>
