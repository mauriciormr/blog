import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export const state = () => ({})

export const mutations = {}

export const actions = {
  nuxtServerInit({ dispatch }, { app }) {
    const cookies = app.$cookies.get('vuex')
    if (cookies) {
      const {
        users: { user },
        lang: { lang }
      } = cookies
      if (user.logged) {
        dispatch('users/loginUser', user)
      }
      if (lang) {
        dispatch('lang/setPageLanguage', lang)
      }
    }
  }
}

export const plugins = [
  createPersistedState({
    paths: ['users', 'lang'],
    storage: {
      getItem: key => Cookies.getJSON(key),
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 3, secure: false }),
      removeItem: key => Cookies.remove(key)
    }
  })
]
