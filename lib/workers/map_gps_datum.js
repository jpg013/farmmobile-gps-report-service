// Rows that have a gps_id, latitude, longitude, groundspeed and truecourse are GPS messages
const is_gps_message = (datum={}) => {
  if (!datum) {
    return false
  }
  
  const { gps_id, latitude, longitude, groundspeed, truecourse } = datum
  
  return (!isNaN(gps_id) &&
          !isNaN(latitude) &&
          !isNaN(longitude) &&
          !isNaN(groundspeed) &&
          !isNaN(truecourse))
}

// Rows that have a message_id, dlc, payload are CAN messages
const is_can_message = (datum={}) => {
  if (!datum) {
    return false
  }
  
  const { message_id, dlc, payload } = datum
  
  return ((message_id && message_id.length) &&
          !isNaN(dlc) &&
          (payload && payload.length))
}

const map_gps_datum = datum => {
  const { message_id, dlc, payload, puc_id, ts, gps_id, latitude, longitude, groundspeed, truecourse } = datum
  
  const props = {
    message_id,
    dlc: parseInt(dlc),
    payload,
    puc_id: parseInt(puc_id),
    ts: new Date(ts),
    gps_id: parseInt(gps_id),
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    groundspeed: parseFloat(groundspeed),
    truecourse: parseInt(truecourse),
  }
  
  return Object.assign({}, props, {
    is_gps_message: is_gps_message(props),
    is_can_message: is_can_message(props)
  })
}

module.exports = map_gps_datum
