import Vue from 'vue'
import moment from 'moment'
import { BUYER_USER_TYPE, SUPPLIER_USER_TYPE } from './store/user';

export const stripResourceName = (str) => str.split('#')[1]
export const resourceNameToId = (str) => str.split('#')[1].toUpperCase()
export const formatDate = (incomingDate) => moment(incomingDate).format("DD/MM/YYYY")
export const formatDateTime = (incomingDateTime) => moment(incomingDateTime).format("DD/MM/YYYY HH:mm:ss")

Vue.filter('stripResourceName', stripResourceName)
Vue.filter('formatDate', formatDate)
Vue.filter('formatDateTime', formatDateTime) 