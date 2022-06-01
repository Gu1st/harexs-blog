<template>
  <n-grid x-gap="12" :cols="3" style="margin-bottom: 10px">
    <n-gi>
      <n-input type="text" placeholder="分类名称" />
    </n-gi>
    <n-gi>
      <n-button type="primary"> 增加分类 </n-button>
    </n-gi>
  </n-grid>

  <n-data-table :columns="Columns" :data="data" :pagination="false" :bordered="false" />
</template>
<script lang="ts" setup>
import { h, defineComponent, ref, nextTick } from 'vue'
import { NButton, NInput } from 'naive-ui'

const ShowOrEdit = defineComponent({
  props: {
    value: [String, Number],
    onUpdateValue: [Function, Array]
  },
  setup(props) {
    const isEdit = ref(false)
    const inputRef = ref(null)
    const inputValue = ref(props.value)
    function handleOnClick() {
      isEdit.value = true
      nextTick(() => {
        inputRef.value.focus()
      })
    }
    function handleChange() {
      props.onUpdateValue(inputValue.value)
      isEdit.value = false
    }
    return () =>
      h(
        'div',
        {
          onClick: handleOnClick
        },
        isEdit.value
          ? h(NInput, {
              ref: inputRef,
              value: inputValue.value,
              onUpdateValue: v => {
                inputValue.value = v
              },
              onBlur: handleChange
            })
          : props.value
      )
  }
})

const data = ref([{ name: 'Wonderwall', craeteTime: '2022-06-01', actions: '' }])

const Columns = [
  {
    title: '分类名称',
    key: 'name',
    render(row, index) {
      return h(ShowOrEdit, {
        value: row.name,
        onUpdateValue(v) {
          data.value[index].name = v
        }
      })
    }
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
