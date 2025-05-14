import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const defaultLocale = localStorage.getItem('language') || 'zh-CN'

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zh,
    'en-US': en
  }
})

export default i18n
