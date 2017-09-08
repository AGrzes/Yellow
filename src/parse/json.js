var miss = require('mississippi')
module.exports = () => miss.through.obj((message, encoding, cb) => {
  if (message.content) {
    message.json = JSON.parse(message.content)
  }
  cb(null, message)
})
