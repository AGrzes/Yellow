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
    }
  }
}
exports.Data = Data
