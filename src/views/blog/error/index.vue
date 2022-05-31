<template>
  <div class="error">
    <div class="error-bg">
      <div class="error-info">
        <span class="error-info-title">404</span>
        <p class="error-info-desc">sorry! 页面找不到了 ...</p>
        <router-link to="/home" class="error-info-link">回到首页</router-link
        ><span class="error-info-timer">{{ num }}秒后会回到首页</span>
        <div class="error-info-copyright">
          <span>©2022 粤ICP备2021046507号-1 GU1ST.CN</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
let num = ref(5)

//计时 到1的时候回到首页
let timer = setInterval(() => {
  if (num.value === 1) {
    clearInterval(timer)
    goHome()
  }
  num.value = num.value - 1
}, 1000)

//返回首页
const goHome = () => {
  router.push({
    path: '/home'
  })
}

//组件卸载的时候清除循环定时
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
.error {
  width: 100vw;
  height: 100vh;
  background-image: url('../../../assets/error-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  overflow: hidden;
  .error-bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .error-info {
    padding: 200px 0 0 10vw;
    color: white;
    &-title {
      font-size: 60px;
      font-weight: bold;
    }
    &-desc {
      font-size: 25px;
      margin: 0;
    }
    &-link {
      color: #18a058;
      padding: 2px;
    }
    &-copyright {
      margin-top: 50px;
      color: #fff;
      font-size: 12px;
    }
    &-timer {
      margin-left: 8px;
    }
  }
}
</style>
