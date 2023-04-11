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

export const userLoginUrl = '/user/login'

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
  return usePost<UserMobileLoginParams | UserAccountLoginParams, UserLoginResult>(userLoginUrl, params)
}
