var miss = require('mississippi')
module.exports = () => miss.through.obj((message, encoding, cb) => {
  message.json = JSON.parse(message.content)
  cb(null, message)
})
