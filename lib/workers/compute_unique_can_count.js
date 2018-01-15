const { compose } = require('../helpers/func')
const { filter_unique } = require('../helpers/array')

const can_msg_filterer = (arr=[]) => arr.filter(cur => cur.is_can_message)
const msg_id_mapper    = (arr=[]) => arr.map((cur, idx) => cur.message_id)
const map_results = (arr=[]) => ({ unique_can_msg_count: arr ? arr.length : 0 })

module.exports = compose(map_results, filter_unique, msg_id_mapper, can_msg_filterer)
