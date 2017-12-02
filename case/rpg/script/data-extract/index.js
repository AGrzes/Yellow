var PouchDB = require('pouchdb-core')
var miss = require('mississippi')
var couchEndpoint = process.argv[2];
PouchDB.plugin(require('pouchdb-adapter-http'));
var db = new PouchDB(couchEndpoint);
var Ouch = require('ouch-stream')
var yaml = require('js-yaml')
var _ = require('lodash')
var moment = require('moment')
var buffer = [];
new Ouch(db).all().pipe(miss.to.obj((chunk, enc, done) => {
  delete chunk._rev
  buffer.push(chunk)
  done()
},(done)=>{
  var data = _.flatMap(buffer,(item)=>{
    switch(item.$type){
      case "session":
      return [{
        type: 'Session',
        xp: _.get(item,'awards.xp'),
        date: moment(_.get(item,'date'),'DD.MM.YYYY').toISOString(),
        name: _.get(item,'name'),
        description: _.get(item,'events')||_.get(item,'content')
      }]
      case "item":
      return [{
        type: 'Item',
        value: _.get(item,'value'),
        kind: _.get(item,'kind'),
        name: _.get(item,'name'),
        description: _.get(item,'description')||_.get(item,'content')
      }]
      case "reference":
      return [{
        type: 'Reference',
        name: _.get(item,'name'),
        description: _.get(item,'description')||_.get(item,'content')
      }]
      case "organization":
      return [{
        type: 'Organization',
        name: _.get(item,'name'),
        description: _.get(item,'description')||_.get(item,'content')
      }]
      case "person":
      return [{
        type: 'Character',
        name: _.get(item,'name'),
        description: _.get(item,'description')||_.get(item,'content'),
        nicknames: _.compact([_.get(item,'title'),_.get(item,'label')]),
        relations: _(item).get('relations',[]).filter((relation)=>_.startsWith(_.get(relation,'role'),'person:')).map((relation)=>({
          type: 'CharacterRelation',
          name:  _.get(relation,'role'),
          target: _.get(relation,'target'),
          reverse: _.get(relation,'reverse'),
          description: _.get(relation,'description')
        })),
        positions: _(item).get('relations',[]).filter((relation)=>!_.startsWith(_.get(relation,'role'),'person:')).map((relation)=>({
          type: 'CharacterRelation',
          name:  _.get(relation,'role'),
          organization: _.get(relation,'target'),
          description: _.get(relation,'description')
        })),        
      }]
      case "location":
      return [{
        type: 'Location',
        name: _.get(item,'name'),
        description: _.get(item,'description')||_.get(item,'content')
      }]
    }
    return []
  })
  console.log(yaml.safeDump(data,{skipInvalid:true}))
}))
