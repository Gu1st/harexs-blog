<template>
  <n-data-table :columns="Columns" :data="data" :pagination="false" :bordered="false" />
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import { NButton } from 'naive-ui';
import { list } from '../../../api/root/comment';

const ListRes = list();
ListRes.then(res => {
  data.value = res.data;
});

const data = ref([]);

const Columns = [
  {
    title: '评论人',
    key: 'name'
  },
  {
    title: '评论内容',
    key: 'content'
  },
  {
    title: '邮箱',
    key: 'email'
  },
  {
    title: '来源文章',
    key: 'articleTile'
  },
  {
    title: '操作',
    key: 'actions',
    align: 'center',
    width: '120',
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          size: 'small',
          type: 'error',
          onClick: () => console.log(row)
        },
        () => '删除'
      );
    }
  }
];
</script>
