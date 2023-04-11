import { usePost } from '@/utils/request'

export interface UserInfo {
  id: number
  username: string
  nickname?: string
  avatar?: string
  email?: string
  mobile?: string
  signature?: string
  gender?: number
  realName?: string
  birthday?: string
  money?: number
}

export const userLoginUrl = '/user/login'

export interface UserAccountLoginParams {
  username: string
  password: string
  captcha?: string
}

export interface UserMobileLoginParams {
  mobile: string | number
  code: string
  type: 'mobile'
}

export interface UserLoginResult {
  token: string
}

export const userLoginApi = (params: UserAccountLoginParams | UserMobileLoginParams) => {
  return usePost<UserMobileLoginParams | UserAccountLoginParams, UserLoginResult>(userLoginUrl, params)
}
