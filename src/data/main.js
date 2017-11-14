const _ = require('lodash')
class Data {
  constructor(model,metadata){
    this.model = model
    this.metadata = metadata
    this.byType = _(model).groupBy('type').value()
    if (this.metadata){
      this.byTypes = _(metadata.types).keyBy('name').mapValues((type) =>
        _.flatMap(_.concat(type, type.descendants), (derivedType) =>
          this.byType[derivedType.name] ? this.byType[derivedType.name] : []
        )
      ).value()
      this.byId = _(model).keyBy((entity)=>this.metadata.types[entity.type].id(entity)).value()
      _.forEach(model,(entity)=>{
        const type =this.metadata.types[entity.type]
        _.forEach(type.attributes,(attribute)=>{
          if (!attribute.simple){
            entity[attribute.name] = this.byId[entity[attribute.name]]
          }
        })
      })
    }
  }
}
exports.Data = Data
