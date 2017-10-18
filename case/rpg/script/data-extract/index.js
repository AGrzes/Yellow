var PouchDB = require('pouchdb-core')
var miss = require('mississippi')
var couchEndpoint = 'http://couchdb.home.agrzes.pl:5984/birthright_test';
PouchDB.plugin(require('pouchdb-adapter-http'));
var db = new PouchDB(couchEndpoint);
var Ouch = require('ouch-stream')
var yaml = require('js-yaml')
var buffer = [];
new Ouch(db).all().pipe(miss.to.obj((chunk, enc, done) => {
  delete chunk._rev
  buffer.push(chunk)
  done()
},(done)=>{
  console.log(yaml.safeDump(buffer))
}))
