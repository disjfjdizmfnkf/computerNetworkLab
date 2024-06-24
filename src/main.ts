
// 重置样式
import '@/assets/css/index.less'
import 'normalize.css'

// 创建app实例，后续挂载到App.vue中的app上
import { createApp } from 'vue'
import App from './App.vue'

// vue全家桶
import pinia from '@/stores'
import router from './router'


//elementPlus 全局引入样式(所有样式全部引入) 全局引入icon
import registerIcons from '@/global/register-icons'
import 'element-plus/dist/index.css'


const app = createApp(App)

app.use(registerIcons)
app.use(pinia)
app.use(router)
app.mount('#app')
