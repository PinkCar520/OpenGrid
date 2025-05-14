// import { createI18n } from 'vue-i18n'
// import en from './en'
// import zh from './zh'

// const messages = {
//   en,
//   zh
// }

// const i18n = createI18n({
//   legacy: false,
//   locale: 'zh',
//   fallbackLocale: 'en',
//   messages
// })

// export default i18n
import { createI18n } from 'vue-i18n'

export function setupI18n(lang: string) {
  const messages = window.$root?.getLocale(lang) || {}
  
  const i18n = createI18n({
    locale: lang,
    messages: {
      [lang]: messages
    },
    legacy: false
  })

  return i18n
}
