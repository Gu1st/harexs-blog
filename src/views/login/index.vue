<template>
  <div class="login">
    <div class="login-center">
      <span class="login-center-title">Login to system</span>
      <div class="login-center-usr">
        <n-input v-model:value="user.username" type="text" placeholder="登录账号" />
      </div>
      <div class="login-center-pwd">
        <n-input
          type="password"
          v-model:value="user.password"
          @keydown.enter="loginSystem"
          placeholder="登录密码"
        />
      </div>
      <n-button @click="loginSystem" class="login-center-btn" type="primary"> 登 录 </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from '../../stores/index';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();

interface userFace {
  username: string;
  password: string;
}

let user: userFace = reactive({
  username: '',
  password: ''
});

//页面setup后加载账号
const getUser = localStorage.getItem('gu1st_usr');
if (getUser) {
  user.username = getUser;
}

const loginSystem = () => {
  const res = store.login(user);
  res.then(res => {
    if (res) {
      window.localStorage.setItem('gu1st_usr', user.username);
      router.push('/root');
    }
  });
};
</script>

<style scoped lang="scss">
@media (max-width: 450px) {
  .login {
    &-center {
      width: 320px !important;
    }
  }
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url('../../assets/login-bg.jpg') no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  &-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    &-title {
      color: #18a058;
      font-size: 32px;
      padding: 20px;
    }
    &-usr {
      width: 90%;
    }
    &-pwd {
      width: 90%;
      margin-top: 20px;
    }
    &-btn {
      width: 50%;
      margin-top: 20px;
      margin-bottom: 30px;
    }
  }
}
</style>
