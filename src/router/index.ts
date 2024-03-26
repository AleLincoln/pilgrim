import { createRouter, createWebHistory } from 'vue-router'
import { RouteName, RoutePath } from '@/shared/types/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: RoutePath.NOW
    },
    {
      path: RoutePath.NOW,
      name: RouteName.NOW,
      component: () => import('../views/HomeView.vue')
    },
    {
      path: RoutePath.MAP,
      name: RouteName.MAP,
      component: () => import('../views/Map.vue')
    },
    {
      path: RoutePath.SUGGESTIONS,
      name: RouteName.SUGGESTIONS,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Suggestions.vue')
    }
  ]
})

export default router
