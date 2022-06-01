<template>
  <div class="root-header">
    <div class="root-header-logo">Gu1st's Blog</div>
    <div class="root-header-info" @click="loginout">退出登录</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const loginout = () => {
  router.push({
    path: '/login'
  })
}
</script>

<style scoped lang="scss">
.root-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 49px;
  padding: 0 20px;
  box-sizing: border-box;
  &-logo {
    font-size: 20px;
    font-weight: bold;
    color: #18a058;
  }
  &-info {
    cursor: pointer;
    &:hover {
      color: #18a058;
      text-decoration: underline;
    }
  }
}
</style>
