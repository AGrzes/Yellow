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
      })
    })
  })
})
