const { compose } = require('../helpers/func')

const compute_total_run_time = (arr=[]) => {
  const sorted_by_ts_arr = arr.slice().sort((a, b) => b.ts.getTime() - a.ts.getTime())
  const total_run_time = sorted_by_ts_arr[0].ts.getTime() - sorted_by_ts_arr[sorted_by_ts_arr.length - 1].ts.getTime()

  return { total_run_time }
}

module.exports = compute_total_run_time
