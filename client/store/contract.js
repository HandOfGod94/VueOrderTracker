import { contractApi } from '../urls'
import axios from 'axios'
import { stripResourceName } from '../fitlers'
import { CARRIER_USER_TYPE } from './user'

export const SET_CONTRACT = 'SET_CONTRACT'
export const SET_CONTRACTS_LIST = 'SET_CONTRACTS_LIST'

const state = {
  contract: {
    $class: 'com.jda.models.Contract',
    contractId: '',
    createDateTime: '',
    lastUpdatedDateTime: '',
    supplier: {},
    carrier: {},
    shipMode: ''
  },
  contracts: []
}

const getters = {
  getContract() {
    return state.contract
  },

  getContracts() {
    return state.contracts
  }
}

const mutations = {
  [SET_CONTRACT](state, payload) {
    state.contract = payload
  },
  [SET_CONTRACTS_LIST](state, payload) {
    state.contracts = payload
  }
}

const actions = {
  fetchContractById({ dispatch, commit }, id) {
    let url = `${contractApi}/${id}`
    return axios.get(url).then(res => {
      commit(SET_CONTRACT, res.data)
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
