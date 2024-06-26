<template>
  <div class="aside-footer">
    <el-tabs tab-position="bottom" class="tabs">
      <el-tab-pane class="item">
        <template #label>
          <el-icon class="icon" :class="{ 'active': activeTab === 'chat' }" @mouseover="activeTab = 'chat'"
                   @mouseout="activeTab = ''" size="35px">
            <ChatDotRound />
          </el-icon>
        </template>
        <chat-box />
      </el-tab-pane>
      <el-tab-pane class="item">
        <template #label>
          <el-icon class="icon" :class="{ 'active': activeTab === 'star' }" @mouseover="activeTab = 'star'"
                   @mouseout="activeTab = ''" size="35px">
            <Star />
          </el-icon>
        </template>
        <moment-panel />
      </el-tab-pane>
      <el-tab-pane class="item">
        <template #label>
          <el-icon class="icon" :class="{ 'active': activeTab === 'user' }" @mouseover="activeTab = 'user'"
                   @mouseout="activeTab = ''" size="35px">
            <User />
          </el-icon>
        </template>
        <private-info />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PrivateInfo from '@/views/main/cpns/panel/private-info.vue'
import MomentPanel from '@/views/main/cpns/panel/moment-panel.vue'
import ChatBox from '@/views/main/cpns/panel/chat-box.vue'
import { USER_AVATAR } from '@/global/constants'
import { sessionCache } from '@/utils/cache'

const activeTab = ref('')


</script>


<style lang="less" scoped>
.box {
  height: 100px;
  background-color: black;
}

.aside-footer {
  position: absolute;
  bottom: 1px;
  width: 959px;

  .tabs {
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