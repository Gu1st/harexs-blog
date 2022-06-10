import { ref } from 'vue';
import { list } from '../../api/bolg/home';

export function useHome() {
  //分页数据
  const page = ref(1);
  const pageCount = ref(5);

  const listData = ref([]);

  //得到数据
  const getList = () => {
    const ListRes = list(page.value);
    ListRes.then((res: any) => {
      listData.value = res.data;
      pageCount.value = Math.ceil(res.total / 7);
    });
  };

  const pageChange = e => {
    page.value = e;
    getList();
  };

  return {
    page,
    pageCount,
    listData,
    getList,
    pageChange
  };
}
