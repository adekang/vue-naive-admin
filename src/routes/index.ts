import { createRouter, createWebHistory } from 'vue-router'
import staticRoutes from '@/routes/static-routes'

const router = createRouter({
  routes: [...staticRoutes, {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  }],
  history: createWebHistory(import.meta.env.VITE_APP_BASE ?? '/'),
})

export default router
