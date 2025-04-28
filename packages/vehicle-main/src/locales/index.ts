import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'
import elementEnlocale from 'element-plus/es/locale/lang/en'
import elementZhlocale from 'element-plus/es/locale/lang/zh-cn'

const messages = {
  en: {
    ...en,
    ...elementEnlocale
  },
  zh: {
    ...zh,
    ...elementZhlocale
    }
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages
})

export default i18n
