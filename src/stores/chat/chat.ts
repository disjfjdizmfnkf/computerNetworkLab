import { defineStore } from 'pinia'
import { sendMessageToGpt } from '@/service/modules/chat'
import io from 'socket.io-client'

// socket.io 客户端
const socket = io('http://localhost:3001', {
  withCredentials: true
})


const useChatStore = defineStore('chat', {
  state: () => ({
    friends: [
      { id: 1, name: '无头骑士', avatar: 'http://localhost:3000/moment/photos/8', sign: '[🤖] 就是一个聊天机器人' },
      { id: 13, name: '1234567', avatar: 'http://localhost:3000/users/avatar/2', sign: '人' },
      { id: 4, name: 'dtcdtc', avatar: 'http://localhost:3000/users/avatar/4', sign: '博观而约取，厚积而薄发' }
    ],
    chatMessages: {
      1: [{ from: 'friend', content: '我是🤖，你可以问我任何问题，但我不一定回答' }]
    } as Record<number, { from: string; content: string; }[]>,
    currentFriendId: 1,
    userId: null as number | null
  }),
  actions: {
    login(userId: number) {
      this.userId = userId
      socket.emit('login', userId)
    },
    async sendMessage(message: string) {
      if (!message.trim()) return
      const friendId = this.currentFriendId
      this.chatMessages[friendId] = [...this.chatMessages[friendId], { from: 'user', content: message }]

      if (friendId === 1) {
        // AI 聊天
        const res = await sendMessageToGpt(message)
        this.chatMessages[friendId] = [...this.chatMessages[friendId], { from: 'friend', content: res.data }]
      } else {
        // 用户聊天
        socket.emit('private message', { to: friendId, message })
        // console.log('发送私聊消息', friendId, message)
      }
    },
    setCurrentFriend(friendId: number) {
      this.currentFriendId = friendId
      if (!this.chatMessages[friendId]) {
        this.chatMessages[friendId] = []
      }
    },
    receiveMessage(from: number, content: string) {
      if (!this.chatMessages[from]) {
        this.chatMessages[from] = []
      }
      this.chatMessages[from].push({ from: 'friend', content })
    }
  },
  getters: {
    currentFriend: (state) => state.friends.find(f => f.id === state.currentFriendId),
    currentMessages: (state) => state.chatMessages[state.currentFriendId] || []
  }
})

// 监听私聊消息
socket.on('private message', ({ from, message }) => {
  // console.log('收到私聊消息', from, message)
  const store = useChatStore()
  store.receiveMessage(from, message)
})

export default useChatStore