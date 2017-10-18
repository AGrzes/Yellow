var PouchDB = require('pouchdb-core')
var miss = require('mississippi')
var couchEndpoint = 'http://couchdb.home.agrzes.pl:5984/birthright_test';
PouchDB.plugin(require('pouchdb-adapter-http'));
var db = new PouchDB(couchEndpoint);
var Ouch = require('ouch-stream')
var yaml = require('js-yaml')
var _ = require('lodash')
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
        date: _.get(item,'date'),
        name: _.get(item,'name'),
        description: _.get(item,'description')
      }]
      case "item":
      return [{
        type: 'Item',
        value: _.get(item,'value'),
        kind: _.get(item,'kind'),
        name: _.get(item,'name'),
        description: _.get(item,'description')
      }]
    }
    return []
  })
  console.log(yaml.safeDump(data,{skipInvalid:true}))
}))
