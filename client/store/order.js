import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import {
  SET_ORDER,
  SET_ORDER_LIST,
  SET_SUPPPLIER_ORDER
} from '../actions/order'
import { orderApi } from '../urls'
import { SUPPLIER_USER_TYPE, BUYER_USER_TYPE } from '../actions/user'
import { resourceNameToId, stripResourceName } from '../fitlers';

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
    contract: 'resource:com.jda.models.Contract#Contract100',
    buyer: '',
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
  fetchOrderById({dispatch, commit}, id) {
    let url = `${orderApi}/${id}`
    const orderInfo = axios.get(url)

    orderInfo.then(res => {
      //supplier info
      let supplierId = resourceNameToId(res.data.supplier)
      let supplierInfo = dispatch('fetchUserByIdAndType', {
        userId: supplierId,
        userType: SUPPLIER_USER_TYPE
      })

      //buyer info
      let buyerId = resourceNameToId(res.data.buyer)
      let buyerInfo = dispatch('fetchUserByIdAndType', {
        userId: buyerId,
        userType: BUYER_USER_TYPE
      })

      //Integration details
      let integrateInfoPromise = [] //Array of prmoises for all the integration details
      res.data.integrationDetails.filter( (detail) => {
        let documentId = stripResourceName(detail) //Why this not caps??
        let documentInfo = dispatch('fetchIntegrationDetailById', documentId)
        integrateInfoPromise.push(documentInfo)
      })

      const allPromises = [supplierInfo, buyerInfo, ...integrateInfoPromise]
      Promise.all(allPromises).then(
        ([supplierInfo, buyerInfo, ...integrateInfoPromise]) => {
        res.data.supplier = supplierInfo.data
        res.data.buyerInfo = buyerInfo.data
        let intDetails = []
        integrateInfoPromise.filter(detail => intDetails.push(detail.data))
        res.data.integrationDetails = intDetails
        console.log(res.data)
        commit(SET_ORDER, res.data)
      })
      
    })
  },
  fetchOrders({ dispatch, commit }) {
    return axios.get(orderApi).then(res => commit(SET_ORDER_LIST, res.data))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
