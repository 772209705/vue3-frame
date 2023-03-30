// Vue 3.x
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import axiosApi from './api/axios'
import store from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import filters from './utils/filters'
import directives from './utils/directives'
import components  from './components/app'

// Vue 3.x 
const app = createApp(App)

// 全局的过滤器注册到 Vue 3 应用实例中，使得这些过滤器可以在整个应用范围内使用。
Object.keys(filters).forEach(key => {
  app.config.globalProperties.$filters[key] = filters[key]
})
// 将全局的指令注册到 Vue 3 应用实例中，使得这些指令可以在整个应用范围内使用。
Object.keys(directives).forEach(key => {
  app.directive(key, directives[key])
})
// 将全局的组件注册到 Vue 3 应用实例中，使得这些组件可以在整个应用范围内使用。
Object.keys(components).forEach(key => {
  app.component(key, components[key])
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(axiosApi)
app.use(ElementPlus)
app.use(router)
app.use(store);
app.mount('#app')
