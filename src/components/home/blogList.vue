<template>
  <transition-group name="list">
    <div class="bolg" v-if="ListRes.length">
      <div class="article-card" v-for="(item, index) in ListRes" :key="index">
        <div class="article-title" @click="seeDetails(item.id)">
          <span>{{ item.title }}</span>
        </div>
        <div
          v-if="item.head_img"
          class="article-img"
          :style="{ backgroundImage: `url(${item.head_img})` }"
        ></div>
        <div class="article-desc">
          <span>{{ item.desc }}</span>
        </div>
        <div class="article-footer">
          <div class="article-date">
            <span>gu1st发表于{{ getterDate(item.created_at) }}</span
            ><span>/</span>
          </div>
          <div class="article-category">
            <span v-for="(items, indexs) in item.classifyNameAndId" :key="indexs">
              <span @click="classifyEvent(items.id)" class="article-category-name">{{
                items.name
              }}</span>
              <span
                class="article-category-break"
                v-if="indexs !== item.classifyNameAndId.length - 1"
                >,</span
              >
            </span>
            <span>/</span>
          </div>
          <div class="article-comment">
            <span>{{ item.comment_num ? item.comment_num : 0 }}条评论</span>
          </div>
        </div>
      </div>
    </div>
    <div class="noData" v-else>
      <span>暂无内容,去别的地方看看?</span>
      <router-link to="/" style="font-size: 14px">返回首页</router-link>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { getterDate } from '../../utils/getter';
const props = defineProps(['listData']);
const router = useRouter();
let ListRes = ref<any[]>([]);
watchEffect(() => {
  ListRes.value = props.listData;
  // 将分类名称以及ID 转为数组显示
  ListRes.value.forEach(item => {
    item.classify_name = item.classify_name.split(',');
    item.classify_id = item.classify_id.split(',');
    item.classifyNameAndId = item.classify_name.map((items, index) => {
      return {
        name: items,
        id: item.classify_id[index]
      };
    });
  });
});

//点击查看详情
const seeDetails = id => {
  router.push({
    path: '/article',
    query: {
      id
    }
  });
};

const classifyEvent = cid => {
  router.push({
    path: '/category',
    query: {
      cid
    }
  });
};
</script>

<style scoped lang="scss">
@media (max-width: 980px) {
  .bolg {
    width: auto !important;
    margin: 30px 30px 0 30px !important;
    .article-title span {
      font-size: 24px !important;
    }
  }
}

@media (max-width: 768px) {
  .bolg {
    .article-img {
      height: 150px !important;
      overflow: hidden;
    }
    .article-title span {
      font-size: 20px !important;
      font-weight: bolder;
    }
  }
}

.noData {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 16px;
  color: #777;
  padding: 50px;
}
.bolg {
  width: 1020px;
  max-width: 100%;
  margin: 30px auto 0 auto;
  .article-card {
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 2px dashed #eee;
  }
  .article-title {
    cursor: pointer;
    padding: 10px 0 10px 0;
    color: #444444;
    span {
      font-size: 26px;
    }
    &:hover {
      color: #18a058;
    }
  }
  .article-img {
    border-radius: 6px;
    height: 300px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .article-desc {
    padding: 10px 0 10px 0;
    span {
      font-size: 14px;
      color: #666666;
    }
  }
  .article-category-break {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  .article-category-name {
    cursor: pointer;
    &:hover {
      color: #18a058;
    }
  }
  .article-footer {
    display: flex;
    color: #666;
    font-weight: bold;
    font-size: 14px;
    span + span {
      margin-left: 4px;
      margin-right: 4px;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
