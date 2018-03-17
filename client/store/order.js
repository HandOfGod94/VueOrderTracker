import axios from "axios";
import moment from "moment";
import { SET_ORDER, SET_ORDER_LIST } from "../actions/order";
import { orderApi } from "../urls";

const state = {
  order: {
    $class: "com.jda.models.Order",
    orderNumber: "",
    createDateTime: "",
    lastUpdatedDateTime: "",
    supplierDescription: "",
    host: "",
    orderType: "",
    orderStatus: "",
    logistics: {
      $class: "",
      shipFrom: "",
      shipTo: "",
      requestedDeliveryDateRange: {
        $class: "com.jda.models.RequestedDeliveryDateRange",
        beginDate: "",
        beginTime: "",
        endDate: "",
        endTimexzZaz: ""
      },
      requestedShipDateRange: {
        $class: "com.jda.models.RequestedShipDateRange",
        beginDate: "",
        beginTime: "",
        endDate: "",
        endTimexzZaz: ""
      }
    },
    orderLineItem: [
      {
        $class: "com.jda.models.OrderLineItem",
        lineItemNumber: "",
        orderLinePriority: "",
        requestedQuantity: "",
        transactionalTradeItem: {
          $class: "com.jda.models.TransactionalTradeItem",
          ItemID: "",
          ExpirationDate: "",
          ItemDetails: "",
          transactionalItemData: {
            $class: "com.jda.models.TransactionalItemData",
            itemWeight: "",
            measurementValue: "",
            measurementType: ""
          }
        },
        orderLineItemDetail: {
          $class: "com.jda.models.OrderLineItemDetail",
          quantity: "",
          CarrierCode: "",
          logistics: {
            $class: "com.jda.models.OrderLogisticalInformation",
            shipFrom: "",
            shipTo: "",
            requestedDeliveryDateRange: {
              $class: "com.jda.models.RequestedDeliveryDateRange",
              beginDate: "",
              beginTime: "",
              endDate: "",
              endTimexzZaz: ""
            },
            requestedShipDateRange: {
              $class: "com.jda.models.RequestedShipDateRange",
              beginDate: "",
              beginTime: "",
              endDate: "",
              endTimexzZaz: ""
            }
          }
        }
      }
    ],
    contract: "resource:com.jda.models.Contract#Contract100",
    buyer: "",
    supplier: "",
    integrationDetails: [""]
  },
  orders: []
};

const dateFormat = "DD/MM/YYYY";
const dateTimeFormat = "DD/MM/YYYY HH:mm:ss"

/** utility functions */
function convertDateTime(incomingDate) {
  let momentObj = moment(incomingDate);
  return momentObj.format("DD/MM/YYYY");
}

function convertAllDates(incomingState) {
  incomingState.createDateTime = moment(incomingState.createDateTime).format(dateTimeFormat);
  incomingState.lastUpdatedDateTime = moment(incomingState.lastUpdatedDateTime).format(dateTimeFormat);
  incomingState.logistics.requestedShipDateRange.beginDate = moment(incomingState.logistics.requestedShipDateRange.beginDate).format(dateFormat)
 
  incomingState.logistics.requestedShipDateRange.endDate = moment(incomingState.logistics.requestedShipDateRange.endDate).format(dateFormat)
  
  incomingState.logistics.requestedDeliveryDateRange.beginDate = moment(incomingState.logistics.requestedDeliveryDateRange.beginDate).format(dateFormat)
 
  incomingState.logistics.requestedDeliveryDateRange.endDate = moment(incomingState.logistics.requestedDeliveryDateRange.endDate).format(dateFormat)
}

/** vuex functions */
const getters = {
  getOrder() {
    return state.order;
  },
  getOrders() {
    return state.orders;
  }
};

const mutations = {
  [SET_ORDER] (state, payload) {
    convertAllDates(payload);
    Object.assign(state.order, payload);
  },
  [SET_ORDER_LIST] (state, payload) {
    payload.filter(order => convertAllDates(order))
    state.orders = payload;
  }
};

const actions = {
  fetchOrderById({ commit }, id) {
    axios
      .get(`${orderApi}/${id}`)
      .then(res => commit(SET_ORDER, res.data));
  },
  fetchOrders({ commit }) {
    axios
      .get(orderApi)
      .then(res => commit(SET_ORDER_LIST, res.data));
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
