interface commentDataFace {
  article_id: string;
  article_title: string;
  content: string;
  createdAt: string;
  created_at: string;
  email: string;
  id: string;
  name: string;
  updatedAt: string;
  updated_at: string;
  upper_id: string;
  reply?: boolean;
  replyList?: any[];
  childCount?: number | string;
}
import { ref } from 'vue';
import { info } from '../../api/bolg/article';
import { commentList } from '../../api/bolg/comment';
import { useRoute } from 'vue-router';

export function useCommentList() {
  const route = useRoute();

  //评论数据
  const commentData = ref<commentDataFace[]>([]);
  //重新加载评论列表
  const reloadCommentList = () => {
    getCommentList(route.query.id);
  };

  //还要带出评论列表
  const getCommentList = id => {
    const listRes = commentList(id);
    listRes.then((res: any) => {
      res.data.forEach((item, index) => {
        item.childCount = res.countAry[index];
        item.seeChildren = false;
      });
      commentData.value = res.data;
    });
  };
  return {
    reloadCommentList,
    commentData,
    getCommentList
  };
}

export function useArticle() {
  const articleInfo = ref<any>({});
  //得到文章信息
  const getInfo = id => {
    const infoRes = info(id);
    infoRes.then(res => {
      articleInfo.value = res.data;
    });
  };

  return {
    articleInfo,
    getInfo
  };
}
