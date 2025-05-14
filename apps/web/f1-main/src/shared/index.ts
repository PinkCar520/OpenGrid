// interface SharedProps {
//   registerLocale: (
//     appName: string,
//     lang: string, 
//     config: Record<string, any>
//   ) => void;
//   getLocale: (lang: string) => Record<string, any>;
//   getCurrentLang: () => string;
// }

// declare global {
//   interface Window {
//     $root?: SharedProps;
//   }
// }

// import { localeManager } from './locale'

// export const shared: SharedProps = {
//   registerLocale: (appName: string, lang: string, config: Record<string, any>) => {
//     localeManager.registerLocale(appName, lang, config)
//   },
//   getLocale: (lang: string) => {
//     return localeManager.getLocale(lang)
//   },
//   getCurrentLang: () => {
//     return localeManager.getCurrentLang()
//   }
// }