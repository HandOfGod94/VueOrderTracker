import Vue from 'vue'
import moment from 'moment'

export const stripResourceName = (str) => str.split('#')[1]
export const resourceNameToId = (str) => str.split('#')[1].toUpperCase()
export const formatDate = (incomingDate) => moment(incomingDate).format("DD/MM/YYYY")

Vue.filter('stripResourceName', stripResourceName)
Vue.filter('formatDate', formatDate)
Vue.filter('formatDateTime', (incomingDateTime) => moment(incomingDateTime).format("DD/MM/YYYY HH:mm:ss"))