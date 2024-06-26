import { defineStore } from 'pinia'
import { sendMessageToGpt } from '@/service/modules/chat'


const useChatStore = defineStore('chat', {
  state: () => ({
    friends: [
      { id: 1, name: '无头骑士', avatar: 'http://localhost:3000/moment/photos/8', sign: '[🤖] 就是一个聊天机器人' },
      { id: 2, name: '无', avatar: 'http://localhost:3000/moment/photos/1', sign: '' },
      { id: 3, name: '头骑士', avatar: 'http://localhost:3000/moment/photos/2', sign: '' },
      { id: 4, name: '无头士', avatar: 'http://localhost:3000/moment/photos/3', sign: '' },
      { id: 5, name: '无骑士', avatar: 'http://localhost:3000/moment/photos/4', sign: '' }
    ],
    chatMessages: {
      1: [{ from: 'friend', content: '你好，有什么可以帮到你的吗？😀' }]
    },
    currentFriendId: 1
  }),
  actions: {
    async sendMessage(message: string) {
      if (!message.trim()) return
      const friendId = this.currentFriendId
      this.chatMessages[friendId] = [...this.chatMessages[friendId], { from: 'user', content: message }]

      // 发送消息到服务器并获取回复
      // const res = await sendMessageToGpt(message)
      // 将回复消息添加到聊天记录中，这样整个聊天记录就会更新，性能损耗相比较大
      this.chatMessages[friendId] = [...this.chatMessages[friendId], { from: 'friend', content: res.data }]
    },
    setCurrentFriend(friendId: number) {
      this.currentFriendId = friendId
      if (!this.chatMessages[friendId]) {
        this.chatMessages[friendId] = []
      }
    }
  },
  getters: {
    currentFriend: (state) => state.friends.find(f => f.id === state.currentFriendId),
    currentMessages: (state) => state.chatMessages[state.currentFriendId] || []
  }
})

export default useChatStore