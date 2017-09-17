var expect = require('chai').expect
var dumpYaml = require('../../src/dump/yaml')
var StreamTest = require('streamtest')
describe('dump', () => {
  describe('yaml', () => {
    StreamTest.versions.forEach(function (version) {
      describe('for ' + version + ' streams', function () {
        it('Should dump yaml content', (done) => {
          StreamTest[version].fromObjects([{
            yaml: {
              "test": "value"
            }
          }]).pipe(dumpYaml
          ()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              content: 'test: value\n'
            }])
            done(error)
          }))
        })
        it('Should handle missing content', (done) => {
          StreamTest[version].fromObjects([{
            other: "value"
          }]).pipe(dumpYaml
          ()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              other: "value"
            }])
            done(error)
          }))
        })
        it('Should not set content missing yaml', (done) => {
          StreamTest[version].fromObjects([{
            other: "value"
          }]).pipe(dumpYaml
          ()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.not.containSubset([{
              content: ""
            }])
            done(error)
          }))
        })
        it('Should handle custom target field', (done) => {
          StreamTest[version].fromObjects([{
            yaml: {
              "test": "value"
            }
          }]).pipe(dumpYaml
          ({
            target: 'target'
          })).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              target: 'test: value\n'
            }])
            done(error)
          }))
        })
        it('Should handle custom source field', (done) => {
          StreamTest[version].fromObjects([{
            source: {
              "test": "value"
            }
          }]).pipe(dumpYaml
          ({
            source: 'source'
          })).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              content: 'test: value\n'
            }])
            done(error)
          }))
        })
        it('Should not override target by default', (done) => {
          StreamTest[version].fromObjects([{
            content: 'test: value',
            yaml: {
              "test": "another value"
            }
          }]).pipe(dumpYaml
          ()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              content: 'test: value'
            }])
            done(error)
          }))
        })
        it('Should override target when asked', (done) => {
          StreamTest[version].fromObjects([{
            content: 'test: value',
            yaml: {
              "test": "another value"
            }
          }]).pipe(dumpYaml
          ({
            override: true
          })).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              content: 'test: another value\n'
            }])
            done(error)
          }))
        })
      })
    })
  })
})
