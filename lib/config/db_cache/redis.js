const redis = require('redis')

function init_cache(mediator, options) {
  const DEFAULT_OPTIONS = {
    retry_strategy: on_connection_retry
  }

  let redis_client

  function on_connection_retry(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error('The server refused the connection.')
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error('Retry time exhausted.')
    }
    if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000)
  }
  
  function connect_client() {
    return new Promise((resolve, reject) => {
      const redis_args = Object.assign({}, DEFAULT_OPTIONS, options)
      redis_client = redis.createClient(redis_args.url, redis_args)
      
      // Attach event listeners
      redis_client.on('error', reject)
      redis_client.on('connect', resolve)
    })
    
    // Attach event listeners
    redis_client.on('error', err => undefined)
    redis_client.on('connect', x => undefined)
  }
  
  async function get_client() {
    if (!redis_client || !redis_client.connected) {
      await connect_client()
    }
    
    return redis_client
  }
  
  return {
    get_client
  }
}

module.exports = Object.assign({init_cache})
