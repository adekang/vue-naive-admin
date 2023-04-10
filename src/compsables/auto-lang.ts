import { defaultLocale, loadLanguageAsync } from '@/locales'

export const useAppLocale = createGlobalState(() => useStorage('locale', defaultLocale))

export const useAutoLang = () => {
  const appLocale = useAppLocale()
  const {
    locale,
    getLocaleMessage,
  } = useI18n()
  const {
    isSupported,
    language,
  } = useNavigatorLanguage()
  const setLanguage = async (lang: string) => {
    try {
      await loadLanguageAsync(lang)
      appLocale.value = lang
      locale.value = lang
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
  const naiveLocale = computed(() => getLocaleMessage(appLocale.value).naiveUI || {})
  return { naiveLocale }
}
