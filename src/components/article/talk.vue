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
        <span>邮件</span>
        <n-input v-model:value="formData.email" maxlength="50" type="text" />
      </div>
    </div>
    <div class="talk-send">
      <n-button type="primary" @click="sendComment"> 发表评论 </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import { newComment } from '../../api/bolg/comment';
import { useRoute } from 'vue-router';

const emit = defineEmits(['reloadComment']);
const props = defineProps({
  upperId: {
    defalut: '',
    type: String
  }
});
const route = useRoute();
const formData = reactive({
  content: '',
  name: '',
  email: '',
  articleid: '',
  upper_id: ''
});

//清空评论表单Fn
const clearForm = () => {
  formData.content = '';
  formData.name = '';
  formData.email = '';
  formData.articleid = '';
  formData.upper_id = '';
};

watchEffect(() => {
  if (props.upperId) {
    formData.upper_id = props.upperId;
  }
});

const EmailReg = /^[a-zA-Z0-9-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/g;
const sendComment = () => {
  const tmpEmail = formData.email.trim();
  if (tmpEmail.length > 0 && !EmailReg.test(tmpEmail)) {
    window.$message.warning('邮箱格式不正确');
    return;
  }
  if (formData.content.trim() === '' || formData.name.trim() === '') {
    window.$message.warning('请补全您的评论信息');
    return;
  }
  if (typeof route.query.id === 'string') {
    formData.articleid = route.query.id;
  }
  const newRes = newComment(formData);
  newRes.then(() => {
    window.$message.success('评论成功,审核后可见');
    //清空表单
    clearForm();
    //触发列表刷新
    emit('reloadComment');
  });
  //刷新评论列表
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
