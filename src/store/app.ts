import { isDark, toggleDark } from '@/compsables/auto-dark'
import { useLayoutTheme } from '@/compsables/layout-theme'
import { darkTheme } from '@/config/app-theme'
import type { LayoutTheme, LayoutType } from '@/config/layout-theme'
import { layoutThemeConfig } from '@/config/layout-theme'
import type { ThemeType } from '@/config/theme'
import { colors, darkColors } from '@/config/theme'

export const useAppstore = defineStore('app', () => {
  const defaultTheme = import.meta.env.DEV ? layoutThemeConfig : useLayoutTheme()
  const layout = reactive(unref(defaultTheme))
  const visible = ref(false)
  const toggleVisible = (val: boolean) => {
    visible.value = val
  }
  const toggleCollapsed = (val: boolean) => {
    layout.collapsed = val
  }
  const layoutList = computed<LayoutType[]>(() => {
    return [{
      key: 'mix',
      title: 'Mix Menu Layout',
    },
    {
      key: 'side',
      title: 'Side Menu Layout',
    },
    {
      key: 'top',
      title: 'Top Menu Layout',
    }]
  })
  watch(() => layout.layoutStyle, () => {
    if (layout.layoutStyle === 'dark')
      toggleDark(true)
    else
      toggleDark(false)
  })
  const updateLayout = (val: LayoutType['key']) => {
    layout.layout = val
  }
  const updateLayoutStyle = (val: LayoutTheme['layoutStyle']) => {
    layout.layoutStyle = val
  }

  const layoutStyleList = computed<LayoutType[]>(() => {
    const list: LayoutType[] = [{
      id: 'light',
      key: 'side',
      title: '亮色风格',
    }]

    if (layout.layout !== 'mix') {
      list.push({
        id: 'inverted',
        key: 'side',
        inverted: true,
        title: '反转色风格',
      })
    }
    else {
      if (layout.layoutStyle !== 'dark')
        updateLayoutStyle('light')
    }
    list.push({
      id: 'dark',
      key: 'side',
      title: '暗色风格',
      dark: true,
    })
    return list
  })

  const themeList = computed<ThemeType[]>(() => {
    const list: ThemeType[] = []
    const myColors = isDark.value ? darkColors : colors
    for (const colorsKey in myColors) {
      const value = myColors[colorsKey]
      list.push({
        color: value.common?.primaryColor as string,
        key: colorsKey,
      })
    }
    return list
  })

  const layoutTheme = computed(() => {
    if (layout.layoutStyle === 'dark')
      return darkTheme

    return undefined
  })

  // 主题切换
  const overridesTheme = computed(() => {
    if (isDark.value)
      return darkColors[layout.theme]

    return colors[layout.theme]
  })
  const updateTheme = (val: string) => {
    layout.theme = val
  }

  return {
    layout,
    layoutList,
    layoutStyleList,
    themeList,
    visible,
    layoutTheme,
    overridesTheme,
    updateTheme,
    updateLayout,
    updateLayoutStyle,
    toggleVisible,
    toggleCollapsed,
  }
})
