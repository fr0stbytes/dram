import * as firebase from 'firebase'

// Initial state
const state = {
  user: '',
  message: ''
}

// getters
const getters = {
  getUser (state) {
    return state.user
  }
}

// Actions
const actions = {
  login ({commit}, payload) {
    return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then((data) => {
      const newUser = {
        id: data.key,
        email: data.email
      }
      // console.log(newUser)
      commit('setUser', newUser)
    })
  },
  logout ({commit}) {
    return firebase.auth().signOut()
    .then(() => {
      commit('logout')
    })
  }
}

// Mutations
const mutations = {
  setUser (state, payload) {
    state.user = payload
    // console.log(payload)
    state.loading = false
  },
  logout (state) {
    state.user = ''
    // state.message = 'Thanks for visiting. Come back anytime <i class="fa fa-heart" aria-hidden="true"></i>'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
