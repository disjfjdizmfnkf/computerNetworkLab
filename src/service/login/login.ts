import hyRequest from '@/service'
import type { IAccount } from '@/types'

// 网络请求的函数
export function accountLoginRequest(account: IAccount){
  return hyRequest.post({
    url: '/login',
    data: account,
  })
}

export function getUserInfoById(id: number){
  return hyRequest.get({
    url: `users/${id}`
    // 将限权认证放入路由拦截了
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getUserMenuById(id: number){
  return hyRequest.get({
    url: `users/${id}/menu`
  })
}