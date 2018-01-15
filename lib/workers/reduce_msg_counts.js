// ======================================================
// 1) Total GPS messages.
// 2) Total CAN messages.
// ======================================================

const fields = {
  total_gps_messages: 0,
  total_can_messages: 0
}

const reduce_msg_counts = (gps_data=[]) => {
  if (!gps_data) {
    return
  }
  
  return gps_data.reduce((acc, cur) => {
    return Object.assign({}, acc, {
      total_can_messages: cur.is_can_message ? acc.total_can_messages + 1 : acc.total_can_messages,
      total_gps_messages: cur.is_gps_message ? acc.total_gps_messages + 1 : acc.total_gps_messages
    })
  }, Object.assign({}, fields))
}

module.exports = reduce_msg_counts
