<template>
  <div>
    <div v-for="(message, index) in messages" :key="index">
      {{ message }}
    </div>
    <input type="text" v-model="newMessage" />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import io from 'socket.io-client'

const messages = ref([])
const newMessage = ref('')
const socket = io('http://localhost:3001')

const sendMessage = () => {
  socket.emit('chat message', newMessage.value)
  newMessage.value = ''
}

onMounted(() => {
  socket.on('chat message', (msg) => {
    messages.value.push(msg)
  })
})


</script>