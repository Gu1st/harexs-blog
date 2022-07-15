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
import { watchEffect, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticle, useCommentList } from '../../../hooks/blog/article';
import { getterDate } from '../../../utils/getter';

const route = useRoute();
//文章相关HOOKS
const { articleInfo, getInfo } = useArticle();
//评论列表相关HOOKS
const { reloadCommentList, commentData, getCommentList } = useCommentList();

//监听路由变化 重新加载数据
watchEffect(() => {
  if (route.query?.id) {
    //加载文章
    getInfo(route.query.id);
    //加载评论列表
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
  :deep(table) {
    border-collapse: collapse;
  }
  :deep(td) {
    border: 1px solid #ccc;
    text-align: center;
  }
  :deep(th) {
    border: 1px solid #ccc;
    background-color: #f1f1f1;
  }
  // span { 先保留到时候是富文本返回
  //   font-size: 16px;
  // }
}
</style>
