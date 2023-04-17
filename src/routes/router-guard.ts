import { AxiosError } from 'axios'
import { useGlobalConfig } from '@/compsables/global-config'
import { useAuthorization } from '@/compsables/authorization'
import router from '@/routes'
import { useUserStore } from '@/store/user'
import { useAppstore } from '@/store/app'
export const loginRoute = '/login'

// 白名单
export const allowRoutes = ['/404', '/401', '/500', '/403', '/error']

//
export const hasLoginAllowRoutes = [...allowRoutes, loginRoute]
router.beforeEach(async (to, from, next) => {
  /**
   * 1. 判断项目中是否存在token
   * 2. 如果token不存在且当前的路由不是白名单中的路由，那么就跳转到登录页面
   * 3. 如果token存在，那么就需要判断用户信息是否存在
   * 4. 如果用户信息不存在，那么就需要获取用户信息
   */
  const token = useAuthorization()
  const userStore = useUserStore()
  const globalConfig = useGlobalConfig()
  globalConfig.loadingBar?.start()
  // 没有登陆
  if (!token.value) {
    // 如果不在白名单里面
    if (!hasLoginAllowRoutes.includes(to.path)) {
      next({
        path: loginRoute,
        query: {
          redirect: to.path,
        },
      })
      return
    }
  }
  else {
    // 如果用户信息不存在，那么就需要获取用户信息
    if (!userStore.userInfo && !allowRoutes.includes(to.path)) {
      try {
        await userStore.getUserInfo()
        // 判断当前页面是不是登录页面，如果是就跳转到首页
        if (to.path === loginRoute) {
          next({
            path: '/',
          })
          return
        }
      }
      catch (e) {
        if (e instanceof AxiosError && e?.response?.status === 401) {
          return
        }
        else {
          next({
            path: '/error',
            query: {
              redirect: to.path,
            },
          })
          return
        }
      }
    }
  }
  next()
})

router.afterEach((to) => {
  const globalConfig = useGlobalConfig()
  globalConfig.loadingBar?.finish()
  const appStore = useAppstore()
  const title = to.meta?.title
  if (title) { document.title = `${title} - ${appStore.layout.title}` }
  else {
    if (appStore.layout.title)
      document.title = appStore.layout.title
  }
})
