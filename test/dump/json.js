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
        it('Should handle missing content', (done) => {
          StreamTest[version].fromObjects([{
            other: "value"
          }]).pipe(dumpJson()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              other: "value"
            }])
            done(error)
          }))
        })
        it('Should not set target on missing content', (done) => {
          StreamTest[version].fromObjects([{
            other: "value"
          }]).pipe(dumpJson()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.not.containSubset([{
              content: {}
            }])
            done(error)
          }))
        })
        it('Should handle custom target field', (done) => {
          StreamTest[version].fromObjects([{
            json: {
              "test": "value"
            }
          }]).pipe(dumpJson({
            target: 'target'
          })).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              target: '{"test":"value"}'
            }])
            done(error)
          }))
        })
        it('Should handle custom source field', (done) => {
          StreamTest[version].fromObjects([{
            source: {
              "test": "value"
            }
          }]).pipe(dumpJson({
            source: 'source'
          })).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              content: '{"test":"value"}'
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
          }]).pipe(dumpJson()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              content: '{"test":"value"}'
            }])
            done(error)
          }))
        })
        it('Should override target when asked', (done) => {
          StreamTest[version].fromObjects([{
            content: '{"test":"value"}',
            json: {
              "test": "another value"
            }
          }]).pipe(dumpJson({
            override: true
          })).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              content: '{"test":"another value"}'
            }])
            done(error)
          }))
        })
      })
    })
  })
})
