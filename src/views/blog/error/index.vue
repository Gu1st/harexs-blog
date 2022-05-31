<template>
  <div class="error">
    <div class="error-bg">
      <div class="error-info">
        <span class="error-info-title">404</span>
        <p class="error-info-desc">sorry! 页面找不到了 ...</p>
        <router-link to="/" class="error-info-link">回到首页</router-link>
        <div class="error-info-copyright">
          <span>©2022 粤ICP备2021046507号-1 GU1ST.CN</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
    background-color: rgba(0, 0, 0, 0.3);
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
  }
}
</style>
