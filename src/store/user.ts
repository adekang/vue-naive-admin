import { userGetInfoApi, userLoginApi } from '@/api/user'
import type { UserAccountLoginParams, UserInfo, UserMobileLoginParams } from '@/api/user'
import { useAuthorization } from '@/compsables/authorization'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>()
  const token = useAuthorization()
  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
  }
  const setToken = (key: string) => {
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
  return {
    userInfo,
    token,
    setUserInfo,
    login,
    getUserInfo,
  }
})
