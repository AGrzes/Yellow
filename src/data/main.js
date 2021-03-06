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
          if (!attribute.simple) {
            if (attribute.singular) {
              const target = this.byId[entity[attribute.name]]
              if (target) {
                entity[attribute.name] = target
              }
            } else {
              entity[attribute.name] = _.map(entity[attribute.name],(value)=>this.byId[value]||value)
            }
          }
        })
      })
    }
  }
}
exports.Data = Data
