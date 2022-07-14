<script setup lang="ts">
import message from './components/common/message.vue';
</script>

<template>
  <n-message-provider>
    <message />
  </n-message-provider>
  <router-view></router-view>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
