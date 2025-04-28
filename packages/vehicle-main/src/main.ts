// import './assets/main.css'
import './styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import i18n from './locales/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



import App from './App.vue'
import router from './router'

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

app.mount('#app')









