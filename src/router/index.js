import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Login from '@/components/login'
import Dashboard from '@/components/dashboard'
import Empty from '@/components/empty'
import Distilleries from '@/components/suppliers/distilleries'
import Users from '@/components/users'
import Overview from '@/components/overview'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Empty,
      children: [
        {
          path: '/',
          component: Dashboard,
          children: [
            {
              path: '/',
              component: Overview
            },
            {
              path: '/suppliers',
              component: Distilleries
            },
            {
              path: '/users',
              component: Users
            }
          ]
        },
        {
          path: 'login',
          component: Login
        }
      ]
    }
  ]
})
