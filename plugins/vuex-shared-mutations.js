// https://github.com/xanf/vuex-shared-mutations
import shareMutations from 'vuex-shared-mutations'
import {
  SET_USER_LOGIN_INFORMATION,
  SET_USER_LOGIN_FLAG,
  LOGOUT_USER
} from '../data/mutation-types'

export default ({ store }) => {
  window.onNuxtReady(() => {
    shareMutations({
      predicate: [
        `users/${SET_USER_LOGIN_INFORMATION}`,
        `users/${SET_USER_LOGIN_FLAG}`,
        `users/${LOGOUT_USER}`
      ]
    })(store)
  })
}
