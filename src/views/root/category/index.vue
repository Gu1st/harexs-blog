<template>
  <n-grid x-gap="12" :cols="3" style="margin-bottom: 10px">
    <n-gi>
      <n-input type="text" v-model:value="className" placeholder="分类名称" />
    </n-gi>
    <n-gi>
      <n-button type="primary" @click="addCate"> 增加分类 </n-button>
    </n-gi>
  </n-grid>

  <n-data-table :columns="Columns" :data="data" :pagination="false" :bordered="false" />
</template>
<script lang="ts" setup>
import { h } from 'vue'
import { NButton, NInput } from 'naive-ui'
import useCategory from '../../../hooks/root/category'

//Hooks得到所有方法和变量
const { data, className, getList, delCate, addCate, ShowOrEdit } = useCategory()

//初始化获得一次数据源
getList()

//表格字段源
const Columns: any = [
  {
    title: '分类名称',
    key: 'class_name',
    render(row, index) {
      return h(ShowOrEdit, {
        value: row.class_name,
        id: row.id,
        onUpdateValue(v) {
          data.value[index].class_name = v
        }
      })
    }
  },
  {
    title: '创建时间',
    key: 'created_at',
    render(row) {
      return h('div', {}, new Date(row.created_at).toLocaleString())
    }
  },
  {
    title: '最后修改时间',
    key: 'updated_at',
    render(row) {
      return h('div', {}, new Date(row.updated_at).toLocaleString())
    }
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
          onClick: () => delCate(row.id)
        },
        () => '删除'
      )
    }
  }
]
</script>
