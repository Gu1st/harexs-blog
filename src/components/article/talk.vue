<template>
  <div class="talk">
    <div class="talk-header">发表评论</div>
    <div class="talk-content">
      <n-input v-model:value="formData.content" type="textarea" maxlength="100" show-count />
    </div>
    <div class="talk-footer">
      <div class="talk-footer-user">
        <span>名称*</span>
        <n-input v-model:value="formData.name" maxlength="50" type="text" />
      </div>
      <div class="talk-footer-email">
        <span>邮件*</span>
        <n-input v-model:value="formData.email" maxlength="50" type="text" />
      </div>
    </div>
    <div class="talk-send">
      <n-button type="primary" @click="sendComment"> 发表评论 </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const formData = reactive({
  content: '',
  name: '',
  email: '',
  articleid: '',
  upper_id: ''
});

const sendComment = () => {
  console.log(1);
};
</script>

<style lang="scss" scoped>
.talk {
  margin-top: 10px;
  margin-bottom: 25px;
  &-send {
    margin-top: 16px;
  }
  &-header {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #555555;
  }
  &-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    &-user {
      flex: 0.48;
      display: flex;
      flex-direction: column;
      span {
        font-weight: bold;
        color: #666666;
      }
    }
    &-email {
      flex: 0.48;
      display: flex;
      flex-direction: column;
      span {
        font-weight: bold;
        color: #666666;
      }
    }
  }
}
</style>
