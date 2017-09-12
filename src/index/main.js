var miss = require('mississippi')
var _ = require('lodash')
module.exports = (options) => {
  if (!options.index){
    throw new Error("Index not defined")
  }
  if (!options.key){
    throw new Error("Key function not defined")
  } else {
    if (!_.isFunction(options.key)){
      throw new Error("Key is not a function") 
    }
  }  

}
