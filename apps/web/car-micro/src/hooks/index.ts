import routes from "../router";
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia';
import App from '../App.vue';
import i18n from '../locales';

interface RenderProps {
  container?: HTMLElement;
}

class Render {
  router: any;
  instance: any;

  constructor() {
    this.router = null;
  }

  render(props: RenderProps = {}) {
    const { container } = props;
    this.router = createRouter({
      history: createWebHashHistory(),
      routes,
    });
    
    this.instance = createApp(App);
    this.instance.use(this.router);
    this.instance.use(i18n);
    const pinia = createPinia();
    this.instance.use(pinia);

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      this.instance.component(key, component)
    }

    this.instance.mount(container ? container.querySelector('#app') : '#app');
  }

  async mount(props: any) {
    this.render(props);
  }

  async unmount(props: any) {
    if (this.instance && props) {
      this.instance.unmount();
      this.instance._container.innerHTML = '';
      this.instance = null;
      this.router = null;
    }
  }

  async update(props: any) {
    console.log('update props', props);
  }
}

const render = new Render();
export default render;
