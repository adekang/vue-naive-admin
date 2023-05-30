import type { MenuInfo } from '@/api/user'
import { useGet } from '@/utils/request'

export const menuApi = {
  systemMenuUrl: '/menu'
}

export interface CommonProTableParams {
  page?: number
  pageSize?: number
}

// Partial<MenuInfo>则是将MenuInfo接口中的所有属性都设为可选属性。 ?:表示可选属性
export type SystemMenuParams = Partial<MenuInfo> & CommonProTableParams

export interface SystemMenuResult {
  data: MenuInfo[]
  total: number
}

export const systemMenuApi = (params?: SystemMenuParams) => {
  return useGet<SystemMenuParams, SystemMenuResult>(
    menuApi.systemMenuUrl,
    params
  )
}
