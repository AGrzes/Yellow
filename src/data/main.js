const _ = require('lodash')
class Data {
  constructor(model){
    this.model = model
    this.byType = _(model).groupBy('type').value()
  }
}
exports.Data = Data
