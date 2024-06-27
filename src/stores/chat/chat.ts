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
  return str.replace(/[\n\t]/g, ' ');
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
  const friend = useChatStore().$state.friends.find((f: { id: number; name: string; avatar: string; sign: string; }) => f.id === friendId);
  return friend ? friend.name : undefined;
}

// socket.io 客户端
const socket = io('http://localhost:3001', {
  withCredentials: true
})


const useChatStore = defineStore('chat', {
  state: () => ({
    friends: [
      { id: 1, name: '无头骑士', avatar: 'http://localhost:3000/moment/photos/8', sign: '[🤖] 就是一个聊天机器人' },],
    chatMessages: {
      1: [{ from: 'friend', content: '我是🤖，你可以问我任何问题，但我不一定回答' }]
    } as Record<number, { from: string; content: string; type?: string; }[]>,
    currentFriendId: 1,
    userId: null as number | null
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

    login(userId: number) {
      this.userId = userId
      socket.emit('login', userId)
    },
    // 在发送消息后立即解密
    async sendMessage(message: string, type: 'text' | 'image' = 'text') {
      if (type === 'text' && !message.trim()) return
      const friendId = this.currentFriendId
      const messageObj = { from: 'user', content: message, type }
      this.chatMessages[friendId] = [...this.chatMessages[friendId], messageObj]

      if (friendId === 1) {
        // AI 聊天
        const res = await sendMessageToGpt(message)
        const resolve = cleanString(res.data)  // 去掉换行符
        this.chatMessages[friendId] = [...this.chatMessages[friendId], { from: 'friend', content: resolve, type: 'text' }]
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
        this.chatMessages[from].push({ from: 'friend', content: decryptedContent.message, type: decryptedContent.type})
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
    },
  },

  getters: {
    currentFriend: (state) => state.friends.find(f => f.id === state.currentFriendId),
    currentMessages: (state) => state.chatMessages[state.currentFriendId] || []
  }
})

// 监听私聊消息
socket.on('private message', ({ from, message }) => {
  const store = useChatStore()
  store.receiveMessage(from, message)
})

// 监听好友上线
socket.on('friend online', (friendId) => {
  ElMessage.success(`好友 ${getFriendNameById(friendId)} 上线了`)
  const store = useChatStore();
  if (!store.$state.chatMessages[friendId]) {
    store.$state.chatMessages[friendId] = []
  }
})

export default useChatStore