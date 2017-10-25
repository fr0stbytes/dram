import * as firebase from 'firebase'

// Initial state
const state = {
  loadedSuppliers: [],
  loading: false,
  message: '',
  messageType: ''
}

// Getters
const getters = {
  loadedSuppliers (state) {
    return state.loadedSuppliers
  },
  getLoading (state) {
    return state.loading
  },
  getMessage (state) {
    return state.message
  },
  getMessageType (state) {
    return state.messageType
  },
  loadedSupplier (state) {
    return (supplierID) => {
      return state.loadedSuppliers.find((supplier) => {
        return supplier.id === supplierID
      })
    }
  }
}

// actions
const actions = {
  createSupplier ({commit}, payload) {
    const supplier = {
      title: payload.title,
      email: payload.email,
      address: payload.address,
      city: payload.city,
      country: payload.country,
      phone: payload.phone,
      website: payload.website,
      contactPerson: payload.contactPerson,
      notes: payload.notes,
      status: payload.status,
      productType: payload.productType
    }
    commit('changeLoading')
    firebase.database().ref('suppliers').push(supplier)
    .then((data) => {
      const key = data.key
      commit('createSupplier', {
        ...supplier,
        id: key
      })
      commit('changeLoading')
      commit('changeMessage')
    })
  },
  // View Suppliers from DB
  loadSuppliers ({commit}) {
    firebase.database().ref('suppliers').once('value')
      .then((data) => {
        const suppliers = []
        const obj = data.val()
        for (let key in obj) {
          suppliers.push({
            id: key,
            title: obj[key].title,
            email: obj[key].email,
            address: obj[key].address,
            city: obj[key].city,
            country: obj[key].country,
            phone: obj[key].phone,
            website: obj[key].website,
            contactPerson: obj[key].contactPerson,
            notes: obj[key].notes,
            status: obj[key].status,
            productType: obj[key].productType
          })
        }
        commit('setLoadedSuppliers', suppliers)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// Mutations
const mutations = {
  createSupplier (state, payload) {
    state.loadedSuppliers.push(payload)
  },
  changeLoading (state) {
    state.loading = !state.loading
  },
  changeMessage (state) {
    state.message = 'Ο προμηθευτής καταχωρήθηκε με επιτυχία'
    state.messageType = 'success'
  },
  setLoadedSuppliers (state, payload) {
    state.loadedSuppliers = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
