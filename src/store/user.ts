import type { RouteRecordRaw } from 'vue-router'
import { generateMenu } from './../routes/generate-menu'
import { flatRoutes, generateRoute } from './../routes/generate-route'
import { dynamicRoutes, rootRouter } from '@/routes/dynamic-routes'
import { userGetInfoApi, userLoginApi } from '@/api/user'
import type { UserAccountLoginParams, UserInfo, UserMobileLoginParams } from '@/api/user'
import { useAuthorization } from '@/compsables/authorization'
import { useGlobalConfig } from '@/compsables/global-config'
import i18n from '@/locales'
import router from '@/routes'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>()
  const token = useAuthorization()
  const { message } = useGlobalConfig()
  const { t } = i18n.global

  const routerRecords = ref<RouteRecordRaw[]>()
  // 为非空断言，因为在 generateRoute 中已经判断过了
  const menusData = computed(() => generateMenu(routerRecords.value!))

  const setUserInfo = (info: UserInfo | undefined) => {
    userInfo.value = info
  }
  const setToken = (key: string | null) => {
    token.value = key
  }

  const login = async (params: UserAccountLoginParams | UserMobileLoginParams) => {
    try {
      const { data } = await userLoginApi(params)
      if (data?.token)
        setToken(data.token)
    }
    catch (error) {
      console.error(`请求登录错误：${error}`)
    }
  }

  const getUserInfo = async () => {
    const { data } = await userGetInfoApi()
    if (data)
      setUserInfo(data)
  }

  const logout = async () => {
    setToken('')
    setUserInfo(undefined)
    message?.success(t('global.layout.header.right.logout.success'))
    await router.replace({
      path: '/login',
      query: {
        redirect: router.currentRoute.value.path,
      },
    })
  }

  const generateRoutes = async () => {
    const flatRouteData = flatRoutes(dynamicRoutes)
    const currentRouter = {
      ...rootRouter,
      children: [flatRouteData],
    }
    routerRecords.value = dynamicRoutes
    return currentRouter
  }

  const generateDynamicRoutes = async () => {
    const routerData = await generateRoute()
    if (routerData) {
      routerRecords.value = routerData.children
      const flatRouteData = flatRoutes(routerData.children)
      routerData.children = [flatRouteData]
    }

    return routerData
  }

  return {
    userInfo,
    token,
    routerRecords,
    menusData,
    setUserInfo,
    login,
    getUserInfo,
    logout,
    generateRoutes,
    generateDynamicRoutes,
  }
})
