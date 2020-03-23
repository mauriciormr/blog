import _ from 'lodash'
import { SET_PAGE_THEME } from '~/data/mutation-types'
import { THEMES } from '~/data/default-data'

// https://dev.to/localeai/architecting-vuex-store-for-large-scale-vue-js-applications-4f1f
// 4. Resseting module state
const initialState = () => ({
  themes: THEMES,
  theme: _.find(THEMES, 'selected')
})

export const state = () => initialState()

export const mutations = {
  [SET_PAGE_THEME](state, theme) {
    state.theme = theme
  }
}

export const actions = {
  setPageTheme({ commit }, theme) {
    commit(SET_PAGE_THEME, theme)
    return Promise.resolve()
  }
}
