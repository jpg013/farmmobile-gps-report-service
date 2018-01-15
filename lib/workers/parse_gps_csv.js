const map_gps_datum = require('./map_gps_datum')
const csv_to_json   = require('csvtojson')

const parse_gps_csv = csv_file_path => {
  return new Promise((resolve, reject) => {
    let csv_data = []
    
    csv_to_json()
      .fromFile(csv_file_path)
      .on('json', json_obj => csv_data.push(map_gps_datum(json_obj)))
      .on('done', x => resolve(csv_data))
      .on('error', reject)
  })
}

module.exports = parse_gps_csv
