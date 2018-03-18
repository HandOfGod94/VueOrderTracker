export const UPDATE_TRACKER_STEP = 'UPDATE_TRACKER_STEP'

const state = {
  currentTrackerStep: 0
}

const mutations = {
  [UPDATE_TRACKER_STEP] (state, payload){
    state.currentTrackerStep = payload
  }
}

export default {
  state,
  mutations
}
