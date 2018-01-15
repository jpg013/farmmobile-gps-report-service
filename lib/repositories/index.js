const cache_repository = require('./cache_repository')
const { asValue }      = require('awilix')

async function connect(container) {
  const repositories = {
    cache_repository: await cache_repository.connect(container)
  }
  
  container.register({repositories: asValue(repositories)})
}

module.exports = Object.create({connect})
