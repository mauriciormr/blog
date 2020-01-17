import {
  SET_USER_LOGIN_INFORMATION,
  SET_USER_LOGIN_FLAG,
  LOGOUT_USER
} from '../data/mutation-types'

// https://dev.to/localeai/architecting-vuex-store-for-large-scale-vue-js-applications-4f1f
// 4. Resseting module state
const initialState = () => ({
  user: {
    logged: false
  }
})

export const state = () => initialState()

export const mutations = {
  [SET_USER_LOGIN_INFORMATION](state, payload) {
    state.user = {
      ...payload
    }
  },
  [SET_USER_LOGIN_FLAG](state) {
    state.user = {
      ...state.user,
      logged: true
    }
  },
  [LOGOUT_USER](state) {
    const newState = initialState()
    Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  }
}

export const actions = {
  async loginUser({ dispatch }, user) {
    await dispatch('setUserLoginInformation', user)
    await dispatch('setUserLoginFlag')
    return Promise.resolve()
  },
  setUserLoginInformation({ commit }, user) {
    commit(SET_USER_LOGIN_INFORMATION, user)
    return Promise.resolve()
  },
  setUserLoginFlag({ commit }) {
    commit(SET_USER_LOGIN_FLAG)
    return Promise.resolve()
  },
  logoutUser({ commit }) {
    commit(LOGOUT_USER)
    return Promise.resolve()
  }
}
