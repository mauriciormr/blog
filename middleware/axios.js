/**
 * It's activated when the route change and
 * in the first load of the site.
 *
 * axios middleware is loaded first than the axios
 * plugin so it's a good place to configure the
 * $axios object
 */

import _ from 'lodash'

export default function({ store, redirect, route, $axios }) {
  $axios.setBaseURL(process.env.GITHUB_REPO_BACKEND_URL)
  const userWithToken = _.get(store, 'state.users.user.token', false)
  $axios.setToken(false)
  if (userWithToken) {
    $axios.setToken(userWithToken, 'token')
  }
}
