const _ = require('lodash')
class Metadata {
  constructor(dataModel) {
    if (dataModel.type != 'DataModel') {
      throw new Error('Expected type: DataModel')
    }
    this.types = _.keyBy(dataModel.classes,'name')
  }
  type(typeName){
    return this.types[typeName]
  }
}
exports.Metadata = Metadata
