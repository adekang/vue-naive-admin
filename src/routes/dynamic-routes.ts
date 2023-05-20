import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/layouts'

export const rootRouter: RouteRecordRaw = {
  path: '/',
  name: 'default-router',
  redirect: '/dashboard',
  component: Layout,
  children: [],
}
export const dynamicRoutes: RouteRecordRaw[] = [{
  path: '/',
  name: 'index',
  redirect: '/dashboard',
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/index.vue'),
      meta: {
        title: 'Home',
      },
    },
  ],
}]
