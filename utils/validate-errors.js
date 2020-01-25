const errorsMessages = {
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
  if (typeof backupError !== 'object' || !errorObj) {
    backupError = new Error(errorsMessages.default.message)
  }

  const statusCode = backupError.message.match(/\d+/g)
  const message = statusCode
    ? errorsMessages[statusCode[0]].message
    : backupError.message

  return {
    statusCode: statusCode ? +statusCode[0] : 0,
    message
  }
}
export { errorHandler }
