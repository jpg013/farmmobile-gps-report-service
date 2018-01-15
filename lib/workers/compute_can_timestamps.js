const { compose }              = require('../helpers/func')
const { aggregate_key_counts } = require('../helpers/array')

const filter_is_can_msg = (arr=[]) => arr.filter(cur => cur.is_can_message)
const aggregate_can_counts = aggregate_key_counts('message_id')
const make_sorted_can_counts = compose(aggregate_can_counts, filter_is_can_msg)

const compute_can_timestamps = (arr=[]) => {
  const sorted_can_count_arr = make_sorted_can_counts(arr)
  const most_can_messages_id = sorted_can_count_arr[0].key
  const least_can_messages_id = sorted_can_count_arr[sorted_can_count_arr.length-1].key
  
  return {
    first_ts_with_most_can_messages: arr.find(cur => cur.message_id === most_can_messages_id).ts,
    first_ts_with_least_can_messages: arr.find(cur => cur.message_id === least_can_messages_id).ts,
  }
}

module.exports = compute_can_timestamps
