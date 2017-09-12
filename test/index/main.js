var expect = require('chai').expect
var index = require('../../src/index/main')
var _ = require('lodash')
var StreamTest = require('streamtest')
describe('index', () => {
  it('Should fail if not passed index', (done) => {
    try {
      index({
        key: () => null
      })
      done(new Error("Should fail"))
    } catch (error) {
      expect(error.message).to.be.equals("Index not defined")
      done()
    }
  })
  it('Should fail if not passed key function', (done) => {
    try {
      index({
        index: {}
      })
      done(new Error("Should fail"))
    } catch (error) {
      expect(error.message).to.be.equals("Key function not defined")
      done()
    }
  })
  it('Should fail if not passed function as key', (done) => {
    try {
      index({
        index: {},
        key: {}
      })
      done(new Error("Should fail"))
    } catch (error) {
      expect(error.message).to.be.equals("Key is not a function")
      done()
    }
  })

  StreamTest.versions.forEach(function (version) {
    describe('for ' + version + ' streams', function () {
      it('Should index objects under the key', (done) => {
        var target = {}
        StreamTest[version].fromObjects([{
          key: 'key',
          value: 'value'
        }]).pipe(index({
          index: target,
          key: _.property('key')
        })).pipe(StreamTest[version].toObjects((error, objects) => {
          expect(target).to.containSubset({
            key: {
              value: 'value'
            }
          })
          done(error)
        }))
      })
    })
  })
})
