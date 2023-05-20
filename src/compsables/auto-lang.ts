import { defaultLocale, loadLanguageAsync } from '@/locales'
import { useAppstore } from '@/store/app'

export const useAppLocale = createGlobalState(() => useStorage('locale', defaultLocale))

export const useAutoLang = () => {
  const appLocale = useAppLocale()
  const {
    locale,
    getLocaleMessage,
    t,
  } = useI18n()

  const route = useRoute()
  const appStore = useAppstore()
  const {
    isSupported,
    language,
  } = useNavigatorLanguage()
  const setLanguage = async (lang: string) => {
    try {
      await loadLanguageAsync(lang)
      appLocale.value = lang
      locale.value = lang
      const title = route.meta.title
      if (title) {
        const localeTitle = t(title)
        document.title = `${localeTitle} - ${appStore.layout.title}`
      }
    }
    catch (e) {
      throw new Error(`Failed to load language: ${lang}`)
    }
  }
  if (isSupported.value) {
    if (language.value !== defaultLocale)
      setLanguage(language.value!).then(() => {})

    watch(language, (lang) => {
      setLanguage(lang!).then(() => {})
    })

    watch(appLocale, (lang) => {
      if (lang && lang !== locale.value)
        setLanguage(lang).then(() => {})
    })
  }
  setLanguage(appLocale.value).then(() => {})
  const naiveLocale = computed(() => getLocaleMessage(appLocale.value).naiveUI || {})
  return { naiveLocale }
}
