<template>
  <div class="header-wrap">
    <div class="header-slide" @click="showsliderMenu">
      <n-icon :component="MenuOutline" size="30" />
    </div>
    <transition name="mode-fade" mode="out-in">
      <div class="header-slideMenu" v-if="sliderMenu">
        <a
          v-for="(item, index) in menuList"
          :key="index"
          @click="goPage(item.url, item.query)"
          :style="{
            color: route.path === item.url && route.query?.cid === item.query ? '#18a058' : ''
          }"
          >{{ item.title }}</a
        >
      </div>
    </transition>
    <img class="header-logo" :src="dog" @click="goHome" />
    <div class="header-title" @click="goHome">Harexs's Blog</div>
    <div class="logo-diver"></div>
    <div class="header-nav">
      <a
        v-for="(item, index) in menuList"
        :key="index"
        @click="goPage(item.url, item.query)"
        :style="{
          color:
            route.path === '/home' && item.url === '/home'
              ? '#18a058'
              : route.path === item.url && route.query?.cid === item.query
              ? '#18a058'
              : ''
        }"
        >{{ item.title }}</a
      >
    </div>
    <n-input
      class="header-search"
      :maxlength="100"
      v-on:keyup.enter="searchSomething"
      round
      placeholder="输入搜索内容"
    >
      <template #suffix>
        <n-icon :component="Search" />
      </template>
    </n-input>
  </div>
</template>

<script setup lang="ts">
import { Search, MenuOutline } from '@vicons/ionicons5';
import { useRouter, useRoute } from 'vue-router';
import dog from '../../assets/dog.jpg';
import { ref } from 'vue';
let sliderMenu = ref(false);
const route = useRoute();
const router = useRouter();
const goPage = (url, query) => {
  sliderMenu.value = false;
  if (url === '/yuque') {
    window.open('https://www.yuque.com/gu1st');
    return;
  }
  if (url === '/juejin') {
    window.open('https://juejin.cn/user/281906876257511');
    return;
  }
  router.push({
    path: url,
    query: {
      cid: query
    }
  });
};
//显示和隐藏菜单
const showsliderMenu = () => {
  sliderMenu.value = !sliderMenu.value;
};

//搜索框按下回车
const searchSomething = e => {
  let content: string = e.target.value.trim();
  if (content.length === 0) {
    return;
  }
  router.replace({
    path: `/search/${content}`
  });
};

//返回首页
const goHome = () => {
  router.push({
    path: '/home'
  });
};

//当页面宽度变化的时候判断是否显示菜单
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    sliderMenu.value = false;
  }
});

let menuList = ref([
  {
    title: '首页',
    url: '/home',
    query: ''
  },
  {
    title: '分类',
    url: '/label',
    query: ''
  },
  {
    title: '语雀',
    url: '/yuque',
    query: ''
  },
  {
    title: '掘金',
    url: '/juejin',
    query: ''
  }
]);
</script>

<style scoped lang="scss">
@media (max-width: 768px) {
  .header-wrap .logo-diver,
  .header-wrap .header-nav,
  .header-wrap .header-search,
  .header-title {
    display: none !important;
  }
  .header-wrap {
    position: fixed;
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
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  .header-slideMenu {
    position: absolute;
    top: 61px;
    left: 0;
    right: 0;
    z-index: 99;
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
    cursor: pointer;
  }
  .header-title {
    cursor: pointer;
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
      cursor: pointer;
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
