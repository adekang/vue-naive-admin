import { usePost } from '@/utils/request'
import type { IncludeNull } from '@/utils/types'

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

const userApi = {
  userLoginUrl: '/user/login',
  userSendCodeUrl: '/user/send-code',
}
//  Pick提取类型
export type UserSendCodeParams = Pick<UserMobileLoginParams, 'mobile'>

export interface UserAccountLoginParams {
  username: IncludeNull<string>
  password: IncludeNull<string>
  captcha?: IncludeNull<string>
  rememberMe?: IncludeNull<boolean>
}

export interface UserMobileLoginParams {
  mobile: IncludeNull<string>
  code: IncludeNull<string>
  rememberMe?: IncludeNull<boolean>
  type: 'mobile'
}

export interface UserLoginResult {
  token: string
}

export const userLoginApi = (params: UserAccountLoginParams | UserMobileLoginParams) => {
  return usePost<UserMobileLoginParams | UserAccountLoginParams, UserLoginResult>(userApi.userLoginUrl, params)
}

export const userSendCodeApi = (params: UserSendCodeParams) => {
  return usePost<UserSendCodeParams, any>(userApi.userSendCodeUrl, params)
}
