/* It's activated when the route change */
import validateRoute from '~/auth/validate-routes'

export default function({ store, redirect, route, $axios }) {
  const isPrivateRoute = validateRoute(route, store)
  if (isPrivateRoute) {
    const {
      state: {
        users: { user }
      }
    } = store
    if (!user.logged) {
      redirect('/login')
    }
  }
}
