var miss = require('mississippi')
var yaml = require('js-yaml')
module.exports = (options) => {
  options = options || {}
  const target = options.target || 'yaml'
  const source = options.source || 'content'
  const override = options.override
  return miss.through.obj((message, encoding, cb) => {
    if (message[source] && (!message[target] || override)) {
      message[target] = yaml.safeLoadAll(message[source])
      if (message[target].length == 1) {
        message[target] = message[target][0]
      }
    }
    cb(null, message)
  })
}
