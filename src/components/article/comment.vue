<template>
  <div v-if="commentData.length" class="comment">
    <div class="comment-header">共{{ commentData.length }}条评论</div>
    <div class="comment-list" v-for="(item, index) in commentData" :key="index">
      <div class="comment-list-header">
        <div class="comment-list-name">{{ item.name }}</div>
        <div class="comment-list-time">{{ getterDate(item.created_at) }}</div>
      </div>
      <div class="comment-list-content">{{ item.content }}</div>

      <!-- 回复按钮 -->

      <div class="comment-list-reply">
        <n-button type="primary" @click="replyEvent(item)">
          {{ item.reply ? '关闭回复' : '回复' }}
        </n-button>
        <n-gradient-text
          @click="seeReply(item)"
          type="success"
          style="cursor: pointer; padding: 2px"
        >
          {{
            item.seeChildren
              ? '收起'
              : item.childCount
              ? `共${item.childCount}条回复,点击查看`
              : '共0条回复,暂无内容'
          }}
        </n-gradient-text>
      </div>

      <!-- 按回复后的评论弹出列表 -->
      <transition name="fade" mode="in-out">
        <div class="comment-reply-card" v-if="item.reply">
          <comment-talk @reloadComment="reloadComment" :upperId="upperId"></comment-talk>
          <div class="comment-reply-card-icon"></div>
        </div>
      </transition>

      <!-- 评论的回复列表 -->
      <div v-if="item.seeChildren" class="comment-list-replyList">
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
    <comment-talk @reloadComment="reloadComment"></comment-talk>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { commentChildrenList } from '../../api/bolg/comment';
import commentTalk from './talk.vue';
const props = defineProps(['commentData']);
const emit = defineEmits(['reloadCommentList']);
let upperId = ref('');
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
  seeChildren?: boolean;
  reply?: boolean;
  replyList?: any[];
  childCount?: number | string;
}

const commentData = ref<commentDataFace[]>([]);

const getterDate = date => {
  return new Date(date).toLocaleDateString().replace('/', '-');
};

const reloadComment = () => {
  emit('reloadCommentList');
};

//点击回复
const replyEvent = item => {
  item.reply = !item.reply;
  if (item.reply) {
    upperId.value = item.id;
  }
};

//查看回复评论
const seeReply = item => {
  //如果已经展开了 再次点击则收起 不做其他事情
  if (item.seeChildren) {
    item.seeChildren = false;
    return;
  }
  //如果没有展开 但是本身就没回复数量的 也不作任何操作
  if (!item.childCount) {
    return;
  }
  //如果没有展开 但本身有回复数量 并且已经请求到数据了,只展开不请求数据
  if (item.replyList.length) {
    item.seeChildren = true;
    return;
  }
  const id = item.id;
  const childRes = commentChildrenList(id);
  childRes.then(res => {
    item.replyList = res.data;
    item.seeChildren = true;
  });
};

watchEffect(() => {
  commentData.value = props.commentData;
  commentData.value.forEach(item => {
    item.reply = false;
    item.replyList = [];
  });
});
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
      font-size: 14px;
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
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
    }
  }
}
</style>
