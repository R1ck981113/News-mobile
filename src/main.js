import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 自动设置 rem 基准值
import 'amfe-flexible'
// 导入 vant 组件
import Vant from 'vant'
import 'vant/lib/index.css'
// 全局样式组件
import './styles/index.less'
// 将 api 唯一入口文件导入 挂载到原型
import axios from './api/api'
import './utils/dayjs'
Vue.prototype.$api = axios
// 导入 vant 所有组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
