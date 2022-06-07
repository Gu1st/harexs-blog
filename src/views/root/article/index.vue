<template>
  <n-grid x-gap="12" :cols="3" style="margin-bottom: 10px">
    <n-gi>
      <n-button type="primary" @click="newArticle"> 新增文章 </n-button>
    </n-gi>
  </n-grid>

  <n-data-table :columns="Columns" :data="data" :pagination="false" :bordered="false" />
  <new-article-vue @closeDrawer="closeDrawer" :drawerActive="drawerActive"></new-article-vue>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue';
import { NButton } from 'naive-ui';
import newArticleVue from '../../../components/root/newArticle.vue';
import { list } from '../../../api/root/article';

//数据源
const data = ref([]);

//回调
const closeDrawer = e => {
  drawerActive.value = e;
};

//抽屉
let drawerActive = ref(false);

//打开文章编辑页面
const newArticle = () => {
  drawerActive.value = !drawerActive.value;
};

//文章列表数据请求
const listRes = list();
listRes.then(res => {
  console.log(res);
});

const Columns: any[] = [
  {
    title: '文章标题',
    key: 'title'
  },
  {
    title: '所属分类',
    key: 'classify_name'
  },
  {
    title: '创建时间',
    key: 'created_at',
    render(row) {
      return h('div', {}, new Date(row.updated_at).toLocaleString());
    }
  },
  {
    title: '修改时间',
    key: 'updated_at',
    render(row) {
      return h('div', {}, new Date(row.updated_at).toLocaleString());
    }
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
      ];
    }
  }
];
</script>
