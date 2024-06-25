<template>
  <div class="aside-main">
    <div class="item">
      <span class="block">
        <el-avatar :size="50" :src="wuTouQiShi" />
      </span>
      <div class="info">
        <div class="name">无头骑士</div>
        <div class="sign">[🤖] 就是一个聊天机器人</div>
      </div>
    </div>
    <div class="item">
      <span class="block">
        <el-avatar :size="50" :src="defalutAvatar" />
      </span>
      <div class="info">
        <div class="name">name</div>
        <div class="sign">woshishabiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      </div>
    </div>
    <div class="item">
      <span class="block">
        <el-avatar :size="50" :src="defalutAvatar" />
      </span>
      <div class="info">
        <div class="name">name</div>
        <div class="sign">woshishabiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      </div>
    </div>    <div class="item">
      <span class="block">
        <el-avatar :size="50" :src="defalutAvatar" />
      </span>
    <div class="info">
      <div class="name">name</div>
      <div class="sign">woshishabiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    </div>
  </div>    <div class="item">
      <span class="block">
        <el-avatar :size="50" :src="defalutAvatar" />
      </span>
    <div class="info">
      <div class="name">name</div>
      <div class="sign">woshishabiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    </div>
  </div>    <div class="item">
      <span class="block">
        <el-avatar :size="50" :src="defalutAvatar" />
      </span>
    <div class="info">
      <div class="name">name</div>
      <div class="sign">woshishabiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    </div>
  </div>    <div class="item">
      <span class="block">
        <el-avatar :size="50" :src="defalutAvatar" />
      </span>
    <div class="info">
      <div class="name">name</div>
      <div class="sign">woshishabiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    </div>
  </div>


  </div>
</template>

<script setup lang="ts">
import defalutAvatar from '@/assets/img/default.jpg'
import wuTouQiShi from '@/assets/img/wutouqishi.jpg'
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