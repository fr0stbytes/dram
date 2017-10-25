import * as firebase from 'firebase'

// Initial state
const state = {
  loadedUsers: []
}

const getters = {
  loadedUsers (state) {
    return state.loadedUsers
  }
}

const actions = {
  loadUsers ({commit}) {
    firebase.database().ref('users').once('value')
      .then((data) => {
        const users = []
        const obj = data.val()
        for (let key in obj) {
          users.push({
            id: key,
            username: obj[key].username,
            email: obj[key].email,
            role: obj[key].role
          })
        }
        commit('setLoadedUsers', users)
        console.log(users)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  userChangeRole ({commit}, payload) {
    const newrole = {
      role: payload.role
    }
    const key = payload.id
    // console.log(status, key)
    return firebase.database().ref('/users').child(key).update(newrole)
    .then(() => {
      commit('userChangeRole', payload)
    })
  }
}

const mutations = {
  setLoadedUsers (state, payload) {
    state.loadedUsers = payload
  },
  userChangeRole (state, payload) {
    const user = state.loadedUsers.find(user => {
      return user.id === payload.id
    })
    if (user.role) {
      user.role = payload.role
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
