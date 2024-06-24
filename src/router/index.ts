import { createRouter, createWebHashHistory } from 'vue-router'

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
      // 未被匹配的路由
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ]
})

export default router
