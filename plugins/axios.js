/* It's activated when a request is made.
 *
 * Its functionality is to verify the user's login
 * in each request, as double verification of the
 * user's session.
 */
import _ from 'lodash'

export default function({ $axios, store }) {
  $axios.setBaseURL(process.env.GITHUB_REPO_BACKEND_URL)
  const userWithToken = _.get(store, 'state.users.user.token', false)
  $axios.setToken(false)
  if (userWithToken) {
    $axios.setToken(userWithToken, 'token')
  }
}
