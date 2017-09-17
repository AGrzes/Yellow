var expect = require('chai').expect
var dumpJson = require('../../src/dump/json')
var StreamTest = require('streamtest')
describe('parse', () => {
  describe('json', () => {
    StreamTest.versions.forEach(function (version) {
      describe('for ' + version + ' streams', function () {
        it('Should dump json content', (done) => {
          StreamTest[version].fromObjects([{
            json: {
                "test": "value"
              }
          }]).pipe(dumpJson()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              content: '{"test":"value"}'
            }])
            done(error)
          }))
        })

      })
    })
  })
})
