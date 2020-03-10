import _ from 'lodash'

const errorsMessages = {
  200: {
    message: 'Action sucess'
  },
  201: {
    message: 'Action sucess'
  },
  404: {
    message: 'Not found'
  },
  401: {
    message: 'Not permission'
  },
  default: {
    message: 'An error has occurred'
  }
}

const errorHandler = errorObj => {
  let backupError = errorObj
  if (
    typeof backupError !== 'object' ||
    Object.keys(errorObj).length === 0 ||
    !errorObj
  ) {
    backupError = new Error(errorsMessages.default.message)
  }

  const statusCode = !_.get(backupError, 'message')
    ? ['default']
    : _.get(backupError, 'message').match(/\d+/g)

  const message = statusCode
    ? errorsMessages[statusCode[0]].message
    : backupError.message

  return {
    statusCode: statusCode ? +statusCode[0] : 0,
    message
  }
}
export { errorHandler }
