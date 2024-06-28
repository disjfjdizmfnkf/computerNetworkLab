<template>
  <div class="chatbox-container">
    <el-card class="chat-card">
      <template #header>
        <div class="chat-header">
          <span>{{ currentFriend.name }}</span>
        </div>
      </template>
      <div class="message-box" ref="messageBox">
        <div v-for="(message, index) in currentMessages" :key="index"
             :class="['message-wrapper', message.from === 'user' ? 'user-message' : 'friend-message']">
          <el-avatar :size="40"
                     :src="message.from === 'user' ? (sessionCache.getCache(USER_AVATAR) ?? defaultAvatar) : currentFriend.avatar" />
          <div class="message-bubble">
            <img v-if="message.type === 'image'" :src="message.content" alt="Image" class="message-image" />
            <p v-else class="message-text">{{ message.content }}</p>
          </div>
        </div>
      </div>
      <div class="input-area">
        <el-input
          v-model="currentMessage"
          placeholder="输入消息..."
          @keyup.enter="sendMessage(currentMessage)"
        >
          <template #append>
            <el-button @click="sendMessage(currentMessage)" type="primary" class="send-button">
              <el-icon size="20px">
                <Promotion />
              </el-icon>
            </el-button>
          </template>
          <template #suffix>
            <el-upload
              class="upload-button"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleImageUpload"
            >
              <el-button type="primary">
                <el-icon>
                  <Picture />
                </el-icon>
              </el-button>
            </el-upload>
          </template>
        </el-input>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import defaultAvatar from '@/assets/img/default.jpg'
import useChatStore from '@/stores/chat/chat.ts'
import { storeToRefs } from 'pinia'
import { sessionCache } from '@/utils/cache.ts'
import { USER_AVATAR } from '@/global/constants.ts'
import { Picture } from '@element-plus/icons-vue'

const chatStore = useChatStore()
const { chatMessages, currentFriendId, currentFriend, currentMessages } = storeToRefs(chatStore)

const sendMessage = (message) => {
  if (message.trim()) {
    chatStore.sendMessage(message)
    currentMessage.value = ''
  }
}

const handleImageUpload = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    chatStore.sendMessage(e.target.result, 'image')
  }
  reader.readAsDataURL(file.raw)
}

const currentMessage = ref('')
const messageBox = ref(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (messageBox.value) {
      messageBox.value.scrollTop = messageBox.value.scrollHeight
    }
  })
}

onMounted(() => {
  scrollToBottom()
})

watch(() => currentMessages.value, () => {
  scrollToBottom()
}, { deep: true })
</script>

<style scoped lang="less">

// 清除全局样式了
:deep(.el-input__wrapper) {
  padding-right: 0;
}

.chatbox-container {
  max-width: 95%;
  height: 100%;
}

.chat-card {
  border-radius: 20px;
  border: #afb9c3 solid;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.message-box {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  height: 400px;

  .message-text {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bolder;
}

.message-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 10px;
}

.message-box {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  max-height: 400px;
}

.message-wrapper {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
}

.user-message {
  flex-direction: row-reverse;
}

.message-bubble {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  position: relative;
  margin: 0 14px;

  p {
    text-align: left;
  }
}

.user-message .message-bubble {
  background-color: #007bff;
  color: white;
  border-top-right-radius: 0;
}

.friend-message .message-bubble {
  background-color: #f1f0f0;
  color: black;
  border-top-left-radius: 0;
}

.user-message .message-time {
  left: 5px;
}

.input-area {
  padding: 20px;
  border-top: 1px solid #eee;

  .upload-button {
    display: flex;
    align-items: center;
  }

  .send-button {
    display: flex;
    align-items: center;
  }
}

.message-box::-webkit-scrollbar {
  width: 6px;
}

.message-box::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.message-box::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.message-box::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>