import axios from 'axios'
import {
  BUYER_USER_TYPE,
  SUPPLIER_USER_TYPE,
  CARRIER_USER_TYPE,
  SET_USER,
  SET_USERS_LIST
} from '../actions/user'
import { buyerApi, supplierApi } from '../urls'

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
      url = ''
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
    Object.assign(state.user, payload)
  },
  [SET_USERS_LIST](state, payload) {
    state.users = payload
  }
}

const actions = {
  fetchUserByIdAndType({ commit }, { userId, userType }) {
    let url = getApiUrl(userType)
    url = `${url}/${userId.toUpperCase()}` //TODO: Figure out why it requires uppercase
    axios.get(url).then(res => commit(SET_USER, res.data))
  },
  fetchUsersByType({ commit }, userType) {
    let url = getApiUrl(userType)
    axios.get(url).then(res => commit(SET_USERS_LIST, res.data))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
