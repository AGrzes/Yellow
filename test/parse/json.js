var expect = require('chai').expect
var parseJson = require('../../src/parse/json')
var StreamTest = require('streamtest')
describe('parse', () => {
  describe('json', () => {
    StreamTest.versions.forEach(function (version) {
      describe('for ' + version + ' streams', function () {
        it('Should parse json content', (done) => {
          StreamTest[version].fromObjects([{
            content: '{"test":"value"}'
          }]).pipe(parseJson()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              json: {
                "test": "value"
              }
            }])
            done(error)
          }))
        })
        it('Should handle missing content', (done) => {
          StreamTest[version].fromObjects([{
            other: "value"
          }]).pipe(parseJson()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              other: "value"
            }])
            done(error)
          }))
        })
        it('Should not set json missing content', (done) => {
          StreamTest[version].fromObjects([{
            other: "value"
          }]).pipe(parseJson()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.not.containSubset([{
              json: {}
            }])
            done(error)
          }))
        })
        it('Should handle custom target field', (done) => {
          StreamTest[version].fromObjects([{
            content: '{"test":"value"}'
          }]).pipe(parseJson({target:'target'})).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              target: {
                "test": "value"
              }
            }])
            done(error)
          }))
        })     
        it('Should handle custom source field', (done) => {
          StreamTest[version].fromObjects([{
            source: '{"test":"value"}'
          }]).pipe(parseJson({source:'source'})).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              json: {
                "test": "value"
              }
            }])
            done(error)
          }))
        })    
        it('Should not override target by default', (done) => {
          StreamTest[version].fromObjects([{
            content: '{"test":"value"}',
            json: {
              "test": "another value"
            }
          }]).pipe(parseJson()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              json: {
                "test": "another value"
              }
            }])
            done(error)
          }))
        })    
      })
    })
  })
})
