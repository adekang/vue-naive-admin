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

  const themeList = computed<ThemeType[]>(() => {
    const list: ThemeType[] = []
    const myColors = isDark.value ? darkColors : colors
    for (const colorsKey in myColors) {
      const value = myColors[colorsKey]
      list.push({
        color: value.common?.primaryColor as string,
        key: colorsKey,
        title: `global.layout.setting.drawer.theme.${colorsKey}`,
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
  const layoutList = computed<LayoutType[]>(() => {
    return [{
      id: 'side',
      key: 'side',
      title: 'global.layout.setting.drawer.layout.side',
    }, {
      id: 'top',

      key: 'top',
      title: 'global.layout.setting.drawer.layout.top',
    }, {
      id: 'mix',
      key: 'mix',
      title: 'global.layout.setting.drawer.layout.mix',
    }]
  })

  const layoutStyleList = computed<LayoutType[]>(() => {
    const list: LayoutType[] = [
      {
        id: 'light',
        key: 'side',
        title: 'global.layout.setting.drawer.style.light',
      },
    ]

    if (layout.layout !== 'mix') {
      list.push({
        id: 'inverted',
        key: 'side',
        inverted: true,
        title: 'global.layout.setting.drawer.style.inverted',
      })
    }
    else {
      if (layout.layoutStyle !== 'dark')
        updateLayoutStyle('light')
    }
    list.push({
      id: 'dark',
      key: 'side',
      title: 'global.layout.setting.drawer.style.dark',
      dark: true,
    })
    return list
  })
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
