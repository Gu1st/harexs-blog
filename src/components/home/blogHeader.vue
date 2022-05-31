<template>
  <div class="header-wrap">
    <div class="header-slide" @click="showsliderMenu">
      <n-icon :component="MenuOutline" size="30" />
    </div>
    <transition name="mode-fade" mode="out-in">
      <div class="header-slideMenu" v-if="sliderMenu">
        <router-link
          v-for="(item, index) in menuList"
          :key="index"
          exact-active-class="router-link-exact-active2"
          :to="item.url"
          >{{ item.title }}</router-link
        >
      </div>
    </transition>
    <img class="header-logo" :src="dog" />
    <div class="header-title">Gu1st's Blog</div>
    <div class="logo-diver"></div>
    <div class="header-nav">
      <router-link
        v-for="(item, index) in menuList"
        :key="index"
        :to="item.url"
        exact-active-class="router-link-exact-active1"
        >{{ item.title }}</router-link
      >
    </div>
    <n-input class="header-search" round placeholder="输入搜索内容">
      <template #suffix>
        <n-icon :component="Search" />
      </template>
    </n-input>
  </div>
</template>

<script setup lang="ts">
import { Search, MenuOutline } from '@vicons/ionicons5'
import dog from '../../assets/dog.jpg'
import { ref } from 'vue'

let sliderMenu = ref(false)
const showsliderMenu = () => {
  sliderMenu.value = !sliderMenu.value
}

window.addEventListener('resize', e => {
  if (window.innerWidth > 768) {
    sliderMenu.value = false
  }
})

let menuList = ref([
  {
    title: '首页',
    url: '/'
  },
  {
    title: '技术',
    url: '/program'
  },
  {
    title: '杂谈',
    url: '/talk'
  }
])
</script>

<style scoped lang="scss">
@media (max-width: 768px) {
  .header-wrap .logo-diver,
  .header-wrap .header-nav,
  .header-wrap .header-search {
    display: none !important;
  }
  .header-wrap {
    justify-content: center;
    .header-slide {
      display: flex !important;
    }
  }
}
.header-wrap {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 0px 6px 1px #e5e5e5;
  .header-slideMenu {
    position: absolute;
    top: 61px;
    left: 0;
    right: 0;
    background-color: #fff;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      text-decoration: none;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid #ebebeb;
      box-sizing: border-box;
    }
  }
  .logo-diver {
    height: 20px;
    width: 1px;
    margin: 0 30px 0 30px;
    background-color: #dedede;
  }
  .header-slide {
    position: absolute;
    display: none;
    left: 0;
    top: 0;
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;
  }
  .header-logo {
    width: 40px;
    height: 40px;
    margin: 0 20px 0 20px;
    border-radius: 20px;
  }
  .header-search {
    width: 200px;
    margin-left: auto;
    margin-right: 20px;
  }
  .header-nav {
    display: flex;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      margin-right: 40px;
      text-decoration: none;
      font-size: 16px;
      color: #333;
      border-bottom: 2px solid transparent;
      box-sizing: border-box;
    }
    a:hover {
      color: #18a058;
    }
  }
}
.router-link-exact-active1 {
  color: #18a058 !important;
  border-color: #18a058 !important;
}
.router-link-exact-active2 {
  color: #18a058 !important;
}

.mode-fade-enter-active,
.mode-fade-leave-active {
  transition: opacity 0.5s ease;
}

.mode-fade-enter-from,
.mode-fade-leave-to {
  opacity: 0;
}
</style>
