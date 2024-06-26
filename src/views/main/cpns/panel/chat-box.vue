<template>
  <div class="chatbox-container">
    <el-card class="chat-card">
      <template #header>
        <div class="chat-header">
          <span>{{ friendInfo.name }}</span>
        </div>
      </template>
      <div class="box">
        <div class="message-box" ref="messageBox">
          <div v-for="(message, index) in friendInfo.messages" :key="index"
               :class="['message-wrapper', message.from === 'user' ? 'user-message' : 'friend-message']">
            <el-avatar :size="40" :src="message.from === 'user' ? USER_AVATAR : friendInfo.avatar" />
            <div class="message-bubble">
              <p>{{ message.content }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="input-area">
        <el-input
          v-model="currentMessage"
          placeholder="输入消息..."
          @keyup.enter="sendMessage"
        >
          <template #append>
            <el-button @click="sendMessage" type="primary" class="send-button">
              <el-icon  size="20px">
                <Promotion />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watchEffect } from 'vue'
import defaultAvatar from '@/assets/img/default.jpg'

const props = defineProps({
  friendInfo: {
    type: Object,
    required: true
  },
  USER_AVATAR: {
    type: String,
    default:  defaultAvatar
  }
})

const currentMessage = ref('')
const messageBox = ref(null)
const emit = defineEmits(['send-message'])

const sendMessage = () => {
  if (!currentMessage.value.trim()) return
  emit('send-message', currentMessage.value)
  currentMessage.value = ''
  scrollToBottom()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messageBox.value) {
      messageBox.value.scrollTop = messageBox.value.scrollHeight
    }
  })
}

onMounted(scrollToBottom)

watchEffect(() => {
  if (props.friendInfo.messages.length) {
    scrollToBottom()
  }
})
</script>

<style scoped>
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

.chat-header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bolder;
}

.box {
  height: 400px;
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