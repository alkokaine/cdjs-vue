import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home-view.vue'
import CDGridView from '../views/cd-grid-view.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cd-grid',
    name: 'cd-grid',
    component: CDGridView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
