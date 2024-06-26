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
  </div>
</template>


<script setup lang="ts">
import AsideTop from '@/views/main/cpns/main/aside-top.vue'
import AsideFooter from '@/views/main/cpns/main/aside-footer.vue'
import AsideMain from '@/views/main/cpns/main/aside-main.vue'
import { ref } from 'vue'


const asideFooter = ref<InstanceType<typeof AsideFooter>>()

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


</style>