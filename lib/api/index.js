const express                                      = require('express')
const { INTERNAL_SERVER_ERROR, getStatusText, OK } = require('http-status-codes')
const gps_report_controller                        = require('./controllers/gps_report_controller')
const health_check_controller                      = require('./controllers/health_check_controller')
const swaggerUI                                    = require('swagger-ui-express')
const YAML                                         = require('yamljs')

// ======================================================
// Error Handling
// ======================================================
const handleErrorResponse = (err, req, res, next) => {
  const { message, status } = err
  
  if (!status) {
    return res.status(INTERNAL_SERVER_ERROR).send({
      message: getStatusText(INTERNAL_SERVER_ERROR),
      code: INTERNAL_SERVER_ERROR
     })
  }
  
  if (!message) {
    return res.status(status).send({
      message: getStatusText(status),
      code: status
     })
  }

  res.status(status).send({
    message,
    code: status
  })
}

const handleResults = (req, res) => {
  res.status(OK).send(req.results)
}

const config = (api, container) => {
  const gps_report_router   = express.Router()
  const health_check_router = express.Router()

  // ======================================================
  // Mount the controllers to base route
  // ======================================================
  gps_report_controller.connect(container, gps_report_router)
  health_check_controller.connect(container, health_check_router)

  // ======================================================
  // Mount the router to the app and return app
  // ======================================================
  api.use('/gps_report', gps_report_router, handleErrorResponse, handleResults)
  api.use('/health_check', health_check_router, handleErrorResponse, handleResults)
  
  // ======================================================
  // Setup Swagger
  // ======================================================
  const swaggerDocument = YAML.load(container.cradle.path_settings.swagger_doc_path)
  api.use('/api_reference', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

  return api
}

module.exports = config
