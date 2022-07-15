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
pre {
  background-color: #2a2928;
  padding: 10px;
  border-radius: 10px;
}
code {
  color: #18a058;
  white-space: pre-wrap;
}
</style>
