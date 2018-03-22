import { BUYER_USER_TYPE, SUPPLIER_USER_TYPE, CARRIER_USER_TYPE } from './user'
import { orderApi } from '../urls'

export const UPDATE_TRACKER_STEP = 'UPDATE_TRACKER_STEP'
export const SET_ACCOUNT_TYPE = 'SET_ACCOUNT_TYPE'
export const SET_ACCOUNT_ID = 'SET_ACCOUNT_ID'
export const SET_API_FILTERS = 'SET_API_FILTERS'

const state = {
  currentTrackerStep: 0,
  orderApiParams: {},
  accountType: ''
}

const mutations = {
  [UPDATE_TRACKER_STEP](state, payload) {
    state.currentTrackerStep = payload
  },
  [SET_API_FILTERS](state, { userAccountType, userId }) {
    let resourceString = ''
    let paramName = ''
    switch (userAccountType) {
      case BUYER_USER_TYPE:
        resourceString = 'resource:com.jda.models.Buyer#'
        state.accountType = BUYER_USER_TYPE
        paramName = 'buyer'
        break
      case SUPPLIER_USER_TYPE:
        resourceString = 'resource:com.jda.models.Supplier#'
        state.accountType = SUPPLIER_USER_TYPE
        paramName = 'supplier'
        break
      case CARRIER_USER_TYPE:
        resourceString = 'resource:com.jda.models.Carrier#'
        state.accountType = CARRIER_USER_TYPE 
        paramName = 'carrier'
        break
    }
    if (resourceString != '') {
      let paramValue = resourceString.concat(userId)
      state.orderApiParams = {
        [paramName]: paramValue
      }
    }
  }
}

export default {
  state,
  mutations
}
