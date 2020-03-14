import { responseCodesHandler } from '../utils/validate-errors'

export default ({ error }, inject) => {
  inject('errorGlobalHandler', err => error(responseCodesHandler(err)))
}
