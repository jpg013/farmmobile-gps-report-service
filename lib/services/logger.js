'use strict'

const winston = require('winston')

async function connect(container) {
  return {
    error: winston.log.bind(undefined, 'error'),
    info: winston.log.bind(undefined, 'info')
  }
}

module.exports = Object.create({connect})
