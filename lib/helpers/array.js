// De-Dupes an array. Initiall I used the following approach : arr.filter((cur, idx) => arr.indexOf(cur) === idx)
// This was on the order of O(n^2) which didn't work, so went with a slighty nastier approach which included using a map
// for easy lookups

module.exports.filter_unique = (arr=[]) => {
  const arr_map = arr.reduce((acc, cur) => {
    if (acc[cur]) {
      return acc
    }
    acc[cur] = cur
    
    return acc
  }, {})

  return Object.keys(arr_map)
}

// Aggregates/counts all the items in an array based on a given key. Returns and object with they key/count pair
module.exports.aggregate_key_counts = (obj_key='') => (arr=[]) => {
  const obj_key_counts = arr
    .reduce((acc, cur) => {
      const key = typeof cur === 'object' ? cur[obj_key] : cur
      
      if (acc[key]) {
        acc[key] = acc[key] + 1
      } else {
        acc[key] = 1
      }

      return acc
    }, {})
    
  return Object.entries(obj_key_counts)
    .map(([key, val]) => ({key, val}))
    .sort((a, b) => b.val - a.val)
    .slice()

}