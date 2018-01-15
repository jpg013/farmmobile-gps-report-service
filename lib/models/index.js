const joi              = require('joi')
const gps_report_model = require('./gps_report_model')

const format_schema_error = err => {
  if (!err || typeof err !== 'object') {
    return
  }

  const details = err.details ? err.details[0] : undefined

  if (!details) {
    return
  }

  const err_key = details.path.reduce((acc, cur) => {
    if (!acc.length) {
      return cur
    }

    return typeof cur === 'string' ? `${acc}.${cur}` : acc
  }, '')

  const { type, message } = details

  switch(type) {
    case 'any.required':
      return `'${err_key}' is a required field.`
    case 'string.base':
    case 'number.base':
      return `Invalid "${err_key}" field, ${message}.`
    case 'any.allowOnly':
      return `Invalid "${err_key}" field.`
    default:
      return
  }
}

const models = Object.create({
  gps_report: gps_report_model(joi, format_schema_error)
})

const schema_validator = (object, type) => {
  return new Promise((resolve, reject) => {
    if (!object) {
      return reject (new Error('Object to validate not provided.'))
    }

    if (!type) {
      return reject (new Error('Schema type to validate not provided.'))
    }

    const validator = models[type].validate.bind(null, object)

    try {
      const model = validator()

      resolve(model)
    } catch(err) {
      reject(err)
    }
  })
}

module.exports = Object.assign({
  validate: schema_validator
})
