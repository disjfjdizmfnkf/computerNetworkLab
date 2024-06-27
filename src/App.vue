<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import useChatStore from '@/stores/chat/chat'
import { sessionCache } from '@/utils/cache'
import { USER_ID } from '@/global/constants'

const chatStore = useChatStore()

onMounted(() => {
  // 假设用户ID为2，您需要根据实际登录逻辑来设置正确的用户ID
  chatStore.login(sessionCache.getCache(USER_ID))
})
</script>

<template>
  <div class="app">
    <!--  占位  -->
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
}
</style>
