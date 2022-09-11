import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import ruLocale from 'element-ui/lib/locale/lang/ru-RU'
import router from './router'
Vue.use(Element, { locale: ruLocale })
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
