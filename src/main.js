import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import ruLocale from 'element-ui/lib/locale/lang/ru-RU'
import router from './router'
Vue.use(Element, { locale: ruLocale })
Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/index.css';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
