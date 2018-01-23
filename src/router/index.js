import Vue from 'vue'
import Router from 'vue-router'

import Singer from 'components/singer/singer'

import Recommend from 'components/recommend/recommend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer
    }
  ]
})
