<template>
  <n-layout>
    <n-layout-header bordered>
      <root-header></root-header>
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        show-trigger
        :collapsed="openCollapsed"
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        :on-update:collapsed="callBackCollapsed"
        class="layout-sider"
      >
        <n-menu
          :onUpdateValue="selectMenu"
          :value="defaultSelectMenu"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { h, ref, Component, onMounted, watchEffect } from 'vue'
import rootHeader from '../../components/root/rootHeader.vue'
import { NIcon } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import {
  EllipsisHorizontalCircle,
  HomeOutline,
  DocumentTextOutline,
  ReorderFour
} from '@vicons/ionicons5'

const route = useRoute()
const router = useRouter()

let openCollapsed = ref(false)

//页面进入时候 如果小于一定的宽度则收起侧边栏
onMounted(() => {
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1020) {
      openCollapsed.value = true
    } else {
      openCollapsed.value = false
    }
  })
})

//根据路由决定默认选中的菜单
let defaultSelectMenu = ref('dashboard')

//侧边栏的折叠按钮被点击时触发函数
const callBackCollapsed = collapsed => {
  openCollapsed.value = collapsed
}

//页面加载之后根据当前路由决定默认菜单项
const pushMenu = () => {
  let tmpRoute = route.path.replace('/root/', '')
  defaultSelectMenu.value = tmpRoute
}
pushMenu()

//路由跳转
const selectMenu = key => {
  defaultSelectMenu.value = key
  router.push({
    path: defaultSelectMenu.value
  })
}

//渲染图标的函数
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
//菜单数据
const menuOptions = [
  {
    label: '系统首页',
    key: 'dashboard',
    icon: renderIcon(HomeOutline)
  },
  {
    label: '分类管理',
    key: 'category',
    icon: renderIcon(ReorderFour)
  },
  {
    label: '文章管理',
    key: 'article',
    icon: renderIcon(DocumentTextOutline)
  },
  {
    label: '评论管理',
    key: 'comment',
    icon: renderIcon(EllipsisHorizontalCircle)
  }
]
</script>

<style scoped lang="scss">
.layout-sider {
  height: calc(100vh - 50px);
}
</style>
