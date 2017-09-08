var miss = require('mississippi')
module.exports = (options) => {
  options = options || {}
  const target = options.target || 'json'
  const source = options.source || 'content'
  return miss.through.obj((message, encoding, cb) => {
  if (message[source]) {
    message[target]= JSON.parse(message[source])
  }
  cb(null, message)
})}
