/*
1) Total GPS messages.
2) Total CAN messages.
3) Total unique CAN messages (for purposes of this count message_id define a unique CAN message)
4) Total run time of the data in the file base on the ts (timestamps)
5) Average CAN messages per second of run time and per gps message
6) The first ts (timestamp) that contains the most CAN messages
7) The first ts (timestamp) that contains the least CAN messages
*/

const reducer_pipeline = [
  require('./reduce_msg_counts'),
  require('./compute_unique_can_count'),
  require('./compute_run_time'),
  require('./compute_can_averages'),
  require('./compute_can_timestamps')
]

const reduce_gps_report = (gps_data=[]) => {
  if (!gps_data) {
    return
  }

  try {
    // Reduce over all the pipeline processor compute fuctions and aggregate the results
    
    return reducer_pipeline
      .reduce((acc, cur) => {
        // Bind the arguments to the pipeline function, some of the functions require the accumulated counts
        const pipeline_processor = cur.bind(undefined, gps_data, acc)
        
        // Call pipeline_processor and assign results to accumulator
        return Object.assign({}, acc, pipeline_processor())
      }, {})
  } catch(e) {
    console.log(e)
  }
}

module.exports = reduce_gps_report
