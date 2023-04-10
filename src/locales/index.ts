import { createI18n } from 'vue-i18n'
import zhCN from '@/locales/lang/zh-CN'

export const defaultLocale = 'zh-CN'

const i18n = createI18n({
  // 是否启用传统模式，默认true，我们这里新项目我们不需要
  legacy: false,
  // 本地化语言获取失败的时候是否输出警告
  missingWarn: false,
  // 默认多语言
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {
    'zh-CN': zhCN,
  },

})

export const loadLanguageAsync = async (lang: string = defaultLocale) => {
  const current = i18n.global.locale.value
  try {
    if (current !== lang) {
      const messages = await import(`./lang/${lang}.ts`)
      i18n.global.setLocaleMessage(lang, messages.default)
    }
  }
  catch (e) {
    console.warn('load locale error:', e)
  }

  return nextTick()
}

export default i18n
