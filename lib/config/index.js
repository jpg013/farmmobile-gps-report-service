const {
  server_settings,
  path_settings,
  db_cache_settings
} = require('./settings')

const db_cache    = require('./db_cache')
const { init_di } = require('./di')

const bind_args = {
  server_settings,
  path_settings,
  db_cache,
  db_cache_settings
}

const init = init_di.bind(null, bind_args)

module.exports = Object.create({ init })
