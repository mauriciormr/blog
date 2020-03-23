import _ from 'lodash'
import { SET_PAGE_LANGUAGE } from '~/data/mutation-types'
import { AVAILABLE_LANGS, LABELS } from '~/data/default-data'

const LABELS_CLONE = _.cloneDeep(LABELS)
const LABELS_INIT = _.cloneDeep(LABELS)
Object.keys(LABELS_CLONE).map(keyType => {
  Object.keys(LABELS_CLONE[`${keyType}`]).map(keyElement => {
    Object.keys(LABELS_CLONE[`${keyType}`][`${keyElement}`]).map(keyItem => {
      LABELS_INIT[`${keyType}`][`${keyElement}`][`${keyItem}`] = _.get(
        LABELS_CLONE[`${keyType}`][`${keyElement}`][`${keyItem}`],
        AVAILABLE_LANGS[0]
      )
    })
  })
})

// https://dev.to/localeai/architecting-vuex-store-for-large-scale-vue-js-applications-4f1f
// 4. Resseting module state
const initialState = () => ({
  lang: AVAILABLE_LANGS[0],
  labels: LABELS_INIT
})

export const state = () => initialState()

export const mutations = {
  [SET_PAGE_LANGUAGE](state, lang) {
    state.lang = lang
    state.labels = _.cloneDeep(LABELS)
    const LABELS_CLONE = _.cloneDeep(LABELS)
    Object.keys(LABELS_CLONE).map(keyType => {
      Object.keys(LABELS_CLONE[`${keyType}`]).map(keyElement => {
        Object.keys(LABELS_CLONE[`${keyType}`][`${keyElement}`]).map(
          keyItem => {
            state.labels[`${keyType}`][`${keyElement}`][`${keyItem}`] = _.get(
              LABELS_CLONE[`${keyType}`][`${keyElement}`][`${keyItem}`],
              lang
            )
          }
        )
      })
    })
  }
}

export const actions = {
  setPageLanguage({ commit }, lang) {
    commit(SET_PAGE_LANGUAGE, lang)
    return Promise.resolve()
  }
}
