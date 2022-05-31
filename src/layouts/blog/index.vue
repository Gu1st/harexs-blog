<template>
  <blog-header></blog-header>
  <router-view></router-view>
  <blog-footer></blog-footer>
</template>

<script setup lang="ts">
import blogHeader from '../../components/home/blogHeader.vue'
import blogFooter from '../../components/home/blogFooter.vue'
</script>

<style scoped></style>
