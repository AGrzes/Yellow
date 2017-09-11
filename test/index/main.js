var expect = require('chai').expect
var index = require('../../src/index/main')
var StreamTest = require('streamtest')
describe('index', () => {
  it('Should fail if not passed index', (done) => {
    try {
      index({})
      done(new Error("Should fail"))
    } catch (error) {
      expect(error).not.to.be.undefined
      done()
    }
  })
  StreamTest.versions.forEach(function (version) {
    describe('for ' + version + ' streams', function () {

    })
  })
})
