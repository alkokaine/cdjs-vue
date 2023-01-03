import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home-view.vue'
import CdPropsView from '../views/cd-props-view.vue'
import CDListView from '../views/cd-list-view.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cd-props',
    name: 'props',
    component: CdPropsView
  },
  {
    path: '/cd-list',
    name: 'cd-list',
    component: CDListView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
