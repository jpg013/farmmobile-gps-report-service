'use strict'

const { fork } = require('child_process');

async function connect(container) {
  let gps_report_forker
  const { workers_dir, gps_data_file_path, make_gps_report_file_path } = container.resolve('path_settings')
  const { cache_repository } = container.resolve('repositories')
  
  function on_gps_report_msg({gps_report}) {
    if (!gps_report) {
      return
    }
    
    // fire & forget
    cache_repository.put_gps_report(gps_report)
  }
  
  function build_gps_report() {
    if (!gps_report_forker) {
      gps_report_forker = fork(make_gps_report_file_path)
      gps_report_forker.on('message', on_gps_report_msg)
    }
    
    gps_report_forker.send({gps_data_file_path})
  }
  
  return {
    build_gps_report
  }
}

module.exports = Object.create({connect})
