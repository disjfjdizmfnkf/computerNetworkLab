import { defineStore } from 'pinia'
import { sendMessageToGpt } from '@/service/modules/chat'

const useChatStore = defineStore('chat', {
  state: () => ({
    friends: [
      { id: 1, name: '机器人', avatar: 'http://localhost:3000/users/avatar/8' }
    ],
    chatMessages: {
      1: [{ from: 'friend', content: '你好，有什么可以帮到你的吗？😀' }]
    },
    currentFriendId: 1
  }),
  actions: {
    async sendMessage(message: string) {
      const friendId = this.currentFriendId
      this.chatMessages[friendId].push({ from: 'user', content: message })

      // 发送消息到服务器并获取回复
      const res = await sendMessageToGpt(message)
      this.chatMessages[friendId].push({ from: 'friend', content: res.data })
    },
    setCurrentFriend(friendId: number) {
      this.currentFriendId = friendId
    }
  },
  getters: {
    currentFriend: (state) => state.friends.find(f => f.id === state.currentFriendId),
    currentMessages: (state) => state.chatMessages[state.currentFriendId] || []
  }
})

export default useChatStore