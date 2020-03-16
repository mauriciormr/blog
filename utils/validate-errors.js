import _ from 'lodash'

// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
const responseCodes = {
  OK: {
    code: '200',
    message: {
      en: 'Action success',
      es: 'Acción realizada con éxito'
    }
  },
  created: {
    code: '201',
    message: {
      en: 'Action success',
      es: 'Acción realizada con éxito'
    }
  },
  accepted: {
    code: '202',
    message: {
      en: 'Action success',
      es: 'Acción realizada con éxito'
    }
  },
  noContent: {
    code: '204',
    message: {
      en: 'Not elements',
      es: 'No existen elementos'
    }
  },
  badRequest: {
    code: '400',
    message: {
      en: 'An error ocurred',
      es: 'Ha ocurrido un error'
    }
  },
  unauthorized: {
    code: '401',
    message: {
      en: 'Not permission',
      es: 'Sin autorización'
    }
  },
  forbidden: {
    code: '403',
    message: {
      en: 'Not permission',
      es: 'Sin autorización'
    }
  },
  notFound: {
    code: '404',
    message: {
      en: 'Not found',
      es: 'No encontrado'
    }
  },
  default: {
    code: '0',
    message: {
      en: 'An error has occurred',
      es: 'Ha ocurrido un error'
    }
  }
}

const responseCodesHandler = (errorObj, lang = 'es') => {
  let backupError = errorObj
  if (
    typeof backupError !== 'object' ||
    !_.get(errorObj, 'message') ||
    !errorObj
  ) {
    backupError = new Error(responseCodes.default.code)
  }

  const statusCode = !_.get(backupError, 'message')
    ? [responseCodes.default.code]
    : _.get(backupError, 'message').match(/\d+/g)

  const message = statusCode
    ? _.get(
        _.find(responseCodes, { code: statusCode[0] }),
        `message.${lang}`,
        null
      )
    : backupError.message

  return {
    statusCode: statusCode ? +statusCode[0] : responseCodes.default.code,
    message: message || responseCodes.default.message
  }
}
export { responseCodesHandler, responseCodes }
