var expect = require('chai').use(require('chai-subset')).expect
var scan = require('../../src/scan/main')
var StreamTest = require('streamtest')
var mock = require('mock-fs')
describe('scan', () => {
  before(() => {
    mock({
      '/a.md': '',
      '/b.dm': '',
      '/c/d.md': ''
    })
  })
  after(() => mock.restore())
  StreamTest.versions.forEach(function (version) {
    describe('for ' + version + ' streams', function () {
      it('Should list all files matching pattern', function (done) {
        scan('/**/*.md').pipe(StreamTest[version].toObjects((error, objects) => {
          expect(objects).to.containSubset([{
              'path': '/a.md'
            },
            {
              'path': '/c/d.md'
            }
          ])
          done(error)
        }))
      })
      it('Should not include files not matching pattern', function (done) {
        scan('/**/*.md').pipe(StreamTest[version].toObjects((error, objects) => {
          expect(objects).to.not.containSubset([{
              'path': '/b.dm'
            }
          ])
          done(error)
        }))
      })
    })
  })
})
