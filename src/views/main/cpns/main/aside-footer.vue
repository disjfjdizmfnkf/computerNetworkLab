<template>
  <div class="aside-footer">
    <el-tabs tab-position="bottom" class="tabs">
      <el-tab-pane class="item">
        <template #label>
          <el-icon class="icon" :class="{ 'active': activeTab === 'chat' }" @mouseover="activeTab = 'chat'"
                   @mouseout="activeTab = ''">
            <ChatDotRound />
          </el-icon>
        </template>
      </el-tab-pane>
      <el-tab-pane class="item">
        <template #label>
          <el-icon class="icon" :class="{ 'active': activeTab === 'star' }" @mouseover="activeTab = 'star'"
                   @mouseout="activeTab = ''">
            <Star />
          </el-icon>
        </template>
      </el-tab-pane>
      <el-tab-pane class="item">
        <template #label>
          <el-icon class="icon" :class="{ 'active': activeTab === 'user' }" @mouseover="activeTab = 'user'"
                   @mouseout="activeTab = ''">
            <User />
          </el-icon>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script setup lang="ts">
import { computed, ref } from 'vue'

const activeTab = ref('')




</script>


<style lang="less" scoped>

.aside-footer {
  position: absolute;
  bottom: 1px;
  width: 300px;

  .tabs {
    width: 100%;

    :deep(.el-tabs__nav) {
      width: 100%;
      display: flex;
    }

    :deep(.el-tabs__item) {
      flex: 1;
      font-size: 30px;
      text-align: center;
    }
  }
}
</style>