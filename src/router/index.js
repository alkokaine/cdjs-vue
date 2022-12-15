import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home-view.vue'
import CDListView from '../views/cd-list-view.vue'
import CDMenuView from '../views/cd-menu-view.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cd-list',
    name: 'cd-list',
    component: CDListView
  },
  {
    path: '/cd-menu',
    name: 'cd-menu',
    component: CDMenuView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
