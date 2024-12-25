<script setup>
import useMomentStore from '@/stores/moment/moment'
import { Edit } from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'

const momentStore = useMomentStore()
const toggleShow = momentStore.toggleShowBox

function toggleShowPostBox() {
  toggleShow()
}
</script>

<template>
  <div class="post">
    <el-button size="large" type="primary" :icon="Edit" circle @click="toggleShowPostBox" />
  </div>
</template>

<style lang="less" scoped>
.post {
  height: 30px;
  padding-right: 35px;
  margin: 20px 0;
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
