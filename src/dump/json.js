var miss = require('mississippi')
module.exports = (options) => {
  options = options || {}
  const target = options.target || 'content'
  const source = options.source || 'json'
  const override = options.override
  return miss.through.obj((message, encoding, cb) => {
    if (message[source] && (!message[target] || override)) {
      message[target] = JSON.stringify(message[source])
    }
    cb(null, message)
  })
}
