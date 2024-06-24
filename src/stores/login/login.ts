import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenuById } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'


interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}


const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
  }),

  actions: {
    // 账号登录发送吗网络请求 网络请求 -> 缓存token -> 获取用户信息 ->  进入主界面
    async LoginAccountAction(account: IAccount){
      // 1.调用网络请求函数 store func -> service func -> hyRequest(封装后的axios的一个实例) -> axios的一个方法
      const loginResult =  await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token

      // 2.对token进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3.获取登录用户的详情信息
      const userInfoResult =  await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 4.获取用户的菜单
      const userMenusResult = await getUserMenuById(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userInfo = userInfo

      // 5.进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 验证身份信息之后进入主界面
      await router.push('/main')
    }
  }
})

export default useLoginStore