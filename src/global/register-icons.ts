import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


function registerIcons(app: App<Element>){
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)  // 注册全局组件
  }
}

export default registerIcons