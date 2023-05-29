import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'
import router from '@/routes'
import { useGlobalConfig } from '@/compsables/global-config'
import i18n from '@/locales'
import {
  STORAGE_AUTHORIZATION_KEY,
  useAuthorization
} from '@/compsables/authorization'

const instance = axios.create({
  baseURL:
    import.meta.env.VITE_APP_BASE_API ??
    import.meta.env.VITE_APP_BASE_URL ??
    '/',
  timeout: 50000
})
// 请求拦截器
const requestHandler = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const token = useAuthorization()
  /**
   * 判断是否存在token，如果存在的话，则每个http header都加上token
   */
  if (token.value) config.headers.set(STORAGE_AUTHORIZATION_KEY, token.value)

  return config
}

// 响应拦截器
export interface ResponseBody<T = any> {
  code: number
  data?: T
  msg: string
}

const responseHandler = (
  response: AxiosResponse
): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any => {
  return response.data
}
const errorHandler = (error: AxiosError): Promise<any> => {
  const { notification } = useGlobalConfig()
  const token = useAuthorization()
  // 判断是否存在response
  if (error.response) {
    const { data, status, statusText } = error.response as AxiosResponse<any>
    if (status === 401) {
      // 重新登录
      notification?.error({
        title: i18n.global.t('global.request.error.401'),
        content: data?.msg || statusText,
        duration: 3000
      })
      token.value = null

      router
        .replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.value.path
          }
        })
        .then(() => {})
    } else if (status === 403) {
      //
      notification?.error({
        title: i18n.global.t('global.request.error.403'),
        content: data?.msg || statusText,
        duration: 3000
      })
    } else if (status === 500) {
      notification?.error({
        title: i18n.global.t('global.request.error.500'),
        content: data?.msg || statusText,
        duration: 3000
      })
    } else {
      notification?.error({
        title: i18n.global.t('global.request.error.other'),
        content: data?.msg || statusText,
        duration: 3000
      })
    }
  }
  return Promise.reject(error)
}

instance.interceptors.request.use(requestHandler)
instance.interceptors.response.use(responseHandler, errorHandler)
export default instance

export const useGet = <P = any, R = any>(
  url: string,
  params?: P,
  config?: AxiosRequestConfig
): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    method: 'GET',
    params,
    ...config
  })
}

//  p传入数据类型, R响应数据类型
export const usePost = <P = any, R = any>(
  url: string,
  data?: P,
  config?: AxiosRequestConfig
): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    method: 'POST',
    data,
    ...config
  })
}

export const usePut = <P = any, R = any>(
  url: string,
  data?: P,
  config?: AxiosRequestConfig
): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    method: 'PUT',
    data,
    ...config
  })
}

export const useDelete = <P = any, R = any>(
  url: string,
  data?: P,
  config?: AxiosRequestConfig
): Promise<ResponseBody<R>> => {
  return instance.request({
    url,
    method: 'DELETE',
    data,
    ...config
  })
}
