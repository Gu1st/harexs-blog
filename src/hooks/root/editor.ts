import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import '@wangeditor/editor/dist/css/style.css'

export default function () {
  // 编辑器实例，必须用 shallowRef，重要！
  const editorRef = shallowRef()
  // 内容 HTML
  const valueHtml = ref('<p>hello</p>')
  // 模拟 ajax 异步获取内容
  onMounted(() => {
    setTimeout(() => {
      valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    }, 1500)
  })
  const toolbarConfig = {}
  const editorConfig = { placeholder: '请输入内容...' }
  // 组件销毁时，也及时销毁编辑器，重要！
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
  })
  // 编辑器回调函数
  const handleCreated = editor => {
    console.log('created', editor)
    editorRef.value = editor // 记录 editor 实例，重要！
  }

  return {
    editorRef,
    valueHtml,
    toolbarConfig,
    editorConfig,
    handleCreated
  }
}
