<template>
  <div class="main">
    <h2>main</h2>
    <button @click="handleExitClick">退出登录</button>
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
  router.push('/login')
}

</script>


<style scoped>
.main {

}
</style>