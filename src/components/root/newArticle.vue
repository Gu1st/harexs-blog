<template>
  <n-drawer
    :close-on-esc="false"
    :mask-closable="false"
    v-model:show="drawerShow"
    placement="left"
    :width="1024"
  >
    <n-drawer-content>
      <template #header> 文章编辑 </template>
      <n-form ref="formRef">
        <n-form-item label="标题:">
          <n-input />
        </n-form-item>
        <n-form-item label="摘要:">
          <n-input />
        </n-form-item>
        <n-form-item label="分类:">
          <n-select multiple v-model:value="selectValue" :options="selectOptions" />
        </n-form-item>
        <n-form-item label="缩略图:">
          <n-upload
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            :default-file-list="fileList"
            :max="1"
            list-type="image-card"
            :headers="{Authorization:token!}"
          >
            点击上传
          </n-upload>
        </n-form-item>
      </n-form>
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
      <template #footer>
        <n-button type="success">确定</n-button>
        <div style="margin: 0 10px"></div>
        <n-button type="error" @click="closeEvent">关闭</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import useEditor from '../../hooks/root/editor';
import { getToken } from '../../utils/token';

const props = defineProps(['drawerActive']);
const emit = defineEmits(['closeDrawer']);
let selectValue = ref(null);

const selectOptions = ref([]);

console.log(selectOptions.value);

const closeEvent = () => {
  emit('closeDrawer', false);
};

let drawerShow = ref(false);
let fileList = ref([]);
watchEffect(() => {
  drawerShow.value = props.drawerActive;
});

//读默认的Token附加在上传接口中
const token = getToken();

//编辑器钩子
let { editorRef, valueHtml, toolbarConfig, editorConfig, handleCreated } = useEditor();
</script>
