import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home-view.vue'
import CDTabsView from '../views/cd-tabs-view.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cd-tabs',
    name: 'tabs',
    component: CDTabsView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
