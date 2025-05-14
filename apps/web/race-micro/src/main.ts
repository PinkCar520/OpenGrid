import './styles/index.scss'


import { getShared } from './utils/shared'
import zhLocale from './locales/zh'
import enLocale from './locales/en'

const APP_NAME = 'race-app'

import render from './hooks/index';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

renderWithQiankun({
  bootstrap() {
  // 注册多语言配置
  try {
    const shared = getShared()
    shared.registerLocale(APP_NAME, 'zh', zhLocale)
    shared.registerLocale(APP_NAME, 'en', enLocale)
    console.log(shared.getCurrentLang(), 'shared')
  } catch (error) {
    console.error('注册国际化配置失败:', error)
  }
    console.log('bootstraped__microApp');
  },
  mount(props) {
    render.mount(props);
    console.log('mount__microApp', props);
  },
  unmount(props) {
    render.unmount(props);
    console.log('unmount__microApp', props);
  },
  update(props) {
    render.update(props);
    console.log('update props', props);
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render.mount({});
}