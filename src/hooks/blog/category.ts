import { articleAndClassify } from '../../api/bolg/category';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
export function useCategory() {
  //分页相关
  const page = ref(1);
  const pageCount = ref(5);

  const route = useRoute();

  //分类数据源
  const listData = ref([]);

  //获取分类数据
  const getList = () => {
    const ListRes = articleAndClassify(route.query?.cid, page.value);
    ListRes.then((res: any) => {
      listData.value = res.data;
      pageCount.value = Math.ceil(res.total / 7);
    });
  };

  //页数变化之后 重新加载数据
  const pageChange = e => {
    page.value = e;
    getList();
  };

  return {
    route,
    page,
    pageCount,
    listData,
    getList,
    pageChange
  };
}
