import logo from '@/assets/vue.svg'

export interface LayoutTheme {
  title?: string
  layout: 'mix' | 'side' | 'top'
  headerHeight: number
  logo?: string
  siderWidth: number // 侧边栏宽度
  siderCollapsedWidth: number // 侧边栏收起的宽度
  showSiderTrigger: boolean | 'bar' | 'arrow-circle' // 侧边栏默认的触发方式
  collapsed: boolean
}

export const layoutThemeConfig: LayoutTheme = {
  title: 'naive admin',
  layout: 'mix',
  headerHeight: 48,
  logo,
  siderWidth: 240,
  siderCollapsedWidth: 48,
  showSiderTrigger: 'bar',
  collapsed: false,
}
