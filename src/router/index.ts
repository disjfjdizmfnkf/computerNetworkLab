import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: 'main',
    },
    {
      path: '/login',
      // 懒路由加载
      component: () => import('../views/login/login-page.vue'),
    },
    {
      path: '/main',
      component: () => import('../views/main/main.vue'),
    },
    {
      // 未被匹配的路由
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ]
})

// 拦截没有token访问main
router.beforeEach(to => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if( to.path === '/main' && !token ){
    return '/login'
  }
})

export default router
