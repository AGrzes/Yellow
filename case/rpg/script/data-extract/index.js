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
      case "changelog":
      return [{
        type: 'Change',
        date: moment(_.get(item,'date')).toISOString(),
        description: _.get(item,'changes')
      }]
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
      case "god":
      return [{
        type: 'God',
        name: _.get(item,'name'),
        domain: _.get(item,'domain'),
        symbol: _.get(item,'symbol'),
        character: _.get(item,'character'),
        name: _.get(item,'name'),
        nicknames: _([_.get(item,'title'),_.get(item,'label')]).flatten().compact().value(),
        description: _.get(item,'description')||_.get(item,'content')
      }]
      case "organization":
      return [{
        type: 'Organization',
        name: _.get(item,'name'),
        description: _.get(item,'description')||_.get(item,'content')
      }]
      case "domain":
      return [{
        type: 'Domain',
        name: _.get(item,'name'),
        description: _.get(item,'description')||_.get(item,'content'),
        provinces: _.get(item,'provinces')
      }]
      case "person":
      return [{
        type: 'Character',
        name: _.get(item,'name'),
        description: _.get(item,'description')||_.get(item,'content'),
        nicknames: _([_.get(item,'title'),_.get(item,'label')]).flatten().compact().value(),
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
      case "province":
      return [{
        type: 'County',
        name: _.get(item,'name'),
        description: _.get(item,'description')||_.get(item,'content'),
        neighbors:_(item).get('neighbors',[]).map((neighbors)=>({
          type: 'LocationRelation',
          target:  _.get(neighbors,'name'),
          name: _.get(neighbors,'direction'),
          description: _.get(neighbors,'border')
        }))
      }]
    }
    return []
  })
  console.log(yaml.safeDump(data,{skipInvalid:true}))
}))
