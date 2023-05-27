import type { RouteRecordRaw } from 'vue-router'

const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  }, {
    path: '/error',
    name: 'error',
    component: () => import('@/pages/error/index.vue'),
  },
  {
    path: '/redirect/:path(.*)',
    component: () => import('@/pages/redirect/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/pages/error/index.vue'),
  },
]

export default staticRoutes
