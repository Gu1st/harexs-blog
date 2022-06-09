<template>
  <n-grid x-gap="12" :cols="3" style="margin-bottom: 10px">
    <n-gi>
      <n-button type="primary" @click="newArticle"> 新增文章 </n-button>
    </n-gi>
  </n-grid>

  <n-data-table :columns="Columns" :data="data" :pagination="false" :bordered="false" />
  <new-article-vue
    :editId="editId"
    @closeDrawer="closeDrawer"
    :drawerActive="drawerActive"
  ></new-article-vue>
  <!-- 分页组件 -->
  <div class="pagenation">
    <n-pagination :on-update:page="pageChange" v-model="page" :page-count="pageCount" />
  </div>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue';
import { NButton } from 'naive-ui';
import newArticleVue from '../../../components/root/newArticle.vue';
import { list, del } from '../../../api/root/article';

let page = ref(1);
let pageCount = ref(5);

//数据源
const data = ref([]);

//编辑文章时的ID
let editId = ref('');

//回调
const closeDrawer = e => {
  drawerActive.value = false;
  if (e) {
    editId.value = '';
    getList();
  }
};

const pageChange = e => {
  page.value = e;
  getList();
};

//抽屉
let drawerActive = ref(false);

//打开文章编辑页面
const newArticle = () => {
  editId.value = '';
  drawerActive.value = !drawerActive.value;
};

//文章列表数据请求
const getList = () => {
  const listRes = list(page.value);
  listRes.then((res: any) => {
    data.value = res.data;
    pageCount.value = Math.ceil(res.total / 7);
  });
};
getList();

//删除文章
const delArticle = id => {
  const delRes = del(id);
  delRes.then(() => {
    getList();
  });
};

//编辑文章
const editArticle = id => {
  editId.value = id;
  drawerActive.value = true;
};

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
            onClick: () => editArticle(row.id)
          },
          () => '编辑'
        ),
        h(
          NButton,
          {
            strong: true,
            size: 'small',
            type: 'error',
            onClick: () => delArticle(row.id)
          },
          () => '删除'
        )
      ];
    }
  }
];
</script>

<style scoped lang="scss">
.pagenation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin: 20px;
  box-sizing: border-box;
}
</style>
