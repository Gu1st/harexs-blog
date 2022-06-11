import { onBeforeUnmount, shallowRef } from 'vue';
import '@wangeditor/editor/dist/css/style.css';

export default function () {
  // 编辑器实例，必须用 shallowRef，重要！
  const editorRef = shallowRef();

  const toolbarConfig = {};

  const editorConfig: any = { MENU_CONF: {} };
  editorConfig.placeholder = '请输入内容...';
  editorConfig.MENU_CONF['uploadImage'] = {
    server: `${import.meta.env.VITE_SERVERIP}/upload`,
    // 单个文件上传成功之后
    // 自定义插入图片
    customInsert(res: any, insertFn) {
      // res 即服务端的返回结果
      if (res.code !== 200) {
        return;
      }
      // "app\\public\\uploads\\1654677799508.jpg"

      let data = res.data.split('\\');
      data.splice(0, 1);
      data = data.join('/');

      const url = `${import.meta.env.VITE_SERVERIP}/${data}`;
      // 从 res 中找到 url alt href ，然后插图图片
      insertFn(url);
    }
  };

  // 组件销毁时，也及时销毁编辑器，重要！
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });
  // 编辑器回调函数
  const handleCreated = editor => {
    console.log('created', editor);
    editorRef.value = editor; // 记录 editor 实例，重要！
  };

  return {
    editorRef,
    toolbarConfig,
    editorConfig,
    handleCreated
  };
}
