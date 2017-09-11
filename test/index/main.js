var expect = require('chai').expect
var index = require('../../src/index/main')
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
  StreamTest.versions.forEach(function (version) {
    describe('for ' + version + ' streams', function () {

    })
  })
})
