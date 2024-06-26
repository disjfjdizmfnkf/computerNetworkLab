import hyRequest from '@/service'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const token = localCache.getCache(LOGIN_TOKEN)

export function changeUserInfo(name:string, sign:string, userId:number) {
  return hyRequest.patch({
    url: `/users/${userId}`,
    data: {
      name: name,
      sign: sign,
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