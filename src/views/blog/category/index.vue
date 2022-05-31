<template>
  <blog-list></blog-list>
</template>

<script setup lang="ts">
import blogList from '../../../components/home/blogList.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

console.log('分类页，参数为：', route.params?.id)
</script>

<style scoped></style>
