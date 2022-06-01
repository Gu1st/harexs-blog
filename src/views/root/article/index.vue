<template>
  <n-grid x-gap="12" :cols="3" style="margin-bottom: 10px">
    <n-gi>
      <n-button type="primary"> 新增文章 </n-button>
    </n-gi>
  </n-grid>

  <n-data-table :columns="Columns" :data="data" :pagination="false" :bordered="false" />

  <div style="border: 1px solid #ccc; margin-top: 10px; z-index: 100">
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="simple"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      :defaultConfig="editorConfig"
      mode="simple"
      v-model="valueHtml"
      style="height: 400px; overflow-y: hidden"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue'
import { NButton } from 'naive-ui'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import useEditor from '../../../hooks/root/editor'

let { editorRef, valueHtml, toolbarConfig, editorConfig, handleCreated } = useEditor()

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
    width: '150',
    render(row) {
      return [
        h(
          NButton,
          {
            strong: true,
            style: {
              marginRight: '10px'
            },
            size: 'small',
            type: 'warning',
            onClick: () => console.log(row)
          },
          () => '编辑'
        ),
        h(
          NButton,
          {
            strong: true,
            size: 'small',
            type: 'error',
            onClick: () => console.log(row)
          },
          () => '删除'
        )
      ]
    }
  }
]
</script>
