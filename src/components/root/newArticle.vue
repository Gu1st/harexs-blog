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
          <n-input v-model:value="articleData.title" />
        </n-form-item>
        <n-form-item label="摘要:">
          <n-input v-model:value="articleData.desc" />
        </n-form-item>
        <n-form-item label="分类:">
          <n-select multiple v-model:value="articleData.selectValue" :options="selectOptions" />
        </n-form-item>
        <n-form-item label="缩略图:">
          <n-upload
            :action="uploadUrl"
            :max="1"
            list-type="image-card"
            v-model:file-list="fileList"
            @finish="handleFinish"
            @remove="handleRemove"
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
          mode="default"
          style="border-bottom: 1px solid #ccc"
        />
        <Editor
          :defaultConfig="editorConfig"
          mode="default"
          v-model="articleData.content"
          style="height: 400px; overflow-y: hidden"
          @onCreated="handleCreated"
        />
      </div>
      <template #footer>
        <n-button type="success" @click="createdArticle">确定</n-button>
        <div style="margin: 0 10px"></div>
        <n-button type="error" @click="closeEvent(true)">关闭</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import useEditor from '../../hooks/root/editor';
import { getToken } from '../../utils/token';
import { UploadFileInfo } from 'naive-ui';

//得到分类数据
import { list } from '../../api/root/classify';
import { article, info, update } from '../../api/root/article';

const uploadUrl = `${import.meta.env.VITE_SERVERIP}/upload`;

const articleData = reactive({
  selectValue: [],
  title: '',
  desc: '',
  file: '',
  content: ''
});

let fileList = ref<UploadFileInfo[]>([]);

const handleRemove = () => {
  fileList.value = [];
  articleData.file = '';
};

const handleFinish: any = file => {
  let response = JSON.parse(file.event.target.response);
  //window下返回的是 \\ 的路径 linux是/
  response = import.meta.env.PROD ? response.data.split('/') : response.data.split('\\');
  response.splice(0, 1);
  response = import.meta.env.VITE_SERVERIP + '/' + response.join('/');
  articleData.file = response;
};

const ListRes = list();
let selectOptions = ref<any[]>([]);

ListRes.then(res => {
  res.data.forEach(item => {
    let tmp: any = {};
    tmp.value = item.id;
    tmp.label = item.class_name;
    selectOptions.value.push(tmp);
  });
});

const props = defineProps(['drawerActive', 'editId']);
const emit = defineEmits(['closeDrawer']);

//发表文章
const createdArticle = () => {
  if (props.editId !== '') {
    const res = update({ ...articleData, id: props.editId });
    res.then(() => {
      closeEvent(true);
    });
  } else {
    const res = article(articleData);
    res.then(() => {
      closeEvent(true);
    });
  }
};

const closeEvent = bool => {
  emit('closeDrawer', bool);
};

let drawerShow = ref(false);

watchEffect(() => {
  drawerShow.value = props.drawerActive;
  if (props.editId && props.editId !== '') {
    const infoRes = info(props.editId);
    infoRes.then(res => {
      fileList.value = [
        {
          id: Math.random() + '',
          name: '缩略图',
          status: 'finished',
          url: res.data.head_img
        }
      ];
      articleData.selectValue = res.data.classify_id.split(',');
      articleData.title = res.data.title;
      articleData.desc = res.data.desc;
      articleData.file = res.data.file;
      articleData.content = res.data.content;
    });
  } else {
    fileList.value = [];
    articleData.selectValue = [];
    articleData.title = '';
    articleData.desc = '';
    articleData.file = '';
    articleData.content = '';
  }
});

//读默认的Token附加在上传接口中
const token = getToken();

//编辑器钩子
let { editorRef, toolbarConfig, editorConfig, handleCreated } = useEditor();
</script>
