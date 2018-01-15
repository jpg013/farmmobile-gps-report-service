const { bad_request_error } = require('../errors')

const gps_report_model = (joi, format_error) => {
  const schema = {
    total_gps_messages: joi.number().required(),
    total_can_messages: joi.number().required(),
    unique_can_msg_count: joi.number().required(),
    total_run_time: joi.number().required(),
    average_can_messages_per_second: joi.number().required(),
    average_can_messages_per_gps_message: joi.number().required(),
    first_ts_with_most_can_messages: joi.date().required(),
    first_ts_with_least_can_messages: joi.date().required(),
  }

  const validate = object => {
    const { 
      total_gps_messages,
      total_can_messages,
      unique_can_msg_count,
      total_run_time,
      average_can_messages_per_second,
      average_can_messages_per_gps_message,
      first_ts_with_most_can_messages,
      first_ts_with_least_can_messages
    } = object
    
    const schema_data = { 
      total_gps_messages,
      total_can_messages,
      unique_can_msg_count,
      total_run_time,
      average_can_messages_per_second,
      average_can_messages_per_gps_message,
      first_ts_with_most_can_messages,
      first_ts_with_least_can_messages,
     }

    const { value, error } = joi.validate(schema_data, schema)
    
    if (error) {
      throw new bad_request_error(format_error(error) || 'Bad request data.')
    }

    return value
  }

  return {
    validate
  }
}

module.exports = gps_report_model
