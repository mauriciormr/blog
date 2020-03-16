import { SET_PAGE_LANGUAGE } from '~/data/mutation-types'
import { AVAILABLE_LANGS } from '~/data/default-data'

// https://dev.to/localeai/architecting-vuex-store-for-large-scale-vue-js-applications-4f1f
// 4. Resseting module state
const initialState = () => ({
  lang: AVAILABLE_LANGS[0]
})

export const state = () => initialState()

export const mutations = {
  [SET_PAGE_LANGUAGE](state, lang) {
    state.lang = lang
  }
}

export const actions = {
  setPageLanguage({ commit }, lang) {
    commit(SET_PAGE_LANGUAGE, lang)
    return Promise.resolve()
  }
}
