import * as firebase from 'firebase'

// Initial state
const state = {
  loadedLocations: []
}

// Getters
const getters = {
  loadedLocations (state) {
    return state.loadedLocations
  }
}

// actions
const actions = {
  createLocation ({commit}, payload) {
    const location = {
      title: {en: payload.titleEn, gr: payload.titleGr},
      slug: {en: payload.slugEn, gr: payload.slugGr},
      status: payload.status
    }
    let imageUrl
    let key
    firebase.database().ref('locations').push(location)
      .then((data) => {
        key = data.key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('locations/thumbnail_img/' + key + ext).put(payload.image)
      })
      .then(fileData => {
        imageUrl = fileData.metadata.downloadURLs[0]
        return firebase.database().ref('locations').child(key).update({imageUrl: imageUrl})
      })
      .then(() => {
        commit('createLocation', {
          ...location,
          imageUrl: imageUrl,
          id: key
        })
      })
    .catch((error) => {
      console.log(error)
    })
  },
  // View locations from DB
  loadLocations ({commit}) {
    firebase.database().ref('locations').once('value')
      .then((data) => {
        const locations = []
        const obj = data.val()
        for (let key in obj) {
          locations.push({
            id: key,
            title: obj[key].title,
            slug: obj[key].slug,
            imageUrl: obj[key].imageUrl,
            status: obj[key].status
          })
        }
        commit('setLoadedLocations', locations)
        setTimeout(() => {
          commit('setLoading', false)
        }, 1500)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  statusToPublished ({commit}, payload) {
    const newstatus = {
      status: payload.status
    }
    const key = payload.id
    // console.log(status, key)
    return firebase.database().ref('/locations').child(key).update(newstatus)
    .then(() => {
      commit('statusToPublished', payload)
    })
  },
  statusToDraft ({commit}, payload) {
    const newstatus = {
      status: payload.status
    }
    const key = payload.id
    // console.log(status, key)
    return firebase.database().ref('/locations').child(key).update(newstatus)
    .then(() => {
      commit('statusToPublished', payload)
    })
  }
}

// Mutations
const mutations = {
  createLocation (state, payload) {
    state.loadedLocations.push(payload)
  },
  setLoadedLocations (state, payload) {
    state.loadedLocations = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  statusToPublished (state, payload) {
    const location = state.loadedLocations.find(location => {
      return location.id === payload.id
    })
    if (payload.status) {
      location.status = payload.status
    }
  },
  statusToDraft (state, payload) {
    const location = state.loadedLocations.find(location => {
      return location.id === payload.id
    })
    if (payload.status) {
      location.status = payload.status
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
