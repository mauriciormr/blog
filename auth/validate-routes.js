import _ from 'lodash'

import privateRoutes from './private-routes'

const validateRoute = routeObject => {
  const lengthMatches = routeObject.matched.length
  if (lengthMatches > 0) {
    const { matched: matches } = routeObject
    const routeFound = _.find(privateRoutes, pr =>
      _.find(matches, m => m.path === pr)
    )
    if (routeFound) {
      return true
    }
  }
  return false
}
export default validateRoute
