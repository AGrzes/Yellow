const _ = require('lodash')
const handlebars = require('handlebars')
class Metadata {
  constructor(dataModel) {
    if (dataModel.type != 'DataModel') {
      throw new Error('Expected type: DataModel')
    }
    this.types = _(dataModel.classes).map((aClass)=>new Type(aClass)).keyBy('name').value()
    _.forEach(this.types,(type)=>{
      let ancestorClassName = type.baseClass
      while (ancestorClassName){
        let ancestorClass = this.types[ancestorClassName]
        type.ancestors.push(ancestorClass)
        ancestorClass.descendants.push(type)
        ancestorClassName = ancestorClass.baseClass
        if (!type.idTemplate&&ancestorClass.idTemplate){
          type.idTemplate = ancestorClass.idTemplate
          type.idTemplateHandlebars = handlebars.compile(type.idTemplate) 
        }        
        if (!type.idAttribute&&ancestorClass.idAttribute){
          type.idAttribute = ancestorClass.idAttribute
          type.idTemplate = type.idTemplate? type.idTemplate: `{{${type.idAttribute}}}`
          type.idTemplateHandlebars = handlebars.compile(type.idTemplate) 
        }       
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
    this.baseClass = classDescriptor.is
    this.idAttribute = classDescriptor.idAttribute || (this.baseClass ? null : 'id')
    this.idTemplate = classDescriptor.idTemplate || (this.idAttribute ? `{{${this.idAttribute}}}` : null)
    this.idTemplateHandlebars = this.idTemplate ? handlebars.compile(this.idTemplate) : null
    this.ancestors = []
    this.descendants = []
  }
  id(entity){
    return this.idTemplateHandlebars(entity)
  }
}
const simpleTypes = new Set(['string'])
class Attribute {
  constructor(name,attributeDescriptor){
    this.name = name
    this.multiplicity = attributeDescriptor.multiplicity || '1'
    this.type = attributeDescriptor.type || 'string'
    this.simple = simpleTypes.has(this.type)
    this.singular = this.multiplicity == '1'
  }
}
exports.Metadata = Metadata
exports.Type = Type
exports.Attribute = Attribute
