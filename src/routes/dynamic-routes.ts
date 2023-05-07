import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/layouts'

export const rootRouter: RouteRecordRaw = {
  path: '/',
  name: 'default-router',
  redirect: '/home',
  component: Layout,
  children: [],
}
export const dynamicRoutes: RouteRecordRaw[] = [{
  path: '/',
  name: 'index',
  redirect: '/home',
  children: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/index.vue'),
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/workspace',
      name: 'Workspace',
      component: () => import('@/pages/workspace/index.vue'),
    },
  ],
}]
