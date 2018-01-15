'use strict'

const logger      = require('./logger')
const gps_report  = require('./gps_report')
const { asValue } = require('awilix')

async function connect(container) {
  const services = {
    logger: await logger.connect(container),
    gps_report: await gps_report.connect(container)
  }
  
  container.register({services: asValue(services)})
}

module.exports = Object.create({connect})
