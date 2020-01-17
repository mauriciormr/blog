import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export const state = () => ({})

export const mutations = {}

export const actions = {}

export const plugins = [
  createPersistedState({
    paths: ['users'],
    storage: {
      getItem: key => Cookies.getJSON(key),
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 3, secure: false }),
      removeItem: key => Cookies.remove(key)
    }
  })
]
