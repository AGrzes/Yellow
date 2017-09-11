var miss = require('mississippi')
module.exports = (options) => {
  if (!options.index){
    throw new Error("Index not defined")
  }
  if (!options.key){
    throw new Error("Key function not defined")
  }  

}
