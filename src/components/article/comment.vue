<template>
  <div v-if="mockData.length" class="comment">
    <div class="comment-header">共8条评论</div>
    <div class="comment-list" v-for="(item, index) in mockData" :key="index">
      <div class="comment-list-header">
        <div class="comment-list-name">{{ item.name }}</div>
        <div class="comment-list-time">{{ item.createTime }}</div>
      </div>
      <div class="comment-list-content">{{ item.content }}</div>

      <!-- 回复按钮 -->
      <div class="comment-list-reply">
        <n-button type="primary" @click="item.reply = !item.reply"> 回复 </n-button>
      </div>

      <!-- 按回复后的评论弹出列表 -->
      <transition name="fade" mode="in-out">
        <div class="comment-reply-card" v-if="item.reply">
          <comment-talk></comment-talk>
          <div class="comment-reply-card-icon"></div>
        </div>
      </transition>

      <!-- 评论的回复列表 -->
      <div v-if="item.replyList.length" class="comment-list-replyList">
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
  <div class="noComment" v-else>暂无评论,来抢占沙发?</div>
  <div class="talk">
    <comment-talk></comment-talk>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import commentTalk from './talk.vue'
let mockData = ref([
  {
    name: '123',
    createTime: '2022-6-1',
    content: '测试内容123',
    reply: false,
    replyList: [
      {
        name: '123',
        createTime: '2022-6-1',
        content: '测试内容123'
      }
    ]
  }
])
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.noComment {
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #666666;
  background-color: #f1f2f3;
}
.comment {
  &-header {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #555555;
  }
  &-reply-card {
    position: relative;
    margin-left: 60px;
    margin-top: 4px;
    padding: 10px;
    border: 1px solid #eee;
    &-icon {
      position: absolute;
      left: 50%;
      top: -31px;
      transform: translateX(-50%) rotate(135deg);
      width: 60px;
      height: 60px;
      background-color: #fff;
      z-index: 15;
      border: 1px solid #eee;
      border-top: none;
      border-right: none;
    }
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
