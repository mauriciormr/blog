import _ from 'lodash'

// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
const responseCodes = {
  OK: {
    code: '200',
    message: 'Action sucess'
  },
  created: {
    code: '201',
    message: 'Action sucess'
  },
  accepted: {
    code: '202',
    message: 'Action sucess'
  },
  noContent: {
    code: '204',
    message: 'Not elements'
  },
  badRequest: {
    code: '400',
    message: 'An error ocurred'
  },
  unauthorized: {
    code: '401',
    message: 'Not permission'
  },
  forbidden: {
    code: '403',
    message: 'Not permission'
  },
  notFound: {
    code: '404',
    message: 'Not found'
  },
  default: {
    code: '0',
    message: 'An error has occurred'
  }
}

const responseCodesHandler = errorObj => {
  let backupError = errorObj
  if (
    typeof backupError !== 'object' ||
    Object.keys(errorObj).length === 0 ||
    !errorObj
  ) {
    backupError = new Error(responseCodes.default.code)
  }

  const statusCode = !_.get(backupError, 'message')
    ? ['default']
    : _.get(backupError, 'message').match(/\d+/g)

  const message = statusCode
    ? _.get(_.find(responseCodes, { code: statusCode[0] }), 'message', null)
    : backupError.message

  return {
    statusCode: statusCode ? +statusCode[0] : responseCodes.default.code,
    message: message || responseCodes.default.message
  }
}
export { responseCodesHandler, responseCodes }
