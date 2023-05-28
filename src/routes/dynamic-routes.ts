import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/layouts'

export const ROOT_ROUT_REDIRECT_PATH = '/dashboard'

export const rootRouter: RouteRecordRaw = {
  path: '/',
  name: 'default-router',
  redirect: ROOT_ROUT_REDIRECT_PATH,
  component: Layout,
  children: [],
}
export const dynamicRoutes: RouteRecordRaw[] = [{
  path: '/',
  name: 'index',
  redirect: ROOT_ROUT_REDIRECT_PATH,
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
