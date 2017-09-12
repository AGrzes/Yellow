var miss = require('mississippi')
var _ = require('lodash')
module.exports = (options) => {
  if (!options.index) {
    throw new Error("Index not defined")
  }
  let index = options.index
  if (!options.key) {
    throw new Error("Key function not defined")
  } else {
    if (!_.isFunction(options.key)) {
      throw new Error("Key is not a function")
    }
  }
  let key = options.key
  return miss.through.obj((message, encoding, cb) => {
    index[key(message)] = message
    cb(null, message)
  })
}
