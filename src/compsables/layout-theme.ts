import { layoutThemeConfig } from '@/config/layout-theme'

// 持久化保存
export const useLayoutTheme = createGlobalState(() =>
  useStorage('layout-theme', layoutThemeConfig)
)
