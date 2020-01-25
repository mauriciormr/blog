import { errorHandler } from '../utils/validate-errors'

export default ({ error }, inject) => {
  inject('errorGlobalHandler', err => error(errorHandler(err)))
}
