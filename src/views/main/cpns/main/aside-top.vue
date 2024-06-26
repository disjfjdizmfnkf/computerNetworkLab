<template>
  <div class="aside-top">
    <button @click="handleExitClick">
      <el-icon size="25">
        <ArrowLeft />
      </el-icon>
    </button>
    <div class="title">
      计算机网络实验
    </div>
  </div>
</template>


<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'

const handleExitClick = () => {
  // 1.清除本地缓存
  localCache.removeCache(LOGIN_TOKEN)
  // 2.返回登录界面
  router.push('/modules')
}
</script>


<style lang="less" scoped>
.aside-top {
  height: 40px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;

  .title {
    margin: auto;
    font-size: 20px;
    font-weight: bolder;
    color: #000;
    text-shadow: 0 1px 0 #CCCCCC, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, .1), 0 0 5px rgba(0, 0, 0, .1), 0 1px 3px rgba(0, 0, 0, .3), 0 3px 5px rgba(0, 0, 0, .2), 0 5px 10px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .2), 0 20px 20px rgba(0, 0, 0, .15);
  }

  button {
    border: none;
  }
}
</style>