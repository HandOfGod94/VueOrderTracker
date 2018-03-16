import axios from "axios";

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

const getters = {
  getCurrentMessage() {
    return state.order;
  },
  getOrders() {
    return state.orders;
  }
};

const mutations = {
  SET_ORDER(state, payload) {
    Object.assign(state.order, payload);
  },
  SET_ORDER_LIST(state, payload) {
    state.orders = payload
  }
};

const actions = {
  //TODO: Get url from constant
  getOrderById({ commit }, id) {
    axios
      .get(`/api/com.jda.models.Order/${id}`)
      .then(res => commit("SET_ORDER", res.data));
  },
  getOrder({ commit }) {
    axios
      .get(`/api/com.jda.models.Order/`)
      .then(res => commit("SET_ORDER_LIST", res.data));
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
