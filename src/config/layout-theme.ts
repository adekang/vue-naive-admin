import logo from '@/assets/vue.svg'

export interface LayoutTheme {
  title?: string
  layout: 'mix' | 'side' | 'top'
  headerHeight: number
  logo?: string
}

export const layoutThemeConfig: LayoutTheme = {
  title: 'naive admin',
  layout: 'mix',
  headerHeight: 48,
  logo,
}
