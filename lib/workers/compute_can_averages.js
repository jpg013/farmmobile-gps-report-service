'use strict'

const compute_can_msg_averages = (arr=[], aggregate={}) => {
  const { total_run_time, total_can_messages=0, total_gps_messages } = aggregate
  const total_run_time_sec = total_run_time/1000
  
  if (!total_run_time || !total_gps_messages) {
    return {}
  }
  
  return {
    average_can_messages_per_second: total_can_messages / total_run_time_sec,
    average_can_messages_per_gps_message: total_can_messages / total_gps_messages,
  }
}

module.exports = compute_can_msg_averages
