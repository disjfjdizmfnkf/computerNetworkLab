import hyRequest from '@/service'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const token = localCache.getCache(LOGIN_TOKEN)

export function changeUserInfo(name: string, sign: string, userId: number) {
  return hyRequest.patch({
    url: `/users/${userId}`,
    data: {
      name: name,
      sign: sign
    }
  })
}

export function changeUserAvatar(formData: FormData) {
  return hyRequest.post({
    url: `/file/avatar`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

export function getUserFriendsInfoList(userId: number) {
  return hyRequest.get({
    url: `/users/${userId}/friends`
  })
}

export function addFriends(userName: string) {
  return hyRequest.post({
    // userId是发送好友请求的人的id，以后有时间要好好写后端
    url: `/:userId/friends`,
    data: {
      userName
    }
  })
}