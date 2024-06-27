import hyRequest from '@/service'
import type { IAccount, IRegister } from '@/types'

// 网络请求的函数
export function accountLoginRequest(account: IAccount){
  return hyRequest.post({
    url: '/login',
    data: account,
  })
}

export function getUserInfoById(id: number){
  return hyRequest.get({
    url: `/users/${id}`
    // 将限权认证放入路由拦截了
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

// 注册时的数据在验证之后还是转换成account发送吧
export function userRegister(account: IAccount) {
  return hyRequest.post({
    url: '/users',
    data: account
  })
}

export function getUserInfoByName(name: string){
  return hyRequest.get({
    url: `users/${name}`
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