/* It's activated when the route change */
import _ from 'lodash'

export default function({ store, redirect, route, $axios }) {
  const userWithToken = _.get(store, 'state.users.user.token', false)
  $axios.setToken(false)
  if (userWithToken) {
    $axios.setToken(userWithToken, 'token')
  }
}
