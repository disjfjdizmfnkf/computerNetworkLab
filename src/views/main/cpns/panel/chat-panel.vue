<template>
  <div class="chatbox-container">
    <div class="container">
      <h1>AI-助手</h1>
      <div class="messageBox">
        <template v-for="(message, index) in messages" :key="index">
          <div v-if="message.from === 'user'" class="messageFromUser">
            <div class="userMessageWrapper">
              <div class="userMessageContent">{{ message.data }}</div>
            </div>
          </div>
          <div v-else class="messageFromChatGpt">
            <div class="chatBotInfo">
              <img src="" alt="" class="chatBotAvatar"/>
              <span class="chatBotName">无头骑士</span>
            </div>
            <div class="chatGptMessageWrapper">
              <div class="chatGptMessageContent">{{ message.data }}</div>
            </div>
          </div>
        </template>
<!--        <van-loading v-if="loading" type="spinner" />-->
      </div>
      <div class="inputContainer">
        <input
          @keyup.enter="sendMessage(currentMessage)"
          v-model="currentMessage"
          type="text"
          class="messageInput"
          placeholder="有什么问题与AI助手交谈？"
        />
        <button
          @click="sendMessage(currentMessage)"
          class="askButton"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {storeToRefs} from "pinia";


// const homeStore = useHomeStore()
// const {loading} = storeToRefs(homeStore)


const currentMessage = ref('');
const messages = ref([
  {
    from: 'chatGpt',
    data: '😊您好！我是一个AI助手，有什么我可以帮助您的吗？',
  }
]);

async function sendMessage(message) {
  if (!message) return;
  messages.value.push({
    from: 'user',
    data: message,
  })
  currentMessage.value = ''
  // homeStore.setLoading(true)
  await axios
    .post('http://localhost:3000/chat/bot', {
      message: message,
    })
    .then((response) => {
      messages.value.push({
        from: 'chatGpt',
        data: response.data.data,
      })
    })
    .finally(() => {
      // homeStore.setLoading(false)
    })
}
</script>

<style scoped>

.chatbox-container {
  width: 95%;
  height: 80vh;
  border-radius: 19px;
  border: #afb9c3 solid;
  overflow: hidden;
}

.container {
  height: 600px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'Microsoft YaHei', 'SimHei', 'Arial', 'sans-serif';
}

h1 {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #333;
  padding: 16px;
  margin: 0;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ddd;
}



.messageBox {
  padding: 16px;
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f9f9f9;
}

.messageFromUser {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.messageFromChatGpt {
  display: flex;
  margin-bottom: 8px;
}

.userMessageWrapper,
.chatGptMessageWrapper {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.userMessageWrapper {
  align-self: flex-start;
}

.chatGptMessageWrapper {
  align-self: flex-end;
}

.userMessageContent,
.chatGptMessageContent {
  padding: 8px 12px;
  border-radius: 18px;
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
}

.userMessageContent {
  background-color: #ededed;
  color: #333;
  border-top-right-radius: 0;
  border-top-left-radius: 18px;
}

.chatGptMessageContent {
  background-color: #1877f2;
  color: #fff;
  border-top-left-radius: 0;
  border-top-right-radius: 18px;
}

.inputContainer {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #f0f0f0;
  border-top: 1px solid #ddd;
}

.messageInput {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 12px;
  font-size: 16px;
  background-color: #fff;
  border-radius: 24px;
  margin: 0 8px 0 0;
}

.askButton {
  background-color: #1877f2;
  color: #fff;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 24px;
  transition: background-color 0.3s ease-in-out;
}


.askButton:hover {
  background-color: #145cb3;
}

.chatBotInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4px;
}

.chatBotAvatar {
  width: 40px;
  height: 32px;
  border-radius: 50%;
  margin-bottom: 8px;
}

.chatBotName {
  font-weight: bold;
  color: #333;
}

@media (max-width: 480px) {
  .container {
    width: 100%;
    max-width: none;
    height: 100%;
    border-radius: 0;
  }

  .chatbox-container {
    bottom: 0;
    right: 0;
    left: 0;
  }
}
</style>