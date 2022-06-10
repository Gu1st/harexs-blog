import { ref, h } from 'vue';
import { NButton } from 'naive-ui';
import { list, del } from '../../api/root/article';

export function useRootArticle() {
  //分页数据
  const page = ref(1);
  const pageCount = ref(5);

  //数据源
  const data = ref([]);

  //编辑文章时的ID
  const editId = ref('');

  //抽屉
  const drawerActive = ref(false);

  //回调
  const closeDrawer = e => {
    drawerActive.value = false;
    if (e) {
      editId.value = '';
      getList();
    }
  };

  //分页变化
  const pageChange = e => {
    page.value = e;
    getList();
  };

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

  //表格字段
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

  return {
    page,
    pageCount,
    pageChange,
    Columns,
    editArticle,
    delArticle,
    getList,
    newArticle,
    closeDrawer,
    drawerActive,
    editId,
    data
  };
}
