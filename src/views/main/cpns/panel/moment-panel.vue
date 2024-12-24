<template>
  <div class="moment-wapper">
    <div class="content">
      <template v-for="item in momentList" :key="item.id">
        <moment-box :item-data="item" />
      </template>
    </div>
    <div class="post-button">
      <postmomentButton />
    </div>
  </div>
</template>

<script setup>
import useMomentStore from '@/stores/moment/moment.ts'
import MomentBox from '@/views/main/cpns/panel/cpns/moment-box.vue'
import postmomentButton from './cpns/postmoment-button.vue'

const momentStore = useMomentStore()

const { momentList } = momentStore
momentStore.fetchMomentIdListData()

console.log(momentList)
</script>

<style lang="less" scoped>
.moment-wapper {
  border-radius: 20px;
  border: #afb9c3 solid;
  width: 95%;
  height: 582px;
  overflow-y: auto;
  background-color: #fff;
}
.post-button {
  height: 30px;
  position: sticky;
  bottom: 15px;
}
</style>
