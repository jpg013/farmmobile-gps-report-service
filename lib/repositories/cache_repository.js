'use strict'

const hmset = (key, db_index=0) => {
  return (val, cache_client) => {
    return new Promise((resolve, reject) => {
      if (!key || !val || !cache_client) {
        return reject('Missing required parameters.')
      }
      
      cache_client.select(db_index, err => {
        if (err) {
          return reject(err)
        }
        
        cache_client.hmset(key, val, resolve)
      })
    })
  }
}

const hgetall = (key, db_index) => {
  return cache_client => {
    return new Promise((resolve, reject) => {
      if (!key || !cache_client) {
        return reject('Missing required parameters.')
      }
      
      cache_client.select(db_index, (err) => {
        if (err) {
          return reject(err)
        }
        
        cache_client.hgetall(key, (err, data) => err ? reject(err) : resolve(data))
      })
    })
  }
}

const cache_repository = container => {
  const db_cache = container.resolve('db_cache')
  
  const gps_report_hm_setter = hmset('gps_report', 0)
  const gps_report_hm_getter = hgetall('gps_report', 0)
  
  async function lookup_gps_report() {
    const { logger } = container.resolve('services')
    
    try {
      const cache_client = await db_cache.get_client()
      
      return await gps_report_hm_getter(cache_client)
    } catch(err) {
      logger.error('There was an error looking up cache , ', err)
    }
  }
  
  async function put_gps_report(data) {
    const { logger } = container.resolve('services')
    
    try {
      const cache_client = await db_cache.get_client()

      await gps_report_hm_setter(data, cache_client)
    } catch(err) {
      logger.error('There was an error putting to cache , ', err)
    }
  }
    
  return {
    lookup_gps_report,
    put_gps_report
  }
}

const connect = container => {
  return new Promise((resolve, reject) => {
    const db_cache = container.resolve('db_cache')
    
    if (!db_cache) {
      reject('Missing required db_cache dependency.')
    }
    
    resolve(cache_repository(container))
  })
}

module.exports = Object.create({connect})
