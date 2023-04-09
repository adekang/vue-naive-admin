import { darkTheme } from 'naive-ui'
import { useLayoutTheme } from '@/compsables/layout-theme'
import type { LayoutTheme, LayoutType } from '@/config/layout-theme'
import { layoutThemeConfig } from '@/config/layout-theme'

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
      updateLayoutStyle('light')
    }
    return list
  })

  const layoutTheme = computed(() => {
    if (layout.layoutStyle === 'dark')
      return darkTheme

    return undefined
  })

  return {
    layout,
    layoutList,
    layoutStyleList,
    visible,
    layoutTheme,
    updateLayout,
    updateLayoutStyle,
    toggleVisible,
    toggleCollapsed,
  }
})
