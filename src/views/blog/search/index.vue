<template>
  <blog-list></blog-list>
</template>

<script setup lang="ts">
import blogList from '../../../components/home/blogList.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

console.log('搜索页面，参数content为:', route.params?.content)
</script>

<style scoped></style>
