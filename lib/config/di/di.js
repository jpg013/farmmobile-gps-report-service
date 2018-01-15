const awilix = require('awilix')
const { asValue } = awilix

function init_di ({
  server_settings,
  path_settings,
  db_cache_settings,
  db_cache,
}, mediator) {

  mediator.once('init', () => {
    // Create the DI container and set the injectionMode to PROXY.
    const container = awilix.createContainer({
      injectionMode: awilix.InjectionMode.PROXY
    })
    
    container.register({
      server_settings: asValue(Object.assign({}, server_settings)),
      path_settings: asValue(Object.assign({}, path_settings)),
      db_cache_settings: asValue(Object.assign({}, db_cache_settings)),
      db_cache: asValue(db_cache.init_cache(mediator, db_cache_settings))
    })
    
    mediator.emit('di.ready', container)
  })
}

module.exports.init_di = init_di
