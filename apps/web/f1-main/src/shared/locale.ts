// // import { merge } from 'lodash-es'

// interface LocaleConfig {
//   [key: string]: Record<string, any>
// }

// class LocaleManager {
//   private configs: Map<string, LocaleConfig> = new Map()
//   private currentLang: string = 'zh'

//   registerLocale(appName: string, lang: string, config: Record<string, any>) {
//     const appConfigs = this.configs.get(appName) || {}
//     appConfigs[lang] = config
//     this.configs.set(appName, appConfigs)
//   }

//   getLocale(lang: string): Record<string, any> {
//     const allConfigs: Record<string, any>[] = []
//     this.configs.forEach((appConfigs) => {
//       if (appConfigs[lang]) {
//         allConfigs.push(appConfigs[lang])
//       }
//     })
//     return merge({}, ...allConfigs)
//   }

//   setCurrentLang(lang: string) {
//     this.currentLang = lang
//   }

//   getCurrentLang(): string {
//     return this.currentLang
//   }
// }

// export const localeManager = new LocaleManager()