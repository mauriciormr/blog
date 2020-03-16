import { responseCodesHandler } from '../utils/validate-errors'

export default ({ error }, inject) => {
  inject('errorGlobalHandler', (err, lang) =>
    error(responseCodesHandler(err, lang))
  )
}
