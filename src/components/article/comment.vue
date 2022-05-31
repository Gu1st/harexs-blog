<template>
  <div class="comment">
    <div class="comment-header">共8条评论</div>
    <div class="comment-list" v-for="(item, index) in mockData" :key="index">
      <div class="comment-list-header">
        <div class="comment-list-name">{{ item.name }}</div>
        <div class="comment-list-time">{{ item.createTime }}</div>
      </div>
      <div class="comment-list-content">{{ item.content }}</div>
      <div class="comment-list-reply">
        <n-button type="primary"> 回复 </n-button>
      </div>
      <div class="comment-list-replyList">
        <div class="comment-list" v-for="(childrenItem, indexs) in item.replyList" :key="indexs">
          <div class="comment-list-header">
            <div class="comment-list-name">{{ childrenItem.name }}</div>
            <div class="comment-list-time">{{ childrenItem.createTime }}</div>
          </div>
          <div class="comment-list-content">{{ childrenItem.content }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="talk">
    <comment-talk></comment-talk>
  </div>
</template>

<script setup lang="ts">
import commentTalk from './talk.vue'
let mockData = [
  {
    name: 'Gu1st',
    createTime: '2022-05-31 上午12:34',
    content: '我是测试内容给123',
    replyList: [
      {
        name: 'Gu1st2',
        createTime: '2022-05-31 下午13:34',
        content: '12345我是测试内容给1234'
      },
      {
        name: 'Gu1st2',
        createTime: '2022-05-31 下午13:34',
        content: '12345我是测试内容给1234'
      },
      {
        name: 'Gu1st2',
        createTime: '2022-05-31 下午13:34',
        content: '12345我是测试内容给1234'
      }
    ]
  },
  {
    name: 'Gu1st',
    createTime: '2022-05-31 上午12:34',
    content: '我是测试内容给123',
    replyList: [
      {
        name: 'Gu1st2',
        createTime: '2022-05-31 下午13:34',
        content: '12345我是测试内容给1234'
      }
    ]
  },
  {
    name: 'Gu1st',
    createTime: '2022-05-31 上午12:34',
    content: '我是测试内容给123',
    replyList: [
      {
        name: 'Gu1st2',
        createTime: '2022-05-31 下午13:34',
        content: '12345我是测试内容给1234'
      }
    ]
  }
]
</script>

<style scoped lang="scss">
.comment {
  &-header {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #555555;
  }
  &-list {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px dashed #eee;
    &-header {
      display: flex;
      justify-content: space-between;
    }
    &-name {
      margin-bottom: 6px;
      font-size: 16px;
      color: #444444;
      font-weight: bold;
    }
    &-time {
      font-size: 12px;
      color: #555555;
    }
    &-content {
      padding: 20px;
      border-radius: 4px;
      color: #666666;
      background-color: #f8f9fa;
    }
    &-replyList {
      border-top: 1px dashed #eee;
      margin-left: 60px;
      margin-top: 20px;
      padding-top: 10px;
      .comment-list {
        border-bottom: none;
        padding-bottom: 0;
      }
    }
    &-reply {
      margin-top: 6px;
    }
  }
}
</style>
