var miss = require('mississippi')
var yaml = require('js-yaml')
module.exports = (options) => {
  options = options || {}
  const target = options.target || 'json'
  const source = options.source || 'content'
  const override = options.override
  return miss.through.obj((message, encoding, cb) => {
  if (message[source]&&(!message[target]||override)) {
    message[target]= yaml.safeLoad(message[source])
  }
  cb(null, message)
})}
