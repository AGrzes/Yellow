var miss = require('mississippi')
module.exports = (options) => {
  options = options || {}
  const target = options.target || 'json'
  return miss.through.obj((message, encoding, cb) => {
  if (message.content) {
    message[target]= JSON.parse(message.content)
  }
  cb(null, message)
})}
