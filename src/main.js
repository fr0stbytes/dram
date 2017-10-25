// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import * as firebase from 'firebase'
import store from './store'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyA8xjB8SON7bsK7Li_8iWqRSz0td0Ly0Xs',
      authDomain: 'drinks-crm.firebaseapp.com',
      databaseURL: 'https://drinks-crm.firebaseio.com',
      projectId: 'drinks-crm',
      storageBucket: 'drinks-crm.appspot.com',
      messagingSenderId: '807751568550'
    })
    this.$store.dispatch('loadSuppliers')
  }
})
