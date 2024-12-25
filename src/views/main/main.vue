<template>
  <div class="main">
    <div class="common-layout">
      <el-container class="main-content">
        <el-aside class="left" width="300px">
          <aside-top />
          <aside-main />
        </el-aside>
        <el-main class="right">
          <el-icon class="logo" size="90" color="grey">
            <Basketball />
          </el-icon>
          <aside-footer ref="asideFooterRef" />
        </el-main>
      </el-container>
    </div>
    <div class="overlay" v-show="isShowPostBox" @click="handleOverlayClick">
      <div class="post-moment-wapper" @click.stop>
        <post-moment-box />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AsideTop from '@/views/main/cpns/main/aside-top.vue'
import AsideFooter from '@/views/main/cpns/main/aside-footer.vue'
import AsideMain from '@/views/main/cpns/main/aside-main.vue'
import PostMomentBox from '@/views/main/cpns/panel/cpns/post-moment-box.vue'
import useMomentStore from '@/stores/moment/moment'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const momentStore = useMomentStore()
const { isShowPostBox } = storeToRefs(momentStore)
const toggleShow: Function = momentStore.toggleShowBox
const asideFooter = ref<InstanceType<typeof AsideFooter>>()

function handleOverlayClick(event: Event) {
  // 蒙板这里要阻止子元素事件冒泡
  toggleShow()
  console.log('蒙板发生了点击')
}
</script>

<style scoped>
.main-content {
  background-color: #f7f7f7;
  height: 100vh;
  width: 1280px;

  .left {
    height: 100%;
  }

  .right {
    width: 980px;
    position: relative;
    text-align: center;
    background-color: #f0f0f0;

    .logo {
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
    }
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.post-moment-wapper {
  min-width: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 20px;
  border-radius: 10px;
}
</style>
