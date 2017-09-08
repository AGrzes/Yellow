var expect = require('chai').expect
var parseYaml = require('../../src/parse/yaml')
var StreamTest = require('streamtest')
describe('parse', () => {
  describe('yaml', () => {
    StreamTest.versions.forEach(function (version) {
      describe('for ' + version + ' streams', function () {
        it('Should parse yaml content', (done) => {
          StreamTest[version].fromObjects([{
            content: 'test: value'
          }]).pipe(parseYaml()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              yaml: {
                "test": "value"
              }
            }])
            done(error)
          }))
        })
        it('Should handle missing content', (done) => {
          StreamTest[version].fromObjects([{
            other: "value"
          }]).pipe(parseYaml()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              other: "value"
            }])
            done(error)
          }))
        })
        it('Should not set yaml missing content', (done) => {
          StreamTest[version].fromObjects([{
            other: "value"
          }]).pipe(parseYaml()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.not.containSubset([{
              yaml: {}
            }])
            done(error)
          }))
        })
        it('Should handle custom target field', (done) => {
          StreamTest[version].fromObjects([{
            content: 'test: value'
          }]).pipe(parseYaml({
            target: 'target'
          })).pipe(StreamTest[version].toObjects((error, objects) => {
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
            source: 'test: value'
          }]).pipe(parseYaml({
            source: 'source'
          })).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              yaml: {
                "test": "value"
              }
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
          }]).pipe(parseYaml()).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              yaml: {
                "test": "another value"
              }
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
          }]).pipe(parseYaml({
            override: true
          })).pipe(StreamTest[version].toObjects((error, objects) => {
            expect(objects).to.containSubset([{
              yaml: {
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
