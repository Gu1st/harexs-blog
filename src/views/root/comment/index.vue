<template>
  <n-data-table :columns="Columns" :data="data" :pagination="false" :bordered="false" />
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { NButton } from 'naive-ui'

const data = ref([{ name: 'Wonderwall', craeteTime: '2022-06-01', actions: '' }])

const Columns = [
  {
    title: '分类名称',
    key: 'name'
  },
  {
    title: '创建时间',
    key: 'craeteTime'
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
      )
    }
  }
]
</script>
