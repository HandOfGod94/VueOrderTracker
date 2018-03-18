import axios from 'axios'
import {
  SET_INTEGRATION_DETAIL,
  SET_INTEGRATION_DETAILS_LIST
} from '../actions/integrationDetail'
import { integrationDetailApi } from '../urls'

const state = {
  integrationDetail: {
    $class: 'com.jda.models.IntegrationDetails',
    DocumentId: '',
    OperationName: '',
    Direction: '',
    orderAction: '',
    sourceComp: {
      $class: 'com.jda.models.Component',
      ComponentId: '',
      ComponentVer: '',
      ComponentName: '',
      id: ''
    },
    destComp: {
      $class: 'com.jda.models.Component',
      ComponentId: '',
      ComponentVer: '',
      ComponentName: '',
      id: ''
    },
    Side: '',
    Status: ''
  },
  integrationDetails: []
}

const getters = {
  getIntegrationDetail() {
    return state.integrationDetail
  },
  getIntegrationDetailsList() {
    return state.integrationDetails
  }
}

const mutations = {
  [SET_INTEGRATION_DETAIL](state, payload) {
    Object.assign(state.integrationDetail, payload)
  },
  [SET_INTEGRATION_DETAILS_LIST](state, payload) {
    state.integrationDetails = payload
  }
}

const actions = {
  fetchIntegrationDetailById({ commit }, id) {
    return axios.get(`${integrationDetailApi}/${id}`).then(res => {
      commit(SET_INTEGRATION_DETAIL, res.data)
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
