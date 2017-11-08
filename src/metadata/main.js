const _ = require('lodash')
class Metadata {
  constructor(dataModel) {
    if (dataModel.type != 'DataModel') {
      throw new Error('Expected type: DataModel')
    }
    this.types = _(dataModel.classes).map((aClass)=>new Type(aClass)).keyBy('name').value()
  }
  type(typeName){
    return this.types[typeName]
  }
}
class Type {
  constructor(classDescriptor){
    this.name = classDescriptor.name
  }
}
exports.Metadata = Metadata
exports.Type = Type
