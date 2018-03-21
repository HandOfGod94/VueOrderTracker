import axios from 'axios'
import { buyerApi, supplierApi, carrierApi } from '../urls'

export const SET_USER = 'SET_USER'
export const SET_USERS_LIST = 'SET_USERS_LIST'

export const BUYER_USER_TYPE = 'BUYER_USER_TYPE'
export const SUPPLIER_USER_TYPE = 'SUPPLIER_USER_TYPE'
export const CARRIER_USER_TYPE = 'CARRIER_USER_TYPE'

/** utility funtions */
function getApiUrl(userType) {
  let url = ''
  switch (userType) {
    case BUYER_USER_TYPE:
      url = buyerApi
      break
    case SUPPLIER_USER_TYPE:
      url = supplierApi
      break
    case CARRIER_USER_TYPE:
      url = carrierApi
      break
    default:
      url = undefined
  }
  return url
}

/** vuex functions */
const state = {
  user: {
    $class: 'com.jda.models.Supplier',
    id: '',
    organizationName: '',
    contact: '',
    defaultEmail: '',
    address: {
      $class: 'com.jda.models.Address',
      city: '',
      country: '',
      street: '',
      zip: '',
      id: ''
    }
  },
  users: [],
  userType: ''
}

const getters = {
  getUser() {
    return state.user
  }
}

const mutations = {
  [SET_USER](state, payload) {
    state.user = payload
  },
  [SET_USERS_LIST](state, payload) {
    state.users = payload
  }
}

const actions = {
  fetchUserByIdAndType({ commit }, { userId, userType }) {
    if (userId) {
      let url = getApiUrl(userType)
      url = `${url}/${userId}` //TODO: Figure out why it requires uppercase
      return axios.get(url).then(res => {
        commit(SET_USER, res.data)
        return res
      })
    }
  },
  fetchUsersByType({ commit }, userType) {
    let url = getApiUrl(userType)
    return axios.get(url).then(res => {
      commit(SET_USERS_LIST, res.data)
      return res
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
