import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home-view.vue'
import CDGridView from '../views/cd-grid-view.vue'
import CdPropsView from '../views/cd-props-view.vue'
import CDTabsView from '../views/cd-tabs-view.vue'
import CDListView from '../views/cd-list-view.vue'
import CDPropsGridView from '../views/cd-props-grid-view.vue'
import CDFormView from '../views/cd-form-view.vue'

import CDMonthView from '../views/cd-month-view.vue'

import CDListFilterView from '../views/cd-list-filter-view.vue'
import CDFormModelView from '../views/cd-form-model-view.vue'
import CDPropEditorView from '../views/cd-prop-editor-view.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cd-form',
    name: 'cd-form',
    component: CDFormView
  },
  {
    path: '/cd-grid',
    name: 'cd-grid',
    component: CDGridView
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
  },
  {
    path: '/cd-props-grid',
    name: 'cd-props-grid',
    component: CDPropsGridView
  },
  {
    path: '/cd-tabs',
    name: 'tabs',
    component: CDTabsView
  },
  {
    path: '/cd-month',
    name: 'cd-month',
    component: CDMonthView
  },
  {
    path: '/cd-list-filter',
    name: 'cd-list-filter',
    component: CDListFilterView
  },
  {
    path: '/cd-form-model',
    name: 'cd-form-v-model',
    component: CDFormModelView
  },
  {
    path: '/cd-prop-editor',
    name: 'cd-prop-editor',
    component: CDPropEditorView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
