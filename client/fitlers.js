import Vue from 'vue'
import moment from 'moment'
import { BUYER_USER_TYPE, SUPPLIER_USER_TYPE } from './store/user';

export const stripResourceName = (str) => str.split('#')[1]
export const resourceNameToId = (str) => str.split('#')[1].toUpperCase()
export const formatDate = (incomingDate) => moment(incomingDate).format("DD/MM/YYYY")
export const filterAccountType = (accountType) => {
  let accountName = 'System'
  switch(accountType) {
    case BUYER_USER_TYPE:
      accountName = 'Buyer'
      break
    case SUPPLIER_USER_TYPE:
      accountName = 'Supplier'
      break
  }
  return accountName
}

Vue.filter('stripResourceName', stripResourceName)
Vue.filter('formatDate', formatDate)
Vue.filter('filterAccountName', filterAccountType)
Vue.filter('formatDateTime', (incomingDateTime) => moment(incomingDateTime).format("DD/MM/YYYY HH:mm:ss"))