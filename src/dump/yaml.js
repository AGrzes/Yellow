var miss = require('mississippi')
var yaml = require('js-yaml')
module.exports = (options) => {
  options = options || {}
  const target = options.target || 'content'
  const source = options.source || 'yaml'
  const override = options.override
  return miss.through.obj((message, encoding, cb) => {
    if (message[source] && (!message[target] || override)) {
      message[target] = yaml.safeDump(message[source])
    }
    cb(null, message)
  })
}
