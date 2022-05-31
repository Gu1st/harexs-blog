<template>
  <div class="bolg">
    <div class="article-card" v-for="(item, index) in mockData" :key="index">
      <div class="article-title">
        <span>{{ item.title }}</span>
      </div>
      <div v-if="item.img" class="article-img" :style="{ backgroundImage: `url(${item.img})` }"></div>
      <div class="article-desc">
        <span>{{ item.desc }}</span>
      </div>
      <div class="article-footer">
        <div class="article-date">
          <span>{{ item.date }}</span
          ><span>/</span>
        </div>
        <div class="article-category">
          <span>{{ item.category }}</span
          ><span>/</span>
        </div>
        <div class="article-comment">
          <span>{{ item.comments }}</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 分页组件 -->
  <div class="pagenation">
    <n-pagination v-model="page" :page-count="pageCount" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let page = ref(1)
let pageCount = ref(5)

let mockData = ref([
  {
    title: '我是一个测试标题',
    img: 'https://margox-cn-wp-blog-1254052530.file.myqcloud.com/wp-content/uploads/2020/08/repic_banner.jpg',
    desc: '我是一个用来描述的占位符，总之就是必须要特别长，哈哈我来凑个字数吧!',
    date: 'gu1st发表于2022-5-31',
    category: '技术',
    comments: '共0条评论'
  },
  {
    title: '我是一个测试标题',
    desc: '我是一个用来描述的占位符，总之就是必须要特别长，哈哈我来凑个字数吧!',
    date: 'gu1st发表于2022-5-31',
    category: '技术',
    comments: '共0条评论'
  },
  {
    title: '我是一个测试标题',
    img: 'https://margox-cn-wp-blog-1254052530.file.myqcloud.com/wp-content/uploads/2020/08/repic_banner.jpg',
    desc: '我是一个用来描述的占位符，总之就是必须要特别长，哈哈我来凑个字数吧!',
    date: 'gu1st发表于2022-5-31',
    category: '技术',
    comments: '共0条评论'
  },
  {
    title: '我是一个测试标题',
    img: 'https://margox-cn-wp-blog-1254052530.file.myqcloud.com/wp-content/uploads/2020/08/repic_banner.jpg',
    desc: '我是一个用来描述的占位符，总之就是必须要特别长，哈哈我来凑个字数吧!',
    date: 'gu1st发表于2022-5-31',
    category: '技术',
    comments: '共0条评论'
  }
])
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

.bolg {
  width: 1020px;
  max-width: 100%;
  margin: 30px auto 0 auto;
  .article-card {
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 2px dashed #eee;
  }
  .article-title {
    padding: 10px 0 10px 0;
    color: #333333;
    span {
      font-size: 26px;
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
    padding: 10px 0 10px 0;
    span {
      font-size: 14px;
      color: #666666;
    }
  }
  .article-footer {
    display: flex;
    color: #555;
    font-weight: bold;
    font-size: 14px;
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
</style>
