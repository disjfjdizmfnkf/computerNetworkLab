import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, userRegister } from '@/service/modules/login'
import type { IAccount, IRegister } from '@/types'
import { localCache, sessionCache } from '@/utils/cache'
import { LOGIN_TOKEN, USER_AVATAR, USER_NAME, USER_SIGN } from '@/global/constants'
import router from '@/router'


interface ILoginState {
  token: string
  userName: string
  avatarUrl: string
  userSign: string
}

import defaultAvatar from '@/assets/img/default.jpg'


const useLoginStore = defineStore('modules', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userName: localCache.getCache(USER_NAME)?? '',
    avatarUrl: sessionCache.getCache(USER_AVATAR),
    userSign: sessionCache.getCache(USER_SIGN) ?? '这个人很懒，什么也没有留下',
  }),

  actions: {
    // 账号登录发送吗网络请求 网络请求 -> 缓存token -> 获取用户信息 ->  进入主界面
    async LoginAccountAction(account: IAccount){
      // 1.调用网络请求函数 store func -> service func -> hyRequest(封装后的axios的一个实例) -> axios的一个方法
      const loginResult =  await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      this.userName = loginResult.data.name
      this.avatarUrl = loginResult.data.avatar_url
      this.userSign = loginResult.data.sign

      // 2.对token和其它信息进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
      sessionCache.setCache(USER_AVATAR, this.avatarUrl)
      sessionCache.setCache(USER_NAME, this.userName)
      sessionCache.setCache(USER_SIGN, this.userSign)


      // 验证身份信息之后进入主界面
      await router.push('/main')
    },
    async RegisterAction(register: IRegister){
      // 在这里输入格式验证已经完了
      const { name, password} = register
      const registerResult = await userRegister({name, password})


      if(registerResult.code) {  // 后端没写好，出现错误这里才返回code
        return [registerResult.message, false] as [string, boolean];  // 返回注册账号的问题信息
      } else {  // 注册成功后直接登录
        return [registerResult.message, true] as [string, boolean];
      }
    }
  }
})

export default useLoginStore