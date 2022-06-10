import { ref } from 'vue';
import { articleAndSearch } from '../../api/bolg/search';
import { useRoute } from 'vue-router';

export function useSearch() {
  const route = useRoute();
  //分页数据
  const page = ref(1);
  const pageCount = ref(5);

  const listData = ref([]);

  //得到搜索数据
  const getList = () => {
    const ListRes = articleAndSearch(page.value, route.params?.content);
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
