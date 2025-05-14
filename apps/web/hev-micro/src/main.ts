import './styles/index.scss'

import render from './hooks/index';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

renderWithQiankun({
  bootstrap() {
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