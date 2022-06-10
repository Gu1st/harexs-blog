<template>
  <div class="bolg">
    <div class="article-card">
      <div class="article-title">
        <span>{{ articleInfo.title }}</span>
      </div>
      <div class="article-footer">
        <div class="article-date">
          <span>gu1st发表于{{ getterDate(articleInfo.created_at) }}</span
          ><span>/</span>
        </div>
        <div class="article-category">
          <span>{{ articleInfo.classify_name }}</span
          ><span>/</span>
        </div>
        <div class="article-comment">
          <span>共{{ articleInfo.comment_num ? articleInfo.comment_num : 0 }}条评论</span>
        </div>
      </div>
      <div
        v-if="articleInfo.head_img"
        class="article-img"
        :style="{ backgroundImage: `url(${articleInfo.head_img})` }"
      ></div>
      <div class="article-desc">
        {{ articleInfo.desc }}
      </div>
      <div class="article-content" v-html="articleInfo.content"></div>
    </div>
  </div>
  <!-- 评论组件 -->
  <div class="comment" v-if="route.query?.id">
    <article-comment
      @reloadCommentList="reloadCommentList"
      :commentData="commentData"
    ></article-comment>
  </div>
</template>

<script setup lang="ts">
import articleComment from '../../../components/article/comment.vue';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { info } from '../../../api/bolg/article';
import { commentList } from '../../../api/bolg/comment';

const route = useRoute();
const articleInfo = ref<any>({});
const getterDate = at => {
  return new Date(at).toLocaleDateString().replace('/', '-');
};

//得到文章信息
const getInfo = id => {
  const infoRes = info(id);
  infoRes.then(res => {
    articleInfo.value = res.data;
  });
};

const reloadCommentList = () => {
  getCommentList(route.query.id);
};
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
//评论数据
const commentData = ref<commentDataFace[]>([]);

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

watchEffect(() => {
  if (route.query?.id) {
    getInfo(route.query.id);
    getCommentList(route.query.id);
  }
});
</script>

<style scoped lang="scss">
@media (max-width: 980px) {
  .bolg {
    width: auto !important;
    margin: 30px 30px 0 30px !important;
    .article-title span {
      font-size: 24px !important;
    }
  }
  .comment {
    width: auto !important;
    max-width: 100%;
    margin: 10px 20px 0 20px !important;
  }
}

@media (max-width: 768px) {
  .bolg {
    .article-img {
      height: 150px !important;
      overflow: hidden;
    }
    .article-title span {
      font-size: 20px !important;
      font-weight: bold;
    }
  }
}
.comment {
  width: 1020px;
  max-width: 100%;
  margin: 40px auto 20px auto;
}
.bolg {
  width: 1020px;
  max-width: 100%;
  margin: 30px auto 0 auto;

  .article-card {
    margin-bottom: 30px;
    padding-bottom: 50px;
    border-bottom: 2px dashed #eee;
  }
  .article-title {
    padding: 10px 0 0 0;
    color: #444444;
    border-bottom: 1px dashed #eee;
    margin-bottom: 20px;
    span {
      font-size: 36px;
    }
  }
  .article-img {
    border-radius: 6px;
    height: 300px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .article-desc {
    box-sizing: border-box;
    padding: 2px 0 2px 20px;
    color: #777;
    background-color: #fff;
    border-left: 4px solid #dddddd;
    margin: 10px 0 10px 0;
    font-size: 16px;
  }
  .article-footer {
    display: flex;
    color: #555;
    font-weight: bold;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 20px;
    span + span {
      margin-left: 4px;
      margin-right: 4px;
    }
  }
}
.pagenation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin: 20px;
  box-sizing: border-box;
}

.article-content {
  font-size: 16px;
  // span { 先保留到时候是富文本返回
  //   font-size: 16px;
  // }
}
</style>
