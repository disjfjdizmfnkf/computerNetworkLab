import { defineStore } from 'pinia'
import { sendMessageToGpt } from '@/service/modules/chat'
import io from 'socket.io-client'
import { ElMessage } from 'element-plus'
import CryptoJS from 'crypto-js'
import { getUserFriendsInfoList } from '@/service/modules/login'
import { sessionCache } from '@/utils/cache'
import { USER_ID } from '@/global/constants'

// 加密密钥
const ENCRYPTION_KEY = '1234567890abcdef'

function cleanString(str: string) {
  return str.replace(/[\n\t]/g, ' ')
}

// 加密函数
function encryptMessage(message: string) {
  return CryptoJS.AES.encrypt(message, ENCRYPTION_KEY).toString()
}

// 解密函数
function decryptMessage(encryptedMessage: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, ENCRYPTION_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

// id -> name
function getFriendNameById(friendId: number) {
  const friend = useChatStore().$state.friends.find((f: {
    id: number;
    name: string;
    avatar: string;
    sign: string;
  }) => f.id === friendId)
  return friend ? friend.name : undefined
}

let socket: any = null

const useChatStore = defineStore('chat', {
  state: () => ({
    friends: [
      { id: 1, name: '无头骑士', avatar: 'http://localhost:3000/moment/photos/8', sign: '[🤖] 就是一个聊天机器人' }
    ],
    chatMessages: {
      1: [{ from: 'friend', content: '我是🤖，你可以问我任何问题，但我不一定回答' }]
    } as Record<number, { from: string; content: string; type?: string; }[]>,
    currentFriendId: 1,
    userId: null as number | null,
    isSocketConnected: false
  }),

  actions: {
    async getFriendList() {
      const res = await getUserFriendsInfoList(sessionCache.getCache(USER_ID))
      console.log('好友列表处理之前', res.data)
      const friendsList = res.data.map((friend: { id: number; name: string; avatar_url: string; sign: string; }) => ({
        id: friend.id,
        name: friend.name,
        avatar: friend.avatar_url,
        sign: friend.sign
      }))
      console.log('好友列表', friendsList)
      this.friends.push(...friendsList)
    },

    initializeSocket(userId: number) {
      if (!socket) {
        socket = io('http://localhost:3001', {
          withCredentials: true
        })

        socket.on('connect', () => {
          this.isSocketConnected = true
          this.login(userId)
        })

        socket.on('private message', ({ from, message }: { from: number, message: string }) => {
          this.receiveMessage(from, message)
        })

        socket.on('friend online', (friendId: number) => {
          ElMessage.success(`好友 ${getFriendNameById(friendId)} 上线了`)
          if (!this.$state.chatMessages[friendId]) {
            this.$state.chatMessages[friendId] = []
          }
        })
      }
    },

    login(userId: number) {
      this.userId = userId
      if (this.isSocketConnected) {
        socket.emit('login', userId)
      }
    },

    async sendMessage(message: string, type: 'text' | 'image' = 'text') {
      if (type === 'text' && !message.trim()) return
      const friendId = this.currentFriendId
      const messageObj = { from: 'user', content: message, type }
      this.chatMessages[friendId] = [...this.chatMessages[friendId], messageObj]

      if (friendId === 1) {
        // AI 聊天
        try {
          const res = await sendMessageToGpt(message)
          if (res && res.from === 'chatGpt' && res.data) {
            const cleanedData = cleanString(res.data)
            const formattedData = cleanedData.replace(/\\n/g, '\n')
            this.chatMessages[friendId] = [...this.chatMessages[friendId], { from: 'friend', content: formattedData, type: 'text' }]
          } else {
            console.error('Invalid response from GPT:', res)
            this.chatMessages[friendId] = [...this.chatMessages[friendId], { from: 'friend', content: '抱歉，我遇到了一些问题。请稍后再试。', type: 'text' }]
          }
        } catch (error) {
          console.error('Error in sendMessage:', error)
          let errorMessage = '发生了错误，请稍后再试。'
          if (error === 'ECONNABORTED') {
            errorMessage = '请求超时，请检查你的网络连接并稍后再试。'
          }
          this.chatMessages[friendId] = [...this.chatMessages[friendId], { from: 'friend', content: errorMessage, type: 'text' }]
        }
      } else {
        // 用户聊天
        const encryptedMessage = encryptMessage(JSON.stringify({ message, type }))
        console.log('加密后的消息', encryptedMessage)

        // 解密消息
        const decryptedMessage = decryptMessage(encryptedMessage)
        console.log('解密后的消息', decryptedMessage)

        socket.emit('private message', { to: friendId, message: encryptedMessage })
        console.log('发送消息', message)
      }
    },

    receiveMessage(from: number, encryptedContent: string) {
      if (!this.chatMessages[from]) {
        this.chatMessages[from] = []
      }
      try {
        const decryptedContent = JSON.parse(decryptMessage(encryptedContent))
        this.chatMessages[from].push({ from: 'friend', content: decryptedContent.message, type: decryptedContent.type })
        console.log('收到消息', decryptedContent)
      } catch (error) {
        console.error('解析消息时出错', error)
      }
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