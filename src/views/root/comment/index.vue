<template>
  <n-data-table :columns="Columns" :data="data" :pagination="false" :bordered="false" />
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import { NButton, NGradientText, NTag } from 'naive-ui';
import { list, enbale, del } from '../../../api/root/comment';

const getList = () => {
  const ListRes = list();
  ListRes.then(res => {
    data.value = res.data;
  });
};
getList();

const data = ref([]);
const deleteComment = async id => {
  //执行删除
  await del(id);
  //重新渲染
  await getList();
};
const statusComment = row => {
  //改变状态并请求数据 不做数据的重新渲染
  enbale(row.id, row.status);
  if (row.status) {
    row.status = 0;
  } else {
    row.status = 1;
  }
};

const Columns = [
  {
    title: '评论人',
    key: 'name'
  },
  {
    title: '评论内容',
    key: 'content'
  },
  {
    title: '邮箱',
    key: 'email',
    align: 'center'
  },
  {
    title: '是否属于回复',
    key: 'upper_id',
    align: 'center',
    render(row) {
      return h(
        NGradientText,
        {
          type: row.upper_id ? 'success' : 'error'
        },
        () => (row.upper_id ? '是' : '否')
      );
    }
  },
  {
    title: '来源文章',
    key: 'article_title'
  },
  {
    title: '评论时间',
    key: 'created_at',
    render(row) {
      return h(NTag, { type: 'info', bordered: false }, () =>
        new Date(row.created_at).toLocaleDateString().replace('/', '-')
      );
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
            size: 'small',
            type: row.status ? 'warning' : 'success',
            style: 'margin-right:10px;',
            onClick: () => statusComment(row)
          },
          () => (row.status ? '禁用' : '启用')
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            onClick: () => deleteComment(row.id)
          },
          () => '删除'
        )
      ];
    }
  }
];
</script>
