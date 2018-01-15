const { performance } = require('perf_hooks');

const csv_to_json       = require('csvtojson')
const reduce_gps_report = require('./reduce_gps_report')
const parse_gps_csv     = require('./parse_gps_csv')

process.on('message', async msg => {
  const { gps_data_file_path } = msg
  
  if (!gps_data_file_path) {
    return
  }
  
  const gps_report = await make_gps_report(gps_data_file_path)
  
  process.send({gps_report})
})

async function make_gps_report(gps_data_file_path='') {
  const gps_data = await parse_gps_csv(gps_data_file_path)
  
  return reduce_gps_report(gps_data)
}

module.exports = make_gps_report
