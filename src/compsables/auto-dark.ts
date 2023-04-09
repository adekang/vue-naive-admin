import { useAppstore } from '@/store/app'

export const isDark = useDark()
const toggleDark = useToggle(isDark)
export const useAutoDark = () => {
  const isPrefersDark = usePreferredDark()
  const appStore = useAppstore()
  watch(isPrefersDark, (isDark) => {
    if (isDark)
      appStore.updateLayoutStyle('dark')
    else
      appStore.updateLayoutStyle('light')

    toggleDark(isDark)
  }, { immediate: true })
}
