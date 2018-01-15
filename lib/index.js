'use strict'

const { EventEmitter }       = require('events')
const server                 = require('./server')
const config                 = require('./config')
const mediator               = new EventEmitter()
const winston                = require('winston')
const services               = require('./services')
const repositories           = require('./repositories')

winston.log('info', 'Booting Service.')

process.on('uncaughtException', (err) => {
  winston.log('error', 'Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  winston.log('error', 'Unhandled Rejection', err)
})

async function on_di_ready(container) {
  try {
    await repositories.connect(container)
    winston.log('info', 'Connected repositories to container.')
    
    await services.connect(container)
    winston.log('info', 'Connected services to container.')
    
    const { logger, gps_report: gps_report_service } = container.resolve('services')
    
    // Start the server
    const app = await server.start(container)
    
    logger.info(`Server started succesfully, running on port: ${container.cradle.server_settings.port}.`)
    app.on('close', () => logger.info('Closing application.'))
    
    gps_report_service.build_gps_report()
  } catch(err) {
    winston.log('error', 'There was an error starting the server: ', err)
  }
}

mediator.on('di.ready', on_di_ready)

config.init(mediator)

mediator.emit('init')
