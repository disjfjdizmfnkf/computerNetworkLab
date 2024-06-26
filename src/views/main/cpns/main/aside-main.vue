<template>
  <div class="aside-main">
    <div class="item" @click="itemClick(item.id)" v-for="item in friends" :key="item.id">
      <span class="block">
        <el-avatar :size="50" :src='item.avatar' />
      </span>
      <div class="info">
        <div class="name">{{ item.name }}</div>
        <div class="sign">{{ item.sign}}</div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import useChatStore from '@/stores/chat/chat'
import { storeToRefs } from 'pinia'

const chatStore = useChatStore()

const { friends } = storeToRefs(chatStore)

const setCurrentFriend = chatStore.setCurrentFriend

const itemClick = (id) => {
  setCurrentFriend(id)
  console.log(`点击用户,id:${id}`)
}

</script>

<style lang="less" scoped>
.aside-main {
  max-height: 90vh;
  overflow-y: auto;
  padding: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  .item {
    display: flex;
    align-items: center;
    margin-top: 20px;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.03);
      background-color: #e4e5f7;
      //background-color: rgba(228, 229, 247, 0.05);
    }

    .block {
      margin-right: 15px;
    }

    .info {
      flex-grow: 1;
      overflow: hidden;

      .name {
        font-weight: bold;
        color: #000;
        margin-bottom: 5px;
      }

      .sign {
        font-size: 14px;
        color: #afb9c3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.item.active {
  background-color: #e4e5f7;
}
</style>