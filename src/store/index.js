import Vue from 'vue'
import Vuex from 'vuex'

import authentication from './modules/authentication'
import locations from './modules/locations'
import users from './modules/users'
import suppliers from './modules/suppliers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authentication,
    locations,
    users,
    suppliers
  }
})
