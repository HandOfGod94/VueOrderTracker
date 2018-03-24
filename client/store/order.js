import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import { orderApi } from '../urls'
import { SUPPLIER_USER_TYPE, BUYER_USER_TYPE, CARRIER_USER_TYPE } from './user'
import { stripResourceName } from '../fitlers'

export const SET_ORDER = 'SET_ORDER'
export const SET_ORDER_LIST = 'SET_ORDER_LIST'
export const SET_SUPPPLIER_ORDER = 'SET_SUPPPLIER_ORDER'

export const STATUS_CREATED = 'Created'
export const STATUS_PLANNING = 'Planning'
export const STATUS_PLANNED = 'Planned'
export const STATUS_IN_TRANSIT = 'InTransit'
export const STATUS_ARRIVED = 'Arrived'
export const STATUS_CANCELED = 'Canceled'

const state = {
  order: {
    $class: 'com.jda.models.Order',
    orderNumber: '',
    createDateTime: '',
    lastUpdatedDateTime: '',
    supplierDescription: '',
    host: '',
    orderType: '',
    orderStatus: '',
    logistics: {
      $class: '',
      shipFrom: '',
      shipTo: '',
      requestedDeliveryDateRange: {
        $class: 'com.jda.models.RequestedDeliveryDateRange',
        beginDate: '',
        beginTime: '',
        endDate: '',
        endTimexzZaz: ''
      },
      requestedShipDateRange: {
        $class: 'com.jda.models.RequestedShipDateRange',
        beginDate: '',
        beginTime: '',
        endDate: '',
        endTimexzZaz: ''
      }
    },
    orderLineItem: [
      {
        $class: 'com.jda.models.OrderLineItem',
        lineItemNumber: '',
        orderLinePriority: '',
        requestedQuantity: '',
        transactionalTradeItem: {
          $class: 'com.jda.models.TransactionalTradeItem',
          ItemID: '',
          ExpirationDate: '',
          ItemDetails: '',
          transactionalItemData: {
            $class: 'com.jda.models.TransactionalItemData',
            itemWeight: '',
            measurementValue: '',
            measurementType: ''
          }
        },
        orderLineItemDetail: {
          $class: 'com.jda.models.OrderLineItemDetail',
          quantity: '',
          CarrierCode: '',
          logistics: {
            $class: 'com.jda.models.OrderLogisticalInformation',
            shipFrom: '',
            shipTo: '',
            requestedDeliveryDateRange: {
              $class: 'com.jda.models.RequestedDeliveryDateRange',
              beginDate: '',
              beginTime: '',
              endDate: '',
              endTimexzZaz: ''
            },
            requestedShipDateRange: {
              $class: 'com.jda.models.RequestedShipDateRange',
              beginDate: '',
              beginTime: '',
              endDate: '',
              endTimexzZaz: ''
            }
          }
        }
      }
    ],
    contract: {},
    carrier: {},
    buyer: {},
    supplier: {},
    integrationDetails: []
  },
  orders: []
}

const getters = {
  getOrder() {
    return state.order
  },
  getOrders() {
    return state.orders
  },
  getLogistics() {
    return state.order.logistics
  },
  getOrderStatus() {
    return state.order.orderStatus
  }
}

const mutations = {
  [SET_ORDER](state, payload) {
    state.order = payload
  },
  [SET_ORDER_LIST](state, payload) {
    state.orders = payload
  },
  [SET_SUPPPLIER_ORDER](state, payload) {
    state.order.supplier = payload
  }
}

const actions = {
  fetchOrderById({ dispatch, commit }, id) {
    let url = `${orderApi}/${id}`
    return axios.get(url).then(res => {
      const allPromises = []

      //supplier info
      let supplierId = stripResourceName(res.data.supplier)
      let supplierInfo = dispatch('fetchUserByIdAndType', {
        userId: supplierId,
        userType: SUPPLIER_USER_TYPE
      })

      //buyer info
      let buyerId = stripResourceName(res.data.buyer)
      let buyerInfo = dispatch('fetchUserByIdAndType', {
        userId: buyerId,
        userType: BUYER_USER_TYPE
      })


      allPromises.push(supplierInfo)
      allPromises.push(buyerInfo)

      //carrier info
      if (res.data.carrier) {
        let carrierId = stripResourceName(res.data.carrier)
        let carrierInfo = dispatch('fetchUserByIdAndType', {
          userId: carrierId,
          userType: CARRIER_USER_TYPE
        })
        allPromises.push(carrierInfo)
      }

      //contract info
      if (res.data.contract) {
        let contractId = stripResourceName(res.data.contract)
        let contractInfo = dispatch('fetchContractById', contractId)
        allPromises.push(contractInfo)
      }

      //Integration details
      let integrateInfoPromise = [] //Array of prmoises for all the integration details
      if (
        res.data.integrationDetails &&
        res.data.integrationDetails.length > 0
      ) {
        res.data.integrationDetails.filter(detail => {
          let documentId = stripResourceName(detail) //Why this not caps??
          let documentInfo = dispatch('fetchIntegrationDetailById', documentId)
          integrateInfoPromise.push(documentInfo)
        })
        integrateInfoPromise.filter(promise => allPromises.push(promise))
      }

      // futureDetais are the details which we get in the later stage
      // in order flow.
      // 1. integration Details (in planning stage)
      // 2. Carrier Details and Contract Details ( in planned Stage)
      // NOTE: Since carrierDetails promise is pused before contractDetails, we have
      // add to order detail accordingly
      Promise.all(allPromises).then(
        ([supplierInfo, buyerInfo, ...futureDetails]) => {
          res.data.supplier = supplierInfo.data
          res.data.buyer = buyerInfo.data

          if (res.data.carrier) {
            // we are already in planned stage
            let carrierInfo = futureDetails[0]
            let contractInfo = futureDetails[1]
            res.data.carrier = carrierInfo.data
            res.data.contract = contractInfo.data
          }

          if (res.data.integrationDetails) {
            let intDetails = []
            if (res.data.carrier) {
              futureDetails = futureDetails.slice(2)
            }
            futureDetails.filter(detail => intDetails.push(detail.data))
            res.data.integrationDetails = intDetails
          }
          commit(SET_ORDER, res.data)
        }
      )
      return res
    })
  },
  fetchOrders({ dispatch, commit, rootState }) {
    let urlParams = rootState.ui.orderApiParams
    if (urlParams) {
      let key = Object.keys(urlParams)[0]
      let value = urlParams[key]
      return axios
        .get(orderApi, {
          params: {
            filter: { where: { [key]: value } }
          }
        })
        .then(res => commit(SET_ORDER_LIST, res.data))
    } else
      return axios.get(orderApi).then(res => commit(SET_ORDER_LIST, res.data))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
