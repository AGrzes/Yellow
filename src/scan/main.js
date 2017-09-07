var gs = require('glob-stream')
module.exports = (pattern) => gs(pattern, {
  nodir: true,
  allowEmpty: true
})
