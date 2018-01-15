const path = require('path')
const app_dir = path.normalize(`${__dirname}/../`)
  
const server_settings = {
  port: process.env.SERVER_PORT || 3030
}

const db_cache_settings = {
  url: process.env.REDIS_CONNECTION || 'redis://localhost:6379'
}

const path_settings = {
  gps_data_file_path: path.resolve(app_dir, 'gps_data', 'gps_can_data.csv'),
  make_gps_report_file_path: path.resolve(app_dir, 'workers', 'make_gps_report'),
  swagger_doc_path: path.resolve(app_dir, 'swagger', 'swagger.yaml'),
  workers_dir: path.resolve(app_dir, 'workers')
}

module.exports = Object.assign({}, {
  server_settings,
  path_settings,
  db_cache_settings
})
