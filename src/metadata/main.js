const _ = require('lodash')
class Metadata {
  constructor(dataModel) {
    if (dataModel.type != 'DataModel') {
      throw new Error('Expected type: DataModel')
    }
    this.types = _(dataModel.classes).map((aClass)=>new Type(aClass)).keyBy('name').value()
    _.forEach(this.types,(type)=>{
      if (type.baseClass){
        type.classes.push(this.types[type.baseClass])
      }
    })
  }
  type(typeName){
    return this.types[typeName]
  }
}
class Type {
  constructor(classDescriptor){
    this.name = classDescriptor.name
    this.attributes = _.map(classDescriptor.attributes,(attributeDescriptor,attributeName)=>new Attribute(attributeName,attributeDescriptor))
    this.attribute = _(this.attributes).keyBy('name').value()
    this.idAttribute = classDescriptor.idAttribute || 'id'
    this.idTemplate = classDescriptor.idTemplate || `{{${this.idAttribute}}}`
    this.baseClass = classDescriptor.is
    this.classes = [this]
  }
}
class Attribute {
  constructor(name,attributeDescriptor){
    this.name = name
    this.multiplicity = attributeDescriptor.multiplicity || '1'
    this.type = attributeDescriptor.type || 'string'
  }
}
exports.Metadata = Metadata
exports.Type = Type
exports.Attribute = Attribute
