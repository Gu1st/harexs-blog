<template>
  <div class="header-wrap">
    <img class="header-logo" width="40" height="40" :src="dog" />
    <div class="header-nav">
      <router-link to="/">首页</router-link>
      <router-link to="/a">技术</router-link>
      <router-link to="/b">杂谈</router-link>
    </div>
    <div class="search"></div>
  </div>
</template>

<script setup lang="ts">
import dog from '../../assets/dog.jpg'
</script>

<style scoped lang="scss">
.header-wrap {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 0px 6px 1px #e5e5e5;
  .header-wrap {
    border-radius: 20px;
  }
}
</style>
