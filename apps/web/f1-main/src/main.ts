// import './assets/main.css'
import './styles/index.scss'
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import i18n from './locales/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {router} from '@/router'
// import { shared } from './shared'

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia();

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router);
app.use(i18n);

// 挂载共享实例到window对象
// window.$root = shared
(window as any).parentRouter = router;
console.log(window,'window')
app.mount('#app')




